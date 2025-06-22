import { injectable,inject } from "inversify";
import { IAdminAuthService } from "./interface/IAuthService";
import { AdminLoginRequest, AdminLoginResponse} from "../../types/admin/authTypes";
import bcrypt from 'bcrypt'
import { IAdminRepository } from "../../repositories/admin/interface/IAdminRepository";
import TYPES from "../../config/inversify/types";
import jwt from 'jsonwebtoken'
import { generateToken,generateRefreshToken } from "../../utils/authUtils";
import { generateOtp } from "../../utils/otpUtils";
import { sendOtpEmail } from "../../utils/mailerUtils";
import { IUserRepository } from "../../repositories/user/interface/IUserRepository";

@injectable()
export class authService implements IAdminAuthService{
    constructor(
    @inject(TYPES.AdminRepository)
    private adminRepository: IAdminRepository,

     @inject(TYPES.UserRepository)
    private userRepository: IUserRepository
   
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

    async sendOtpService(email: string): Promise<{ message: string; otp: string }> {
  const admin = await this.adminRepository.findByEmail(email);
  if (!admin) {
    throw new Error("Admin not found.");
  }

  const otp = generateOtp();
  console.log(`OTP`,otp);

  console.log(`Generated OTP for ${email}:`, otp);
    


  await this.userRepository.saveOtp(email, otp);
  await sendOtpEmail(email, "Admin OTP Verification", `Your OTP is: ${otp}. It will expire in 30 seconds.`);

  return { message: "OTP sent successfully", otp };
}
async resendOtpService(email: string): Promise<{ message: string; otp: string }> {
  const admin = await this.adminRepository.findByEmail(email);
  if (!admin) {
    throw new Error("Admin not found.");
  }

  const otp = generateOtp();
  console.log(`Resent OTP for ${email}:`, otp);

  await this.userRepository.reSaveOtp(email, otp);
  await sendOtpEmail(email, "Admin Resend OTP", `Your OTP is: ${otp}. It will expire in 30 seconds.`);

  return { message: "OTP resent successfully", otp };
}
async verifyOtpService(email: string, otp: string): Promise<boolean> {
  const storedOtp = await this.userRepository.findOtpByEmail(email);
  if (!storedOtp || storedOtp.otp !== otp) {
    return false;
  }

  const createdAt = storedOtp.createdAt;
  if (!createdAt) {
    throw new Error("OTP creation date is missing.");
  }

  const otpAge = (Date.now() - new Date(createdAt).getTime()) / 1000;
  if (otpAge > 30) {
    return false;
  }

  await this.userRepository.deleteOtp(email);
  return true;
}
async resetPasswordService(email: string, newPassword: string): Promise<void> {
  const admin = await this.adminRepository.findByEmail(email);
  if (!admin) throw new Error("Admin not found");

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await this.adminRepository.updateAdminPassword(email, hashedPassword);
}

}