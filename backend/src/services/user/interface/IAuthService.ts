import {
  UserSignupRequest,
  UserSignupResponse,
  UserLoginRequest,
  UserLoginResponse,
  UserGoogleLoginRequest,
  UserGoogleLoginResponse,
} from "../../../types/user/authType";

export interface IUserAuthService {
  signup(data: UserSignupRequest): Promise<UserSignupResponse>;
  login(data: UserLoginRequest): Promise<UserLoginResponse>;
  googleLogin(data: UserGoogleLoginRequest): Promise<UserGoogleLoginResponse>;

  verifyToken(token: string): Promise<{ token: string }>;

  sendOtp(email: string): Promise<{ message: string }>;
  resendOtp(email: string): Promise<{ message: string }>;
  verifyOtp(data: { email: string; otp: string }): Promise<{ message: string }>;
  resetPassword(data: { email: string; newPassword: string }): Promise<{ message: string }>;
}
