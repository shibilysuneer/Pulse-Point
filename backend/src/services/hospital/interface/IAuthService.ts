
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
}
