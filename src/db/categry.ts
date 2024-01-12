import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    
    // Name of the category, must be a non-empty string    
    name: {
        type: String,
        required: true,
        trim: true,
    },

    // Child categories, represented as an array of strings
    childCategories: [{
        type: String
    }],

});

export const CategoryModel = mongoose.model('Category', categorySchema);

