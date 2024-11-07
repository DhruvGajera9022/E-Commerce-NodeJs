import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        shippingInfo: {
            address: {
                type: String,
                required: [true, "Address is required"],
            },
            city: {
                type: String,
                required: [true, "City name is required"],
            },
            country: {
                type: String,
                required: [true, " Country name is require"],
            },
        },
        orderItems: [
            {
                name: {
                    type: String,
                    required: [true, "Product name is require"],
                },
                price: {
                    type: Number,
                    required: [true, "Product price is require"],
                },
                stock: {
                    type: Number,
                    required: [true, "Product stock is require"],
                },
                quantity: {
                    type: Number,
                    required: [true, "Product quantity is require"],
                },
                image: {
                    type: String,
                    required: [true, "Product image is require"],
                },
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Products",
                    required: true,
                },
            }
        ],
        paymentMethod: {
            type: String,
            enum: ["COD", "ONLINE"],
            default: "COD",
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: [true, "User id is require"],
        },
        paidAt: Date,
        paymentInfo: {
            id: String,
            status: String,
        },
        itemPrice: {
            type: Number,
            required: [true, "Item price is require"],
        },
        tax: {
            type: Number,
            required: [true, "Tax price is require"],
        },
        shippingCharges: {
            type: Number,
            required: [true, "Item shippingCharges  is require"],
        },
        totalAmount: {
            type: Number,
            required: [true, "Item totalAmount price is require"],
        },
        orderStatus: {
            type: String,
            enum: ["processing", "shipped", "delivered"],
            default: "processing",
        },
        deliveredAt: Date,
    },
    { timestamps: true }
);

export const orderModel = mongoose.model("Order", orderSchema);
export default orderModel;