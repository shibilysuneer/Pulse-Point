import { Document,Types } from 'mongoose';

export interface IUser {
  username: string;
  email: string;
  password: string;
  role?: string;
  isGoogleAuth?: boolean;  
  createdAt?: Date;  
}

export interface IUserDocument extends IUser, Document {
     _id:Types.ObjectId;
}
