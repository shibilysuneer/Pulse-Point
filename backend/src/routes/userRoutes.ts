import express from "express";
import container from "../config/inversify/container";
import TYPES from "../config/inversify/types";
import { IUserController } from "../controllers/user/interface/IUserController";
import { DonorController } from "../controllers/user/donorController";

const router = express.Router();

const userController = container.get<IUserController>(TYPES.UserController);
const donorController = container.get<DonorController>(TYPES.UserDonorController);


router.post("/signup", userController.userSignup.bind(userController));
router.post("/login", userController.userLogin.bind(userController));
router.post("/logout", userController.userLogout.bind(userController));
router.get("/verify-token", userController.verifyToken.bind(userController));
router.post("/google-login", userController.googleLogin.bind(userController));
router.post("/send-otp", userController.sendOtp.bind(userController));
router.post("/resend-otp", userController.resendOtp.bind(userController));
router.post("/verify-otp", userController.verifyOtp.bind(userController));
router.post("/reset-password", userController.resetPassword.bind(userController));

router.post("/donor-request", donorController.handleDonorRequest.bind(donorController));
router.patch("/donor-requests/:id/status", donorController.updateDonorStatus.bind(donorController));

export default router;
