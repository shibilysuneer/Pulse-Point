import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import TYPES from "../../config/inversify/types";
import { IUserController } from "./interface/IUserController";
import { IUserAuthService } from "../../services/user/interface/IAuthService";

@injectable()
export class UserController implements IUserController {
  constructor(
    @inject(TYPES.UserAuthService)
    private userAuthService: IUserAuthService
  ) {}

  async userSignup(req: Request, res: Response): Promise<void> {
    console.log("body", req.body);
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        res.status(400).json({ error: "All fields are required." });
        return;
      }

      const { user, token } = await this.userAuthService.signup({ username, email, password });
      res.status(201).json({
         accesstoken: token,
         user:user,
      });
    } catch (error: any) {
      console.error("Signup Error:", error);
      res.status(400).json({ error: error.message||"Signup failed"  });
    }
  }

  async userLogin(req: Request, res: Response): Promise<void> {
    console.log("body", req.body);
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: "Email and password are required." });
        return;
      }

      const  { user, token } = await this.userAuthService.login({ email, password });
      res.status(200).json({
          accesstoken: token,
          user: user,
      });
    } catch (error: any) {
      console.error("Login Error:", error);
      res.status(401).json({ error: error.message|| "Login failed" });
    }
  }
async userLogout(_req: Request, res: Response): Promise<void> {
  try {
    // Since JWT is in localStorage and stateless, no server cleanup needed
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error: any) {
    console.error("Logout Error:", error);
    res.status(500).json({ error: error.message || "Logout failed" });
  }
}

  async googleLogin(req: Request, res: Response): Promise<void> {
    try {
      const { email, name, googleId } = req.body;

      if (!email) {
        res.status(400).json({ error: "Email is required." });
        return;
      }

      const user = await this.userAuthService.googleLogin({ email, name, googleId });
      res.status(200).json(user);
    } catch (error: any) {
      console.error("Google Login Error:", error);
      res.status(400).json({ error: error.message || "Google login failed" });
    }
  }

  async verifyToken(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        res.status(401).json({ error: "Token is missing." });
        return;
      }

      const isValid = await this.userAuthService.verifyToken(token);
      res.status(200).json({ valid: isValid });
    } catch (error: any) {
      console.error("Token verification error:", error);
      res.status(401).json({ error: "Invalid token" });
    }
  }

  async sendOtp(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;

      if (!email) {
        res.status(400).json({ error: "Email is required." });
        return;
      }

      const response = await this.userAuthService.sendOtp(email);
      res.status(200).json(response);
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

      const response = await this.userAuthService.resendOtp(email);
      res.status(200).json(response);
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

      const isVerified = await this.userAuthService.verifyOtp({ email, otp });
      res.status(200).json(isVerified);
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

      const result = await this.userAuthService.resetPassword({ email, newPassword });
      res.status(200).json(result);
    } catch (error: any) {
      console.error("Reset Password Error:", error);
      res.status(400).json({ error: error.message || "Failed to reset password." });
    }
  }
}
