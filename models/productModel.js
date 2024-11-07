import mongoose from "mongoose";


// REVIEW MODAL
const reviewSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is require"],
        },
        rating: {
            type: Number,
            default: 0,
        },
        comment: {
            type: String,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: [true, "User require"],
        },
    },
    { timestamps: true }
);


// PRODUCT MODAL
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
    },
    stock: {
        type: Number,
        required: [true, "Product stock required"],
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    images: [
        {
            public_id: String,
            url: String,
        },
    ],
    reviews: [reviewSchema],
    rating: {
        type: Number,
        default: 0,
    },
    numReviews: {
        type: Number,
        default: 0,
    },

}, { timestamps: true });


const productModel = mongoose.model("Products", productSchema);
export default productModel;