import { injectable,inject } from "inversify";
import { IAdminAuthService } from "./interface/IAuthService";
import { AdminLoginRequest, AdminLoginResponse, AdminSignupRequest, AdminSignupResponse } from "../../types/admin/authTypes";
// import { AdminModel } from "../../models/admin/adminModal";
import bcrypt from 'bcrypt'
import { IAdminRepository } from "../../repositories/admin/interface/IAdminRepository";
import TYPES from "../../config/inversify/types";
import { IAdminDocument } from "../../models/admin/interfaces/adminInterface";
import jwt from 'jsonwebtoken'
import { generateToken } from "../../utils/authUtils";

@injectable()
export class authService implements IAdminAuthService{
    constructor(
    @inject(TYPES.AdminRepository)
    private adminRepository: IAdminRepository
  ) {}
    async adminSignup(data: AdminSignupRequest): Promise<AdminSignupResponse> {
        const {username,email,password} = data

        const existngAdmin = await this.adminRepository.findByEmail(email)
        if(existngAdmin){
            throw new Error('Admin already exist')
        }
        const hashedPassword = await bcrypt.hash(password,10);

        const newAdmin = await this.adminRepository.create({
            username,
            email,
            password:hashedPassword,
            role:'admin',
            createdAt:new Date()
        }as IAdminDocument)

        // const savedAdmin = await newAdmin.save();

        const token = generateToken(newAdmin);
         return {
      admin: newAdmin,
      token
    };
    }
    async adminLogin(data: AdminLoginRequest): Promise<AdminLoginResponse> {
        const { email, password } = data;

    const admin = await this.adminRepository.findByEmail(email)
    if (!admin) {
      throw new Error("Admin not found.");
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      throw new Error("Invalid password.");
    }

    const token = generateToken(admin);

    return {
      admin,
      token
    };
    }
    async verifyToken(token: string): Promise<{ token: string; }> {
        try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
      return { token: JSON.stringify(decoded) };
    } catch (error) {
      throw new Error("Invalid or expired token.");
    }
    }
}