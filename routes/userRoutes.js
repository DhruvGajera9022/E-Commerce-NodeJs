import express from "express";
import {
    getUserProfileController,
    loginController,
    logoutController,
    registerController,
    updatePasswordController,
    updateProfileController,
    updateProfilePicController,
    passwordResetController,
} from "../controllers/userController.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import { singleUpload } from "../middlewares/multer.js";


// Router object
const router = express.Router();


// Routes
router.post("/register", registerController);
router.post("/login", loginController);

router.get("/profile", isAuth, getUserProfileController);
router.get("/logout", isAuth, logoutController);

router.put("/profile-update", isAuth, updateProfileController);
router.put("/update-password", isAuth, updatePasswordController);
router.put("/update-picture", isAuth, singleUpload, updateProfilePicController);
router.post("/reset-password", passwordResetController);

export default router;