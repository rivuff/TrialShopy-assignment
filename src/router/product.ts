import express from 'express'

import { isAuthenticated, isOwner } from '../middleware'
import { BulkUploadProducts, CreateProduct, DeleteProduct, GetAllProducts, GetProductsById, GetProductsByName, UpdateProduct, addCategoryToProduct, getCommissionForProduct, toggleStatus, updateCommissionForProduct } from '../controllers/product';

export default (router: express.Router) =>{
    router.post('/product/all', GetAllProducts);
    router.post('/product/create', CreateProduct)
    router.get('/product/find', GetProductsByName)
    router.get('/product/:id', GetProductsById)
    router.delete('/product/:id', DeleteProduct);
    router.patch('/product/:id', UpdateProduct);
    router.post('/product/bulkcreate', BulkUploadProducts);
    router.post('/product/addcategory', addCategoryToProduct);
    router.post('/product/updatecommision', updateCommissionForProduct);
    router.get('/product/commision/history/:id', getCommissionForProduct);
    router.patch('/product/togglestatus/:id', toggleStatus);

}