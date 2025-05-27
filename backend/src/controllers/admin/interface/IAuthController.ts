import { Request,Response } from "express";

export interface IAdminController{
    adminLogin(req:Request,res:Response):Promise<void>;
    adminSignup(req:Request,res:Response):Promise<void>;
    verifyToken(req:Request,res:Response):Promise<void>;
}