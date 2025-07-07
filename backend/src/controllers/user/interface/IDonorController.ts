// src/controllers/user/interface/IDonorController.ts
import { Request, Response } from "express";
import { AuthRequest } from "../../../types/common/middType";

export interface IUserDonorController {
  handleDonorRequest(req: Request, res: Response): Promise<void>;
  getAllDonorRequests(req: Request, res: Response): Promise<void>;
  updateDonorStatus(req: Request, res: Response): Promise<void>;
  getMyDonorRequest(req: AuthRequest, res: Response): Promise<void>;
  cancelDonorRequest(req: AuthRequest, res: Response): Promise<void>;

}
