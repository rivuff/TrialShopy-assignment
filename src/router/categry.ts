import { createCategory, deleteCategory, getCategories, updateCategory } from '../controllers/category';
import express from 'express'


export default (router: express.Router) =>{
    router.post('/category/create', createCategory);
    router.get('/category/getAll', getCategories)
    router.delete("/category/:id", deleteCategory)
    router.patch('/category/:id', updateCategory)
}