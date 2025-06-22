import { Request,Response } from "express";

export interface IAdminController{
      refreshToken(req: Request, res: Response): Promise<void>
    adminLogin(req:Request,res:Response):Promise<void>;
    adminLogout(req: Request, res: Response): Promise<void>;
  sendOtp(req: Request, res: Response): Promise<void>;
  resendOtp(req: Request, res: Response): Promise<void>;
  verifyOtp(req: Request, res: Response): Promise<void>;
  resetPassword(req: Request, res: Response): Promise<void>;
}