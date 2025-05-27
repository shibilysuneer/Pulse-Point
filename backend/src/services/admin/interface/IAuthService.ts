import { AdminLoginRequest,AdminLoginResponse,AdminSignupRequest,AdminSignupResponse } from "../../../types/admin/authTypes";

export interface IAdminAuthService {
    verifyToken(token:string):Promise<{token:string}>
    adminLogin(data:AdminLoginRequest):Promise<AdminLoginResponse>
    adminSignup(data:AdminSignupRequest):Promise<AdminSignupResponse>
}