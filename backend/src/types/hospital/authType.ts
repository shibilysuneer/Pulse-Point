import { IHospitalDocument } from "../../models/hospital/interfaces/hospitalInterface";

export interface HospitalSignupRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  registrationNumber?:string;
}

export interface HospitalSignupResponse {
  hospital: IHospitalDocument;
  token: string;
}

export interface HospitalLoginRequest {
  email: string;
  password: string;
}

export interface HospitalLoginResponse {
  hospital: IHospitalDocument;
  token: string;
}

export interface HospitalGoogleLoginRequest {
  email: string;
  name?: string;
  googleId?: string;
}

export interface HospitalGoogleLoginResponse {
  hospital: IHospitalDocument;
  token: string;
}

