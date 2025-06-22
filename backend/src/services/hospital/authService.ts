import bcrypt from 'bcrypt'
// import { IHospital } from '../../models/hospital/interfaces/hospitalInterface'
import { generateToken } from '../../utils/authUtils'
import jwt from 'jsonwebtoken'
import { inject,injectable } from 'inversify'
import { IHospitalRepository } from '../../repositories/hospital/interface/IHospitalRepository'
import { IAuthService } from './interface/IAuthService'
import TYPES from "../../config/inversify/types";
import { HospitalSignupRequest,
    HospitalSignupResponse,
    HospitalLoginRequest,HospitalLoginResponse,
    HospitalGoogleLoginRequest,
    HospitalGoogleLoginResponse
 } from '../../types/hospital/authType'
import { generateOtp } from '../../utils/otpUtils'
import { OTPModel } from '../../models/hospital/otpModel'
import { sendOtpEmail } from '../../utils/mailerUtils'

@injectable()
export class HospitalAuthService implements IAuthService {
    constructor(
        @inject(TYPES.HospitalRepository)
        private hospitalRepository:IHospitalRepository
        
    ){}
    async signup(hospitalData:HospitalSignupRequest):Promise<HospitalSignupResponse>{
        const {email,password,name,registrationNumber}=hospitalData;

        const existingHospital = await this.hospitalRepository.findByEmail(email);
    if (existingHospital) {
      throw new Error("Hospital already exists");
    }
    const hashedPassword = await bcrypt.hash(password!,10)
    const newHospital = await this.hospitalRepository.create({
      ...hospitalData,
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      registrationNumber,
      role: "hospital",
    });

    const token = generateToken({
      _id: newHospital._id.toString(),
       role: newHospital.role,
      
    });
     return {
      hospital: newHospital,
      token,
    };
    }


    async login(loginData: HospitalLoginRequest): Promise<HospitalLoginResponse> {
         const { email, password } = loginData;
    const hospital = await this.hospitalRepository.findByEmail(email);

    if (!hospital) {
      throw new Error("Hospital not found");
    }
    const isMatch = await bcrypt.compare(password, hospital.password!);
    if (!isMatch) {
      throw new Error("Invalid password");
    }

    const token = generateToken({
      _id: hospital._id.toString(),
      role: hospital.role,
    });

    return {
      hospital,
      token,
    };
  }

  async googleLogin(googleData: HospitalGoogleLoginRequest
  ): Promise<HospitalGoogleLoginResponse> {
     const { email } = googleData;
    
    let hospital = await this.hospitalRepository.findByEmail(email);

    if (!hospital) {
      hospital = await this.hospitalRepository.create({
         name:'Google User',
        email,
        isGoogleAuth: true,
        // googleId,
        createdAt: new Date(),
        role: "hospital",
      });
    }

    const token = generateToken({
      _id: hospital._id.toString(),
       role: hospital.role,
     
    });

    return {
      hospital,
      token,
    };
  }

 async verifyToken(token: string): Promise<{ token: string; }> {
         try {
       const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
       return { token: JSON.stringify(decoded) };
     } catch (error) {
       throw new Error("Invalid or expired token.");
     }
     }

    async sendOtp(email: string): Promise<{ message: string }> {
  const otp = generateOtp();
  await OTPModel.findOneAndDelete({ email }); // delete existing
  await OTPModel.create({ email, otp });

  await sendOtpEmail(email, "OTP Verification", `Your OTP is ${otp}`);
  return { message: "OTP sent to email" };
}

async resendOtp(email: string): Promise<{ message: string }> {
  const otp = generateOtp();
  await OTPModel.findOneAndDelete({ email });
  await OTPModel.create({ email, otp });

  await sendOtpEmail(email, "Resend OTP", `Your new OTP is ${otp}`);
  return { message: "OTP resent to email" };
}

async verifyOtp(data: { email: string; otp: string }): Promise<{ message: string }> {
  const { email, otp } = data;
  const record = await OTPModel.findOne({ email });

  if (!record || record.otp !== otp) {
    throw new Error("Invalid or expired OTP");
  }

  await OTPModel.deleteOne({ email }); // delete after verification
  return { message: "OTP verified successfully" };
} 

async resetPassword(data: { email: string; newPassword: string }): Promise<{ message: string }> {
  const { email, newPassword } = data;

  const hospital = await this.hospitalRepository.findByEmail(email);
  if (!hospital) {
    throw new Error("Hospital not found");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  hospital.password = hashedPassword;

  await hospital.save();
  return { message: "Password reset successful" };
}
}