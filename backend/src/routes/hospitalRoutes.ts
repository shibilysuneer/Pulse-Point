import express from "express";
import container from "../config/inversify/container";
import TYPES from "../config/inversify/types";
import { IHospitalController } from "../controllers/hospital/interface/IHospitalController";

const router = express.Router()

const hospitalController = container.get<IHospitalController>(TYPES.HospitalController)

router.post("/signup", hospitalController.hospitalSignup.bind(hospitalController));
router.post("/login", hospitalController.hospitalLogin.bind(hospitalController));
router.get("/verify-token", hospitalController.verifyToken.bind(hospitalController));

export default router;