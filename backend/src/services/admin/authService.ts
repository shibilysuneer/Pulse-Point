import { injectable,inject } from "inversify";
// import jwt from "jsonwebtoken";
import { IAdminAuthService } from "./interface/IAuthService";
import { AdminLoginRequest,AdminLoginResponse,AdminSignupRequest,AdminSignupResponse } from "../../types/admin/authTypes";
import bcrypt from "bcrypt"
import { AdminRepository } from "../../repositories/admin/adminRepository";
import { IAdminDocument } from "../../models/admin/interfaces/adminInterface";
import {IAdminRepository} from "../../repositories/admin/interface/IAdminRepository"
import TYPES from "../../config/inversify/types";

injectable()
export class AuthService implements IAdminAuthService{
  constructor(
    @inject(TYPES.AdminRepository)
    private AdminRepository:IAdminRepository,
  ){}
  async verifyToken(token: string): Promise<{ token: string; }> {
      
  }
  async adminLogin(data: AdminLoginRequest): Promise<AdminLoginResponse> {
      
  }
  async adminSignup(data: AdminSignupRequest): Promise<AdminSignupResponse> {
      
  }
}