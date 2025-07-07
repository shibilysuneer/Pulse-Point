import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IHospitalController } from "./interface/IHospitalController";
import TYPES from "../../config/inversify/types";
import { IAuthService } from "../../services/hospital/interface/IAuthService";
import { AuthRequest } from "../../types/common/middType";

@injectable()
export class HospitalController implements IHospitalController {
  constructor(
    @inject(TYPES.HospitalAuthService)
    private hospitalAuthService: IAuthService

  ) {}

  async hospitalSignup(req: Request, res: Response): Promise<void> {
    try {
      console.log("Received data:", req.body);
      const { username, email, password ,registrationNumber,phone} = req.body;

      if (!username || !email || !password ||!registrationNumber) {
        res.status(400).json({ error: "All fields are required." });
        return;
      }

      const hospital = await this.hospitalAuthService.signup({
       name: username,
        email,
        password,
        registrationNumber,
        phone
      });

      res.status(201).json(hospital);
    } catch (error: any) {
      console.error("Signup Error:", error);
      res.status(400).json({ error: error.message });
    }
  }

  async hospitalLogin(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: "Email and password are required." });
        return;
      }

      const {token,hospital } = await this.hospitalAuthService.login({ email, password });
      res.status(200).json({accesstoken: token,hospital  });
    } catch (error: any) {
      console.error("Login Error:", error);
      res.status(401).json({ error: error.message });
    }
  }
  async hospitalLogout(_req: Request, res: Response): Promise<void> {
  try {
    
    res.status(200).json({ message: "Hospital logged out successfully" });
  } catch (error: any) {
    console.error("Logout Error:", error);
    res.status(500).json({ error: error.message || "Logout failed" });
  }
}

  async verifyToken(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        res.status(401).json({ error: "Token is missing." });
        return;
      }

      const isValid = await this.hospitalAuthService.verifyToken(token);
      res.status(200).json({ valid: isValid });
    } catch (error: any) {
      console.error("Token verification error:", error);
      res.status(401).json({ error: "Invalid token" });
    }
  }

  async googleLogin(req: Request, res: Response): Promise<void> {
  try {
    console.log("body", req.body);
    const { email, name,googleId } = req.body;

    if (!email) {
      res.status(400).json({ error: "Email required." });
      return;
    }

    const hospital = await this.hospitalAuthService.googleLogin({ email, name,googleId });

    res.status(200).json(hospital);
  } catch (error: any) {
    console.error("Google Login Error:", error);
    res.status(400).json({ error: error.message || "Google login failed" });
  }
}
async sendOtp(req: Request, res: Response): Promise<void> {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ error: "Email is required." });
      return;
    }

    const response = await this.hospitalAuthService.sendOtp(email);
    res.status(200).json({ message: response });
  } catch (error: any) {
    console.error("Send OTP Error:", error);
    res.status(500).json({ error: error.message || "Failed to send OTP." });
  }
}

 async resendOtp(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;

      if (!email) {
        res.status(400).json({ error: "Email is required." });
        return;
      }

      const response = await this.hospitalAuthService.resendOtp(email);
      res.status(200).json({ message: response });
    } catch (error: any) {
      console.error("Resend OTP Error:", error);
      res.status(500).json({ error: error.message || "Failed to resend OTP." });
    }
  }
  async verifyOtp(req: Request, res: Response): Promise<void> {
    try {
      const { email, otp } = req.body;

      if (!email || !otp) {
        res.status(400).json({ error: "Email and OTP are required." });
        return;
      }

      const isVerified = await this.hospitalAuthService.verifyOtp({email, otp});
      res.status(200).json({ verified: isVerified });
    } catch (error: any) {
      console.error("Verify OTP Error:", error);
      res.status(400).json({ error: error.message || "OTP verification failed." });
    }
  }

  async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const { email, otp, newPassword } = req.body;

      if (!email || !otp || !newPassword) {
        res.status(400).json({ error: "Email, OTP, and new password are required." });
        return;
      }

      const result = await this.hospitalAuthService.resetPassword({email, newPassword});
      res.status(200).json({ message: result });
    } catch (error: any) {
      console.error("Reset Password Error:", error);
      res.status(400).json({ error: error.message || "Failed to reset password." });
    }
  }


  async submitRegistrationDetails(req: AuthRequest , res: Response): Promise<void> {
  try {
    // console.log("req.user?.id",req.hospital?.id);
    
    const hospitalId = req.user?.id;
    console.log("hospitalId",hospitalId);
    
     if (!hospitalId) {
      res.status(401).json({ error: "Unauthorized: missing hospital ID" });
      return;
    } 
    const { licenseNumber, website, address } = req.body;

    if (!licenseNumber || !address?.street || !address?.city || !address?.state || !address?.zipCode) {
  throw new Error("All required fields must be filled.");
}


    const result = await this.hospitalAuthService.submitRegistrationDetails(
      hospitalId,
      { licenseNumber, website, address }
    );

    res.status(200).json(result);
  } catch (error: any) {
    console.error("Registration Details Error:", error);
    res.status(500).json({ error: error.message || "Failed to submit details" });
  }
}

}
