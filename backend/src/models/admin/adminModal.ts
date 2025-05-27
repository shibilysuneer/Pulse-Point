import {Schema,model} from "mongoose";
import { IAdminDocument } from "./interfaces/adminInterface";

const adminSchema = new Schema<IAdminDocument>(
    {
        username:{
            type: String,
             required: true,
            unique: true
        },
        email:{
            type: String,
             required: true, 
             unique: true
        },
        password:{
            type: String, 
            required: true
        },
        role:{
            type:String,
            enum:["user","hospital","admin"],
            default:"admin",
            required:true
        },
        createdAt:{
            type:Date,default:Date.now
        },
    })
    export const AdminModel = model<IAdminDocument>("Admin",adminSchema)