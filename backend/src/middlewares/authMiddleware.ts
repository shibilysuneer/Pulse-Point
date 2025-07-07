import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/common/middType";
import { Response, NextFunction } from "express";
import mongoose from "mongoose";
import Hospital from "../models/hospital/hospitalModel";
import User from "../models/user/userModel";


export const authenticateHospital = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.header("Authorization");
    console.log("authHeader",authHeader);
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ error: "Authorization header missing or malformed" });
      return;
    }

    const token = authHeader.split(" ")[1];
    console.log("tokenmiddleware:",token);
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      _id: string;
      role: string;
    };

     const hospital = await Hospital.findById(new mongoose.Types.ObjectId(decoded._id)).select("-password");
    if (!hospital) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    console.log("hospital in midd:",hospital);
    

    req.user = { id: hospital._id.toString(), role: hospital.role };
    console.log("req-user",req.user);
    
    return next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({ error: "Invalid token" });
    return;
  }
};



export const authenticateHospitalAdmin = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.header("Authorization");
    console.log("authHeader==", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ error: "Authorization header missing or malformed" });
      return;
    }

    const token = authHeader.split(" ")[1];
    console.log("token middleware:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      _id: string;
      role: string;
    };

    const hospital = await Hospital.findById(new mongoose.Types.ObjectId(decoded._id)).select("-password");

    if (!hospital) {
      res.status(404).json({ error: "Hospital not found" });
      return;
    }

    if (hospital.role !== "admin") {
      res.status(403).json({ error: "Access denied: Admins only" });
      return;
    }


    req.user = { id: hospital._id.toString(), role: hospital.role };
    console.log("req.user (admin)", req.user);

    return next();
  } catch (error) {
    console.error("Admin auth middleware error:", error);
    res.status(401).json({ error: "Invalid token" });
    return;
  }
};



export const authenticateUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.header("Authorization");
    console.log("[UserAuth] Authorization:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Authorization header missing or malformed" });
      return;
    }

    const token = authHeader.split(" ")[1];
    console.log("[UserAuth] Token:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      _id: string;
      role: string;
    };

    const user = await User.findById(decoded._id).select("-password");

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    req.user = { id: user._id.toString(), role: user.role };
    console.log("[UserAuth] req.user:", req.user);

    return next();
  } catch (error) {
    console.error("[UserAuth] Error:", error);
    res.status(401).json({ message: "Invalid token" });
    return;
  }
};