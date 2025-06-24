import express from "express";
import container from "../config/inversify/container";
import TYPES from "../config/inversify/types";
import { IHospitalController } from "../controllers/hospital/interface/IHospitalController";
import { IDonorController } from "../controllers/hospital/interface/IDonorController";

const router = express.Router()

const hospitalController = container.get<IHospitalController>(TYPES.HospitalController)
const donorController = container.get<IDonorController>(TYPES.DonorController);

router.post("/signup", hospitalController.hospitalSignup.bind(hospitalController));
router.post("/login", hospitalController.hospitalLogin.bind(hospitalController));
router.post("/logout", hospitalController.hospitalLogout.bind(hospitalController));
router.get("/verify-token", hospitalController.verifyToken.bind(hospitalController));
router.post("/google-login", hospitalController.googleLogin.bind(hospitalController));
router.post("/send-otp", hospitalController.sendOtp.bind(hospitalController));
router.post("/resend-otp", hospitalController.resendOtp.bind(hospitalController));
router.post("/verify-otp", hospitalController.verifyOtp.bind(hospitalController));
router.post("/reset-password", hospitalController.resetPassword.bind(hospitalController));

router.get("/donor-requests", donorController.getAllDonorRequests.bind(donorController));
router.patch("/donor-request/:id/status", donorController.updateDonorStatus.bind(donorController));

export default router;