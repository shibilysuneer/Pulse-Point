import { Request, Response } from "express";

export interface IHospitalController {
  hospitalSignup(req: Request, res: Response): Promise<void>;
  hospitalLogin(req: Request, res: Response): Promise<void>;
  verifyToken(req: Request, res: Response): Promise<void>;
  googleLogin(req: Request, res: Response): Promise<void>;
  sendOtp(req: Request, res: Response): Promise<void>;
resendOtp(req: Request, res: Response): Promise<void>;
verifyOtp(req: Request, res: Response): Promise<void>;
resetPassword(req: Request, res: Response): Promise<void>;
hospitalLogout(req: Request, res: Response): Promise<void>;

}
