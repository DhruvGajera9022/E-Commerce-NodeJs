import express from "express";
import colors from "colors";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import userRouter from "./routes/userRoutes.js";
import productRoute from './routes/productRoute.js';
import categoryRoute from './routes/categoryRoute.js';
import orderRoute from './routes/orderRoute.js';
import Stripe from "stripe";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";


// Config
dotenv.config();


// Database Connection
connectDB();


// Stripe
export const stripe = new Stripe(process.env.STRIPE_API_SECRET);


// Cloudinary Config
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});


// Initialization
const app = express();
const PORT = process.env.PORT;


// Middlewares
app.use(helmet());
app.use(mongoSanitize());
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(cookieParser());


// Route
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/order", orderRoute);


// Start Server
app.listen(PORT, () => {
    console.log(`Server started at ${process.env.URL}${process.env.PORT}`.bgBlue.black);
});