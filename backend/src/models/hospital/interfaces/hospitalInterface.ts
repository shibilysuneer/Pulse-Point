import  { Document,Types } from "mongoose";

export interface IHospital{
    
  name: string;
  email: string;
  password?: string; 
  phone?: string;
  address?: string;
  registrationNumber?: string;
  isGoogleAuth?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  googleId?: string;
  isAdmin?: boolean;
   role: string;

}
export interface IHospitalDocument extends IHospital,Document{
    _id:Types.ObjectId;
}