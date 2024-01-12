import express from 'express';
import { CategoryModel } from '../db/categry';

// Controller function for creating a new category
export const createCategory = async (req: express.Request, res: express.Response) => {
    try {
        const { name, childCategories } = req.body;
        const newCategory = new CategoryModel({ name, childCategories });
        const savedCategory = await newCategory.save();
        return res.status(201).json(savedCategory);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Controller function for getting all categories

export const getCategories = async (req: express.Request, res: express.Response) => {
    try {
        const categories = await CategoryModel.find();
        return res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Controller function for updating a category
export const updateCategory = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { name, childCategories } = req.body;
        
        console.log(req.body, childCategories);
        console.log(id);
        
        
        // Build the update object based on provided fields
        const updateObject: any = {};

        if (name) {
            updateObject.name = name;
        }
        if (childCategories) {
            updateObject.childCategories = childCategories;
        }

        console.log(updateObject);
        

        // Update the category
        const Category = await CategoryModel.findById(id);
        console.log(Category);
        
        if(Category!=null){
            if (name) {
                Category.name = name;
            }
            if (childCategories) {
                Category.childCategories = childCategories;
            }
        }

        console.log(Category);
        
    
        return res.status(200).json(Category);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller function for deleting a category
export const deleteCategory = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        const deletedCategory = await CategoryModel.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({ error: 'Category not found' });
        }

        return res.status(204).json("deleted").end();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};