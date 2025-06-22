import express from "express";
import { authController } from "../controllers/admin/authController";
import container from "../config/inversify/container";
import TYPES from "../config/inversify/types";
const router = express.Router()

const adminController = container.get<authController>(TYPES.authController)

router.post('/login',adminController.adminLogin.bind(adminController))
router.post('/logout',adminController.adminLogout.bind(adminController))

export default router;