import { Request,Response } from "express";
import { inject,injectable } from "inversify";
import { IAdminController } from "./interface/IAuthController";
import TYPES from "../../config/inversify/types";
import { IAdminAuthService } from "../../services/admin/interface/IAuthService";

@injectable()
export class authController implements IAdminController{
    constructor(
        @inject(TYPES.AuthService)
        private authService:IAdminAuthService
    ){}

    async adminLogin(req: Request, res: Response): Promise<void> {
        try {
             const { email, password } = req.body;
      const { admin, accesstoken, refreshToken }  = await this.authService.adminLogin({ email, password });
       res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // set true in production (HTTPS)
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // 👉 Return accessToken and admin info
    res.status(200).json({ accesstoken, admin });
      // res.status(200).json({ accesstoken });
        } catch (error:any) {
           console.error("Login error:", error);
      res.status(401).json({ error: error.message });   
        }
    }
     async verifyToken(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      const isValid = await this.authService.verifyToken(token || "");
      res.status(200).json({ valid: isValid });
    } catch (error: any) {
      console.error("Token verification error:", error);
      res.status(401).json({ error: "Invalid token" });
    }
  }
   async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const refreshToken = req.cookies?.refreshToken;
      console.log("refreshToken",refreshToken);
      
      if (!refreshToken) {
         res.status(401).json({ error: "No refresh token provided." });
         return;
      }
      const {token} = await this.authService.verifyToken(refreshToken)
      res.status(200).json({ token });
    } catch (error: any) {
      console.error("err", error);
      res.status(401).json({ error: error.message });
    }
  }
  async adminLogout(_req: Request, res: Response): Promise<void> {
    try {
      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict" as const,
      };

      res.clearCookie("refreshToken", cookieOptions);
      res.status(200).json({
        success: true,
        message: "Logout successful",
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Logout failed",
      });
    }
  }
}
