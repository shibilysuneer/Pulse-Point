import { injectable,inject } from "inversify";
import { IAdminAuthService } from "./interface/IAuthService";
import { AdminLoginRequest, AdminLoginResponse} from "../../types/admin/authTypes";
import bcrypt from 'bcrypt'
import { IAdminRepository } from "../../repositories/admin/interface/IAdminRepository";
import TYPES from "../../config/inversify/types";
import jwt from 'jsonwebtoken'
import { generateToken } from "../../utils/authUtils";

@injectable()
export class authService implements IAdminAuthService{
    constructor(
    @inject(TYPES.AdminRepository)
    private adminRepository: IAdminRepository
  ) {}
   
    async adminLogin(data: AdminLoginRequest): Promise<AdminLoginResponse> {
        const { email, password } = data;

    const admin  = await this.adminRepository.findByEmail(email)
  if (!admin) {
  throw new Error("Admin not found.");
}
if (admin.role !== "admin") {
  throw new Error("Access denied. Not an admin.");
}
   if (!admin.password) {
    throw new Error("Admin invalid credential.");
  }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      throw new Error("Incorrect email or password.");
    }

    const token = generateToken({
         _id: admin._id,
         email: admin.email,
         role: admin.role
    })
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