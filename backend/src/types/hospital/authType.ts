import { IHospitalDocument } from "../../models/hospital/interfaces/hospitalInterface";

export interface HospitalSignupRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
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


// export interface HospitalSignupRequest {
//   name: string;
//   email: string;
//   password: string;
//   phone?: string;
//   address?: string;
// }

// export interface HospitalLoginRequest {
//   email: string;
//   password: string;
// }

// export interface HospitalGoogleLoginRequest {
//   email: string;
//   name: string;
// }

// export interface HospitalResponse {
//   _id: string;
//   name: string;
//   email: string;
//   phone?: string;
//   address?: string;
//   isGoogleAuth?: boolean;
//   createdAt?: string;
//   updatedAt?: string;
// }

// export interface AuthResponse {
//   token: string;
//   hospital: HospitalResponse;
// }
