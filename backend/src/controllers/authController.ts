import { Request,Response } from "express";
import { IAdminController } from "./admin/interface/IAuthController";
import TYPES from "../config/inversify/types";
import { inject,injectable } from "inversify";
import { IAdminAuthService } from "../services/admin/interface/IAuthService";
import { AuthService } from "../services/admin/authService";

@injectable()
export class AuthController implements IAuthController{
    constructor{
        @inject(TYPES.AuthService)
        private authService:IAuthService
    }{}

//  async login(req: Request, res: Response): Promise<void> {
//     try {
//       const result = await this.adminAuthService.adminLogin(req.body);
//       res.status(200).json(result);
//     } catch (error: any) {
//       res.status(500).json({ error: error.message || "Login failed" });
//     }
//   }

//   async signup(req: Request, res: Response): Promise<void> {
//     try {
//       const result = await this.adminAuthService.adminSignup(req.body);
//       res.status(201).json(result);
//     } catch (error: any) {
//       res.status(500).json({ error: error.message || "Signup failed" });
//     }
//   }
}