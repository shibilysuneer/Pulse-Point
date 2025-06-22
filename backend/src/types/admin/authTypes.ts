
import { IHospitalDocument } from "../../models/hospital/interfaces/hospitalInterface";

export interface AdminLoginRequest {
     email: string;
    password: string;
  
}
export interface AdminLoginResponse {
    admin:IHospitalDocument;
    accesstoken:string;
    refreshToken: string;
}
 