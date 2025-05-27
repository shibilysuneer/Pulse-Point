import express from "express";
import TYPES from "../config/inversify/types";
import container from "../config/inversify/container";

const router = express.Router()
const adminCtrl = container.get

export default router;