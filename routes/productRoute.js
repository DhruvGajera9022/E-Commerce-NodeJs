import express from "express";
import { isAuth, isAdmin } from "../middlewares/authMiddleware.js";
import { singleUpload } from "../middlewares/multer.js";
import {
    createProductController,
    deleteProductController,
    deleteProductImageController,
    getAllProductsController,
    getSingleProductController,
    updateProductController,
    updateProductImageController,
    productReviewController,
    getTopProductsController,
} from "../controllers/productController.js";


const router = express.Router();


router.get("/get-all", getAllProductsController);
router.get("/top", getTopProductsController);
router.get("/:id", getSingleProductController);

router.post("/create", isAuth, isAdmin, singleUpload, createProductController);

router.put("/:id", isAuth, isAdmin, updateProductController);
router.put("/image/:id", isAuth, isAdmin, singleUpload, updateProductImageController);

router.delete("/delete-image/:id", isAdmin, isAuth, deleteProductImageController);
router.delete("/delete/:id", isAuth, isAdmin, deleteProductController);

router.put("/:id/review", isAuth, productReviewController);


export default router;