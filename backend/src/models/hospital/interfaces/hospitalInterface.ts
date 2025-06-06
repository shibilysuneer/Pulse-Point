import  { Document,Types } from "mongoose";

export interface IHospital{
    
  name: string;
  email: string;
  password?: string; 
  phone?: string;
  address?: string;
  isGoogleAuth?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IHospitalDocument extends IHospital,Document{
    _id:Types.ObjectId;
}