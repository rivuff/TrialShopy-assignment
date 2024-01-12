import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    childCategories: [{
        type: String
    }],

});

export const CategoryModel = mongoose.model('Category', categorySchema);

