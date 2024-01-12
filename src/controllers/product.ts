import product from "router/product";
import { getProductByName, createProduct, getProducts, getProductById, deleteProductById, bulkUploadProducts } from "../db/products";
import express from "express";

export const CreateProduct = async(req: express.Request, res: express.Response) =>{
    try {
        const {name, price,commision, category} = req.body;

        console.log(req.body);
        

        if(!name || !price || !commision){
            console.log("error at controller");
            return res.sendStatus(400);
        }

        const existingProduct = await getProductByName(name);

        if(existingProduct){
            return res.sendStatus(400)
        }

        let commisionArr= commision.split(" ")

        const product=  await createProduct({
            name: name,
            price: price,
            commision: commisionArr, // Make sure to adjust this based on your actual property names
            category: category,
        });

        return res.status(200).json(product).end()

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const toggleStatus = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        // Validate if the product exists before updating
        const product = await getProductById(id);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Toggle the status between 'active' and 'blocked'
        product.commisionStatus = product.commisionStatus === 'active' ? 'blocked' : 'active';

        // Save the updated product
        const updatedProduct = await product.save();

        return res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Error toggling status:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getCommissionForProduct = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        // Validate if the product exists
        const product = await getProductById(id);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Return the commission array for the product
        return res.status(200).json({ commission: product.commision });
    } catch (error) {
        console.error('Error fetching commission for product:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const updateCommissionForProduct = async (req: express.Request, res: express.Response) => {
    try {
        const { id, newCommission } = req.body;

        // Validate if the product exists before updating
        const product = await getProductById(id);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Add new commission to the array
        product.commision.push(newCommission);

        // Save the updated product
        const updatedProduct = await product.save();

        return res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Error updating commission for product:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const GetAllProducts =async (req:express.Request, res:express.Response) => {
    try {
        const products = await getProducts();

        return res.status(200).json(products);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error)
    }
}

export const GetProductsByName =async (req:express.Request, res:express.Response) => {
    try {
        const { name } = req.body; 

        if (!name) {
            return res.status(400).json({ error: 'Product name is required' });
        }

        const product = await getProductByName(name);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        return res.status(200).json(product);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error)
    }
}

export const GetProductsById =async (req:express.Request, res:express.Response) => {
    try {
        const {id} = req.params;
        if (!id) {
            return res.status(400).json({ error: 'Product id is required' });
        }

        const product = await getProductById(id);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        return res.status(200).json(product)
    } catch (error) {
        console.log(error);
        return res.status(400).json(error)
    }
}

export const UpdateProduct = async(req:express.Request, res:express.Response)=>{
    try {
        const {id} = req.params;
        const {name, price, commision} = req.body;

        if(!name && !price && !commision){
            return res.sendStatus(400)
        }

        const product = await getProductById(id);

        if(product!=null){
            if(name){
                product.name=name;
            }
            if(price){
                product.price = price;
            }
            if(commision){
                product.commision=commision;
            }  
        }

        await product?.save();

        return res.status(200).json(product).end;
        
    } catch (error) {
        console.log(error);
        return res.status(400).json(error)
    }
}


export const DeleteProduct =  async(req: express.Request, res: express.Response)=>{
    try {
        const {id} = req.params;
        if (!id) {
            return res.status(400).json({ error: 'Product id is required' });
        }

        const deletedProduct = await deleteProductById(id);
        if(!deletedProduct){
            return res.status(400).json({ error: 'No product delted' });

        }
        return res.json(deletedProduct)
    } catch (error) {
        console.log(error);
        return res.status(400).json(error)
    }
}


export const BulkUploadProducts = async (req: express.Request, res: express.Response) => {
    try {
        const { products } = req.body;

        if (!products || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ error: 'Invalid products data' });
        }

        const insertedProducts = await bulkUploadProducts(products);

        return res.status(201).json({ message: 'Products uploaded successfully', insertedProducts });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const addCategoryToProduct = async (req: express.Request, res: express.Response) => {
    try {
        const { productId, categoryId } = req.body;

        // Validate if both product and category exist before updating
        const product = await getProductById(productId);

        if (!product) {
            console.log("Product not found");
            return res.status(404).json({ error: 'Product not found' });
        }

        // Set the product's category field to the provided categoryId
        product.category = categoryId;

        // Save the updated product
        const updatedProduct = await product.save();

        return res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Error adding category to product:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};