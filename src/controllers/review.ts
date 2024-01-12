import express from 'express';
import ReviewModel from '../db/review';

import ReviewResponseModel from '../db/reviewResponse';


// Create a review
export const createReview = async (req: express.Request, res: express.Response) => {
    try {
        const {  description, userId, productId } = req.body;

        // Create a new review with the provided data
        const newReview = new ReviewModel({
            description,
            user: userId,
            product: productId,
        });

        // Save the new review to the database
        const savedReview = await newReview.save();

        return res.status(201).json(savedReview);
    } catch (error) {
        console.error('Error creating review:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get all reviews
export const getAllReviews = async (req: express.Request, res: express.Response) => {
    try {
        const reviews = await ReviewModel.find();
        return res.status(200).json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get a review by ID
export const getReviewById = async (req: express.Request, res: express.Response) => {
    try {
        const { reviewId } = req.params;
        const review = await ReviewModel.findById(reviewId);

        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }

        return res.status(200).json(review);
    } catch (error) {
        console.error('Error fetching review:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const respondToReview = async (req: express.Request, res: express.Response) => {
    try {
        const { reviewId, responseText, userId } = req.body;

        // Create a new review response with the provided data
        const newReviewResponse = new ReviewResponseModel({
            responseText,
            user: userId,
            review: reviewId,
        });

        // Save the new review response to the database
        const savedReviewResponse = await newReviewResponse.save();

        return res.status(201).json(savedReviewResponse);
    } catch (error) {
        console.error('Error responding to review:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
