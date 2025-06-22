import { AdminLoginRequest,AdminLoginResponse} from "../../../types/admin/authTypes";

export interface IAdminAuthService {
    verifyToken(token:string):Promise<{token:string}>
    adminLogin(data:AdminLoginRequest):Promise<AdminLoginResponse>
    sendOtpService(email: string): Promise<{ message: string; otp: string }>;
    resendOtpService(email: string): Promise<{ message: string; otp: string }>;
    verifyOtpService(email: string, otp: string): Promise<boolean>;
    resetPasswordService(email: string, newPassword: string): Promise<void>;
}