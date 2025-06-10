
import {
  HospitalSignupRequest,
  HospitalSignupResponse,
  HospitalLoginRequest,
  HospitalLoginResponse,
  HospitalGoogleLoginRequest,
  HospitalGoogleLoginResponse,
} from '../../../types/hospital/authType';

export interface IAuthService {
  signup(data: HospitalSignupRequest): Promise<HospitalSignupResponse>;
  login(data: HospitalLoginRequest): Promise<HospitalLoginResponse>;
  googleLogin(data: HospitalGoogleLoginRequest): Promise<HospitalGoogleLoginResponse>;
   verifyToken(token: string): Promise<{ token: string }>;

  sendOtp(email: string): Promise<{ message: string }>;
  resendOtp(email: string): Promise<{ message: string }>;
  verifyOtp(data: { email: string; otp: string }): Promise<{ message: string }>;
  resetPassword(data:{email: string, newPassword: string}): Promise<{ message: string }>;

}
