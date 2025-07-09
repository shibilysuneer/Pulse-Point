// import {  Response, NextFunction } from "express";
// import Hospital from "../models/hospital/hospitalModel";

// export const checkHospitalApproval = async (req: any, res: Response, next: NextFunction) => {
//   try {
//     const hospitalId = req.user._id;

//     const hospital = await Hospital.findById(hospitalId);

//     if (!hospital) {
//       return res.status(401).json({ error: "Hospital not found" });
//     }

//     if (hospital.status !== "approved") {
//       return res.status(403).json({ error: "Hospital is not approved yet" });
//     }

//     return next();
//   } catch (error) {
//     console.error("Approval check error:", error);
//     return res.status(500).json({ error: "Server error" });
//   }
// };

import {  Response, NextFunction } from "express";
import Hospital from "../models/hospital/hospitalModel";
import { AuthRequest } from "../types/common/middType";

export const checkHospitalApproval = async (
  req: AuthRequest,//Request& { user?: any },
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const hospitalId = req.user?.id;
    console.log("hospitalId",hospitalId);
    
    if (!hospitalId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
      res.status(404).json({ error: "Hospital not found" });
      return;
    }

    // if (hospital.status !== "approved") {
    //   res.status(403).json({ error:  `Access denied. Your account status is '${hospital.status}'. Please wait for admin approval.` });
    //   return;
    // }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
