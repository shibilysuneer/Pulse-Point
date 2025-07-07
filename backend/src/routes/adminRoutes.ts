import express from "express";
import { authController } from "../controllers/admin/authController";
import container from "../config/inversify/container";
import TYPES from "../config/inversify/types";
// import { IAdminHospitalController } from "../controllers/admin/interface/IHospitalController";
import { AdminHospitalController } from "../controllers/admin/hospitalController";
import { AdminDonorController } from "../controllers/admin/adminDonorController";
import { authenticateHospitalAdmin } from "../middlewares/authMiddleware";
// import { IDonorController } from "../controllers/hospital/interface/IDonorController";
// const donorController = container.get<IDonorController>(TYPES.UserDonorController);

const router = express.Router()

const adminController = container.get<authController>(TYPES.authController)
const adminHospitalController=container.get<AdminHospitalController>(TYPES.AdminHospitalController);
const adminDonorController = container.get<AdminDonorController>(TYPES.AdminDonorController);

router.post('/login',adminController.adminLogin.bind(adminController))
router.post('/logout',adminController.adminLogout.bind(adminController))

router.post('/send-otp', adminController.sendOtp.bind(adminController)); 
router.post('/resend-otp', adminController.resendOtp.bind(adminController)); 
router.post('/verify-otp', adminController.verifyOtp.bind(adminController)); 
router.post('/reset-password', adminController.resetPassword.bind(adminController));


router.get("/hospitals",authenticateHospitalAdmin,adminHospitalController.fetchHospitals.bind(adminHospitalController));
router.patch("/hospitals/:id/block",authenticateHospitalAdmin, adminHospitalController.toggleBlockStatus.bind(adminHospitalController));
router.get("/pending-hospitals",authenticateHospitalAdmin, adminHospitalController.getPendingHospitals.bind(adminHospitalController));
router.get("/hospitals/:id",authenticateHospitalAdmin, adminHospitalController.getHospitalById.bind(adminHospitalController));
router.patch("/hospitals/:id/status", authenticateHospitalAdmin, adminHospitalController.updateHospStatus.bind(adminHospitalController));

router.get("/donors",authenticateHospitalAdmin, adminDonorController.getApprovedDonors.bind(adminDonorController));
router.patch("/donors/:id/block",authenticateHospitalAdmin, adminDonorController.toggleDonorBlock.bind(adminDonorController));
router.get("/donors/:id",authenticateHospitalAdmin, adminDonorController.getDonorById.bind(adminDonorController));


export default router;