import { Document,Types } from "mongoose";

export interface IAdmin{
    username:string;
    email:string;
    password:string;
    role:string;
    createdAt:Date;
} 
export interface IAdminDocument extends IAdmin,Document{
    _id:Types.ObjectId;
}