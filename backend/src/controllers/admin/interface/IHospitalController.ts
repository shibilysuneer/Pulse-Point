// src/controllers/admin/interface/IAdminHospitalController.ts
import { Request, Response } from "express";

export interface IAdminHospitalController {
  fetchHospitals(req: Request, res: Response): Promise<void>;
  toggleBlockStatus(req: Request, res: Response): Promise<void>;
}
