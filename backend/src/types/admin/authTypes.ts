import { IAdminDocument } from "../../models/admin/interfaces/adminInterface";

export interface AdminLoginRequest {
     email: string;
    password: string;
}
export interface AdminLoginResponse {
    admin:IAdminDocument;
    token:string;
}
  export interface AdminSignupRequest{
    username : string;
    email: string;
    password: string;
  }
   export interface AdminSignupResponse{
    admin:IAdminDocument;
    token:string;
   }