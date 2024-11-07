import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import { stripe } from "../server.js";


// CREATE ORDERS
export const createOrderController = async (req, res) => {
    try {
        const {
            shippingInfo,
            orderItems,
            paymentMethod,
            paymentInfo,
            itemPrice,
            tax,
            shippingCharges,
            totalAmount,
        } = req.body;

        // create order
        await orderModel.create({
            user: req.user._id,
            shippingInfo,
            orderItems,
            paymentMethod,
            paymentInfo,
            itemPrice,
            tax,
            shippingCharges,
            totalAmount,
        });

        // stock update
        for (let i = 0; i < orderItems.length; i++) {
            // find product
            const product = await productModel.findById(orderItems[i].product);
            product.stock -= orderItems[i].quantity;
            await product.save();
        }
        res.status(201).send({
            success: true,
            message: "Order Placed Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Create Order API",
            error,
        });
    }
}


// GET ALL ORDERS - MY ORDERS
export const getMyOrdersController = async (req, res) => {
    try {
        // find orders
        const orders = await orderModel.find({ user: req.user._id });
        //validation
        if (!orders) {
            return res.status(404).send({
                success: false,
                message: "No Orders found",
            });
        }
        res.status(200).send({
            success: true,
            message: "Your Orders Data",
            totalOrder: orders.length,
            orders,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In My orders Order API",
            error,
        });
    }
}


// GET SINGLE ORDER INFO
export const singleOrderDetailsController = async (req, res) => {
    try {
        // find orders
        const order = await orderModel.findById(req.params.id);
        //validation
        if (!order) {
            return res.status(404).send({
                success: false,
                message: "No Order found",
            });
        }
        res.status(200).send({
            success: true,
            message: "Your Order Fetched",
            order,
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
            message: "Error In Get Single Order API",
            error,
        });
    }
}


// ACCEPT PAYMENTS
export const paymentsController = async (req, res) => {
    try {
        // get amount
        const { totalAmount } = req.body;
        // validation
        if (!totalAmount) {
            return res.status(404).send({
                success: false,
                message: "Total Amount is require",
            });
        }
        const { client_secret } = await stripe.paymentIntents.create({
            amount: Number(totalAmount * 100),
            currency: "usd",
        });
        res.status(200).send({
            success: true,
            client_secret,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Get UPDATE Products API",
            error,
        });
    }
}


// GET ALL ORDERS
export const getAllOrdersController = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.status(200).send({
            success: true,
            message: "All Orders Data",
            totalOrders: orders.length,
            orders,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Get All Orders API",
            error,
        });
    }
};


// CHANGE ORDER STATUS
export const changeOrderStatusController = async (req, res) => {
    try {
        // find order
        const order = await orderModel.findById(req.params.id);
        // validation
        if (!order) {
            return res.status(404).send({
                success: false,
                message: "Order not found",
            });
        }

        if (order.orderStatus === "processing") order.orderStatus = "shipped";
        else if (order.orderStatus === "shipped") {
            order.orderStatus = "delivered";
            order.deliveredAt = Date.now();
        } else {
            return res.status(500).send({
                success: false,
                message: "Order Already Delivered",
            });
        }
        await order.save();
        res.status(200).send({
            success: true,
            message: "Order Status Updated",
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
            message: "Error In Get Admin Order API",
            error,
        });
    }
}