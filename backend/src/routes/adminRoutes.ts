import express from "express";
import { authController } from "../controllers/authController";
import container from "../config/inversify/container";
import TYPES from "../config/inversify/types";
const router = express.Router()

const adminController = container.get<authController>(TYPES.authController)

router.post('/signup',adminController.adminSignup.bind(adminController))
router.post('/login',adminController.adminLogin.bind(adminController))

export default router;