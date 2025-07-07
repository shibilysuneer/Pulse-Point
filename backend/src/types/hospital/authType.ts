import { IHospitalDocument } from "../../models/hospital/interfaces/hospitalInterface";

export interface HospitalSignupRequest {
  name: string;
  email: string;
  password: string;
  registrationNumber?:string;
  phone:string;
  //  location?: IHospitalDocument['location']; 
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

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface SubmitRegistrationDetailsRequest {
  licenseNumber: string;
  website?: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}
