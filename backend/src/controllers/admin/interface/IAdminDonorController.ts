import { Request, Response } from "express";

export interface IAdminDonorController {
  getApprovedDonors(req: Request, res: Response): Promise<void>;
  toggleDonorBlock(req: Request, res: Response): Promise<void>;
  getDonorById(req: Request, res: Response): Promise<void>;

  
}
