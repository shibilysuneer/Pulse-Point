// src/controllers/user/interface/IDonorController.ts
import { Request, Response } from "express";

export interface IUserDonorController {
  handleDonorRequest(req: Request, res: Response): Promise<void>;
  getAllDonorRequests(req: Request, res: Response): Promise<void>;
  updateDonorStatus(req: Request, res: Response): Promise<void>;
}
