import { injectable,inject } from "inversify";
import { IAdminAuthService } from "./interface/IAuthService";
import { AdminLoginRequest, AdminLoginResponse} from "../../types/admin/authTypes";
import bcrypt from 'bcrypt'
import { IAdminRepository } from "../../repositories/admin/interface/IAdminRepository";
import TYPES from "../../config/inversify/types";
import jwt from 'jsonwebtoken'
import { generateToken,generateRefreshToken } from "../../utils/authUtils";

@injectable()
export class authService implements IAdminAuthService{
    constructor(
    @inject(TYPES.AdminRepository)
    private adminRepository: IAdminRepository
  ) {}
   
    async adminLogin(data: AdminLoginRequest): Promise<AdminLoginResponse> {
        const { email, password } = data;

    const admin  = await this.adminRepository.findByEmail(email)
     console.log("admin", admin);
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
 const accesstoken  = generateToken({_id:admin._id.toString(),role:admin.role});
 const refreshToken = generateRefreshToken({ _id: admin._id.toString(), role: admin.role });

    return { admin, accesstoken,refreshToken  };
    }

  async verifyToken(token: string): Promise<{ token: string; }> {
        try {
      const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!)as {_id:string,role:string};
      const admin = await this.adminRepository.findById(decoded._id)
        if (!admin) {
        throw new Error("Admin not found");
      }
       const accessToken = jwt.sign(
        { _id: admin._id, role: admin.role },
        process.env.JWT_SECRET!,
        { expiresIn: "15min" }
      );
      return {  token: accessToken};
      // return { token: JSON.stringify(decoded) };
    } catch (error) {
      throw new Error("Invalid or expired token.");
    }
    }
}