import  { Document,Types } from "mongoose";

export interface IAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
   latitude?: number;
  longitude?: number;
}
export interface IHospital{
    
  name: string;
  email: string;
  password?: string; 
  phone?: string;
  address?: IAddress;
  registrationNumber?: string;
  licenseNumber?:string;
  website?:string;
  isGoogleAuth?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  googleId?: string;
  isAdmin?: boolean;
  role: string;
  isBlocked: boolean;
  status:'unregistered' | 'pending' | 'approved' | 'rejected';
  //  location?: {
  //   type: 'Point';
  //   coordinates: [number, number];
  // };
}
export interface IHospitalDocument extends IHospital,Document{
    _id:Types.ObjectId;
}