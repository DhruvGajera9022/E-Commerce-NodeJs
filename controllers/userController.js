import userModel from "../models/userModel.js";
import cloudinary from "cloudinary";
import { getDataUri } from "../utils/Features.js";


// Register
export const registerController = async (req, res) => {
    try {
        const { name, email, password, address, city, country, phone, answer } = req.body;

        // Validation
        if (!name || !email || !password || !address || !city || !country || !phone || !answer) {
            return res.status(500).send({
                success: false,
                message: "Please Provide All Fields",
            });
        }

        // Check existing user
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(500).send({
                success: false,
                message: "Email Already Taken",
            });
        }

        // Create User
        const user = await userModel.create({
            name,
            email,
            password,
            address,
            city,
            country,
            phone,
            answer,
        });
        res.status(201).send({
            success: true,
            message: "Registration Success, please login",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Register API",
            error,
        });
    }
}


// Login
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validation
        if (!email || !password) {
            return res.status(500).send({
                success: false,
                message: "Please Provide Email or Password",
            });
        }

        // Check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User Not Found",
            });
        }

        // Check Password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(500).send({
                success: false,
                message: "Invalid Credentials",
            });
        }

        // JWT Token
        const token = user.generateToken();
        res.status(200).cookie("token", token, {
            expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
            secure: process.env.NODE_ENV === "development" ? true : false,
            httpOnly: process.env.NODE_ENV === "development" ? true : false,
            sameSite: process.env.NODE_ENV === "development" ? true : false,
        }).send({
            success: true,
            message: "Login Successfully",
            token,
            user,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Login API",
            error,
        });
    }
}


// User Profile
export const getUserProfileController = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id);
        res.status(200).send({
            success: true,
            message: "User Profile Fetched Successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Profile API",
            error,
        });
    }
}


// Logout
export const logoutController = async (req, res) => {
    try {
        res
            .status(200)
            .cookie("token", "", {
                expires: new Date(Date.now()),
                secure: process.env.NODE_ENV === "development" ? true : false,
                httpOnly: process.env.NODE_ENV === "development" ? true : false,
                sameSite: process.env.NODE_ENV === "development" ? true : false,
            })
            .send({
                success: true,
                message: "Logout Successfully",
            });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Logout API",
            error,
        });
    }
}


// Update Profile
export const updateProfileController = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id);

        const { name, email, address, city, country, phone } = req.body;
        // validation + Update
        if (name) user.name = name;
        if (email) user.email = email;
        if (address) user.address = address;
        if (city) user.city = city;
        if (country) user.country = country;
        if (phone) user.phone = phone;

        //save user
        await user.save();
        res.status(200).send({
            success: true,
            message: "User Profile Updated",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In update profile API",
            error,
        });
    }
}


// Update Password
export const updatePasswordController = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id);

        const { oldPassword, newPassword } = req.body;
        //validation
        if (!oldPassword || !newPassword) {
            return res.status(500).send({
                success: false,
                message: "Please provide old or new password",
            });
        }

        // old pass check
        const isMatch = await user.comparePassword(oldPassword);
        //validation
        if (!isMatch) {
            return res.status(500).send({
                success: false,
                message: "Invalid Old Password",
            });
        }
        user.password = newPassword;
        await user.save();
        res.status(200).send({
            success: true,
            message: "Password Updated Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In update password API",
            error,
        });
    }
}


// Update Profile Picture
export const updateProfilePicController = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id);

        // get file from client photo
        const file = getDataUri(req.file);

        // delete prev image
        await cloudinary.v2.uploader.destroy(user.profilePic.public_id);

        // update
        const cdb = await cloudinary.v2.uploader.upload(file.content);
        user.profilePic = {
            public_id: cdb.public_id,
            url: cdb.secure_url,
        };
        // save func
        await user.save();

        res.status(200).send({
            success: true,
            message: "Profile Picture Updated",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In update password API",
            error,
        });
    }
}


// Forgot Password
export const passwordResetController = async (req, res) => {
    try {
        const { email, newPassword, answer } = req.body;
        // validation
        if (!email || !newPassword || !answer) {
            return res.status(500).send({
                success: false,
                message: "Please Provide All Fields",
            });
        }

        // find user
        const user = await userModel.findOne({ email, answer });
        //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Invalid user or answer",
            });
        }

        user.password = newPassword;
        await user.save();
        res.status(200).send({
            success: true,
            message: "Your Password Has Been Reset Please Login !",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In password reset API",
            error,
        });
    }
}