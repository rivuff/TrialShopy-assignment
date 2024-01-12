import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: String, required: true},
    commision:[{type: String}], 
    commisionStatus: {
        type: String,
        enum: ['active', 'blocked'],
        default: 'active',
    },
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Assuming your Category model is named 'Category'
    }],
})

export const ProductModel = mongoose.model('Product', ProductSchema)

export const getProducts = async()=> await ProductModel.find();

export const getProductById = (id: string) => ProductModel.findById(id);
export const getProductByName = (name: string) => ProductModel.findOne({ name })
export const createProduct = (values: Record<string, any>) => {
    const product = new ProductModel(values);
    return product.save().then((savedProduct) => savedProduct.toObject());
};
export const getProductsByCategory = (categoryId: mongoose.Schema.Types.ObjectId) =>
    ProductModel.find({ category: categoryId });

export const deleteProductById = (id: string) => ProductModel.findOneAndDelete({_id: id});

export const bulkUploadProducts = async (productsData: any[]) => {
    try {
        const insertedProducts = await ProductModel.insertMany(productsData);
        return insertedProducts;
    } catch (error) {
        console.error('Error uploading products:', error);
        throw error;
    }
};