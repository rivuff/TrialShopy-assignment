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

    // Category reference, linking to the Category model
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Assuming your Category model is named 'Category'
    }],
})

// Creating a Mongoose model for the Product schema
export const ProductModel = mongoose.model('Product', ProductSchema);

// Function to get all products
export const getProducts = async () => await ProductModel.find();

// Function to get product by ID
export const getProductById = (id: string) => ProductModel.findById(id);

// Function to get product by name
export const getProductByName = (name: string) => ProductModel.findOne({ name });

// Function to create a new product
export const createProduct = (values: Record<string, any>) => {
    const product = new ProductModel(values);
    return product.save().then((savedProduct) => savedProduct.toObject());
};

// Function to get products by category
export const getProductsByCategory = (categoryId: mongoose.Schema.Types.ObjectId) =>
    ProductModel.find({ category: categoryId });

// Function to delete product by ID
export const deleteProductById = (id: string) => ProductModel.findOneAndDelete({ _id: id });

// Function to bulk upload products
export const bulkUploadProducts = async (productsData: any[]) => {
    try {
        const insertedProducts = await ProductModel.insertMany(productsData);
        return insertedProducts;
    } catch (error) {
        console.error('Error uploading products:', error);
        throw error;
    }
};