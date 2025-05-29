import express from "express";
import { authController } from "../controllers/authController";
import container from "../config/inversify/container";
import TYPES from "../config/inversify/types";
const router = express.Router()

const adminController = container.get<authController>(TYPES.authController)

router.post('/admin/signup',adminController.adminSignup.bind(adminController))

export default router;