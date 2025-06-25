
import { Request, Response } from "express";

export interface IDonorController {
  handleDonorRequest(req: Request, res: Response): Promise<void>;
  getAllDonorRequests(req: Request, res: Response): Promise<void>;
  updateDonorStatus(req: Request, res: Response): Promise<void>;
  getSingleReqDonor(req: Request, res: Response): Promise<void>;
//   getApprovedDonors(req: Request, res: Response): Promise<void>;
  hosToggleBlockStatus(req: Request, res: Response): Promise<void>;
  
}
