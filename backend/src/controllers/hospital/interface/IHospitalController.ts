import { Request, Response } from "express";

export interface IHospitalController {
  hospitalSignup(req: Request, res: Response): Promise<void>;
  hospitalLogin(req: Request, res: Response): Promise<void>;
  verifyToken(req: Request, res: Response): Promise<void>;
}
