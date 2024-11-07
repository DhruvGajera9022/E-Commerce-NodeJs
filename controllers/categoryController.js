import categoryModel from "../models/categoryModel.js";
import productModel from "../models/productModel.js";


// CREATE CATEGORY
export const createCategory = async (req, res) => {
    try {
        const { category } = req.body;
        // validation
        if (!category) {
            return res.status(404).send({
                success: false,
                message: "Please provide category name",
            });
        }
        await categoryModel.create({ category });
        res.status(201).send({
            success: true,
            message: `${category} Category Created Successfully`,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Create Category API",
        });
    }
}


// GET ALL CATEGORY
export const getAllCategoriesController = async (req, res) => {
    try {
        const categories = await categoryModel.find({});
        res.status(200).send({
            success: true,
            message: "Categories Fetch Successfully",
            totalCat: categories.length,
            categories,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Get All Category API",
        });
    }
}


// DELETE CATEGORY
export const deleteCategoryController = async (req, res) => {
    try {
        // find category
        const category = await categoryModel.findById(req.params.id);
        //validation
        if (!category) {
            return res.status(404).send({
                success: false,
                message: "Category not found",
            });
        }

        // find product with this category id
        const products = await productModel.find({ category: category._id });

        // update product category
        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            product.category = undefined;
            await product.save();
        }
        // save
        await category.deleteOne();
        res.status(200).send({
            success: true,
            message: "Category Deleted Successfully",
        });
    } catch (error) {
        console.log(error);
        // cast error ||  OBJECT ID
        if (error.name === "CastError") {
            return res.status(500).send({
                success: false,
                message: "Invalid Id",
            });
        }
        res.status(500).send({
            success: false,
            message: "Error In DELETE Category API",
            error,
        });
    }
}


// UPDATE CATEGORY
export const updateCategoryController = async (req, res) => {
    try {
        // Find the category by ID
        const category = await categoryModel.findById(req.params.id);

        // Check if category exists
        if (!category) {
            return res.status(404).send({
                success: false,
                message: "Category not found",
            });
        }

        // Get the new category data
        const { updatedCategory } = req.body;

        // Validate updatedCategory data
        if (!updatedCategory) {
            return res.status(400).send({
                success: false,
                message: "Updated category data is required",
            });
        }

        // Update products with the new category
        const products = await productModel.find({ category: category._id });
        for (let product of products) {
            product.category = updatedCategory;
            await product.save();
        }

        // Update category itself
        category.category = updatedCategory;
        await category.save();

        // Send success response with the updated category data
        res.status(200).send({
            success: true,
            message: "Category Updated Successfully",
            category,
        });
    } catch (error) {
        console.error(error);

        // Handle cast error for invalid ID
        if (error.name === "CastError") {
            return res.status(400).send({
                success: false,
                message: "Invalid Category ID",
            });
        }

        // Send a generic error response for other errors
        res.status(500).send({
            success: false,
            message: "Error updating category",
            error,
        });
    }
};
