import express from "express";
import container from "../config/inversify/container";
import TYPES from "../config/inversify/types";
import { IHospitalController } from "../controllers/hospital/interface/IHospitalController";
import { IDonorController } from "../controllers/hospital/interface/IDonorController";
import { authenticateHospital } from "../middlewares/authMiddleware";

const router = express.Router()

const hospitalController = container.get<IHospitalController>(TYPES.HospitalController)
const donorController = container.get<IDonorController>(TYPES.HospitalDonorController);

router.post("/signup", hospitalController.hospitalSignup.bind(hospitalController));
router.post("/login", hospitalController.hospitalLogin.bind(hospitalController));
router.post("/logout", hospitalController.hospitalLogout.bind(hospitalController));
router.get("/verify-token", hospitalController.verifyToken.bind(hospitalController));
router.post("/google-login", hospitalController.googleLogin.bind(hospitalController));
router.post("/send-otp", hospitalController.sendOtp.bind(hospitalController));
router.post("/resend-otp", hospitalController.resendOtp.bind(hospitalController));
router.post("/verify-otp", hospitalController.verifyOtp.bind(hospitalController));
router.post("/reset-password", hospitalController.resetPassword.bind(hospitalController));
// router.post("/register-details", hospitalController.submitRegistrationDetails.bind(hospitalController));

router.get("/donor-requests", donorController.getAllDonorRequests.bind(donorController));
router.get("/donor/:id", donorController.getSingleReqDonor.bind(donorController));
router.patch("/donor-request/:id/status", donorController.updateDonorStatus.bind(donorController));
router.patch("/donors/:id/block", donorController.hosToggleBlockStatus.bind(donorController));

router.post('/register-details',authenticateHospital,hospitalController.submitRegistrationDetails.bind(hospitalController)
);

export default router;