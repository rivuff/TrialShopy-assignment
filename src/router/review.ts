import { createReview, getAllReviews,getReviewById } from '../controllers/review'
import { respondToReview } from '../controllers/review';

import express from 'express'


export default (router: express.Router) =>{
    router.post('/review/post', createReview);
    router.get('/review/getAll', getAllReviews);
    router.get('/review/:id', getReviewById)
    router.post('/review/respond', respondToReview);
}