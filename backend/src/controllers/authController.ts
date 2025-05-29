import { Request,Response } from "express";
import { inject,injectable } from "inversify";
import { IAdminController } from "./admin/interface/IAuthController";
import TYPES from "../config/inversify/types";
import { IAdminAuthService } from "../services/admin/interface/IAuthService";

@injectable()
export class authController implements IAdminController{
    constructor(
        @inject(TYPES.AuthService)
        private authService:IAdminAuthService
    ){}

    async adminSignup(req: Request, res: Response): Promise<void> {
        try {
            console.log('recieved data:',req.body)
            const {username,email,password}=req.body;
            if (!username || !email || !password) {
        res.status(400).json({ error: "All fields are required." });
        return;
      }
       const admin = await this.authService.adminSignup({ username, email, password });
      res.status(201).json(admin);
        } catch (error:any) {
           console.error("err", error);
      res.status(400).json({ error: error.message });  
        }
    }
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
