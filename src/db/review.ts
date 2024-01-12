import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    description: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
        required: true,
    },
});

const ReviewModel = mongoose.model('Review', reviewSchema);

export default ReviewModel;