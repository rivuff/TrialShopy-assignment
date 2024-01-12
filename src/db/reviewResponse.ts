import mongoose from "mongoose";

const reviewResponseSchema = new mongoose.Schema({
    responseText: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    review: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review', // Reference to the Review model
        required: true,
    },
    timestamp: { type: Date, default: Date.now },
});

const ReviewResponseModel = mongoose.model('ReviewResponse', reviewResponseSchema);

export default ReviewResponseModel;