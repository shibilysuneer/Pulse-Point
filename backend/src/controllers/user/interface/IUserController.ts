import { Request, Response } from "express";

export interface IUserController {
  userSignup(req: Request, res: Response): Promise<void>;
  userLogin(req: Request, res: Response): Promise<void>;
  userLogout(req: Request, res: Response): Promise<void>;
  googleLogin(req: Request, res: Response): Promise<void>;
  verifyToken(req: Request, res: Response): Promise<void>;
  sendOtp(req: Request, res: Response): Promise<void>;
  resendOtp(req: Request, res: Response): Promise<void>;
  verifyOtp(req: Request, res: Response): Promise<void>;
  resetPassword(req: Request, res: Response): Promise<void>;
}
