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

@injectable()
export class HospitalAuthService implements IAuthService {
    constructor(
        @inject(TYPES.HospitalRepository)
        private hospitalRepository:IHospitalRepository
        
    ){}
    async signup(hospitalData:HospitalSignupRequest):Promise<HospitalSignupResponse>{
        const {email,password,name}=hospitalData;

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
    });

    const token = generateToken({
      _id: newHospital._id,
      email: newHospital.email,
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
      _id: hospital._id,
      email: hospital.email,
    });

    return {
      hospital,
      token,
    };
  }

  async googleLogin(googleData: HospitalGoogleLoginRequest
  ): Promise<HospitalGoogleLoginResponse> {
     const { email, name } = googleData;
    
    let hospital = await this.hospitalRepository.findByEmail(email);

    if (!hospital) {
      hospital = await this.hospitalRepository.create({
        name,
        email,
        isGoogleAuth: true,
        createdAt: new Date(),
      });
    }

    const token = generateToken({
      _id: hospital._id,
      email: hospital.email,
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

}