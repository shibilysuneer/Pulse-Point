import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IHospitalController } from "./interface/IHospitalController";
import TYPES from "../../config/inversify/types";
import { IAuthService } from "../../services/hospital/interface/IAuthService";

@injectable()
export class HospitalController implements IHospitalController {
  constructor(
    @inject(TYPES.HospitalAuthService)
    private hospitalAuthService: IAuthService

  ) {}

  async hospitalSignup(req: Request, res: Response): Promise<void> {
    try {
      console.log("Received data:", req.body);
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        res.status(400).json({ error: "All fields are required." });
        return;
      }

      const hospital = await this.hospitalAuthService.signup({
       name: username,
        email,
        password,
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

      const token = await this.hospitalAuthService.login({ email, password });
      res.status(200).json({ token });
    } catch (error: any) {
      console.error("Login Error:", error);
      res.status(401).json({ error: error.message });
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
}
