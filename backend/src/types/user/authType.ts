import { IUserDocument } from "../../models/user/interface/userInterface";

// Signup Request
export interface UserSignupRequest {
  username: string;
  email: string;
  password: string;
}

// Signup Response
export interface UserSignupResponse {
  user: IUserDocument;
  token: string;
}

// Login Request
export interface UserLoginRequest {
  email: string;
  password: string;
}

// Login Response
export interface UserLoginResponse {
  user: IUserDocument;
  token: string;
}

// Google Login Request (optional, if using Google auth)
export interface UserGoogleLoginRequest {
  email: string;
  name?: string;
  googleId?: string;
}

// Google Login Response
export interface UserGoogleLoginResponse {
  user: IUserDocument;
  token: string;
}
export interface OtpRecord {
  email: string;
  otp: string;
  createdAt: Date; 
}
