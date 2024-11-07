import express from "express";
import { isAdmin, isAuth } from "./../middlewares/authMiddleware.js";
import {
    changeOrderStatusController,
    createOrderController,
    getAllOrdersController,
    getMyOrdersController,
    paymentsController,
    singleOrderDetailsController,
} from "../controllers/orderController.js";

const router = express.Router();


router.post("/create", isAuth, createOrderController);

router.get("/my-orders", isAuth, getMyOrdersController);

router.get("/my-orders/:id", isAuth, singleOrderDetailsController);

router.post("/payments", isAuth, paymentsController);

router.get("/admin/get-all-orders", isAuth, isAdmin, getAllOrdersController);

router.put("/admin/order/:id", isAuth, isAdmin, changeOrderStatusController);

export default router;