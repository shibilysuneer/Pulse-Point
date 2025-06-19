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
      const token = await this.authService.adminLogin({ email, password });
      res.status(200).json({ token });
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
}
