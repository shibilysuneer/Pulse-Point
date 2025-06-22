import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { inject, injectable } from 'inversify';

import { generateToken } from '../../utils/authUtils';
import { generateOtp } from '../../utils/otpUtils';
import { sendOtpEmail } from '../../utils/mailerUtils';
import TYPES from '../../config/inversify/types';

import {
  UserSignupRequest,
  UserSignupResponse,
  UserLoginRequest,
  UserLoginResponse,
  UserGoogleLoginRequest,
  UserGoogleLoginResponse,
} from '../../types/user/authType';

import { IUserRepository } from '../../repositories/user/interface/IUserRepository';
import { IUserAuthService } from './interface/IAuthService';
import { OTPModel } from '../../models/user/otpModel';
import { IUserDocument } from '../../models/user/interface/userInterface';

@injectable()
export class UserAuthService implements IUserAuthService {
  constructor(
    @inject(TYPES.UserRepository)
    private userRepository: IUserRepository
  ) {}

  async signup(userData: UserSignupRequest): Promise<UserSignupResponse> {
    const { email, password, username } = userData;

    const existingUser = await this.userRepository.findUserByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: IUserDocument = await this.userRepository.createUser({
      username,
      email,
      password: hashedPassword,
      role: 'user',
    });

    const token = generateToken({
      _id: newUser._id.toString(),
      role: newUser.role?? 'user',
    });

    return {
      user: newUser,
      token,
    };
  }

  async login(data: UserLoginRequest): Promise<UserLoginResponse> {
    const { email, password } = data;

    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password!);
    if (!isMatch) {
      throw new Error('Invalid password');
    }

    const token = generateToken({
      _id: user._id.toString(),
      role: user.role?? 'user',
    });

    return {
      user,
      token,
    };
  }

  async googleLogin(data: UserGoogleLoginRequest): Promise<UserGoogleLoginResponse> {
    const { email } = data;

    let user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      user = await this.userRepository.createUser({
        username: 'Google User',
        email,
        isGoogleAuth: true,
        createdAt: new Date(),
        role: 'user',
      });
    }

    const token = generateToken({
      _id: user._id.toString(),
      role: user.role?? 'user',
    });

    return {
      user,
      token,
    };
  }

  async verifyToken(token: string): Promise<{ token: string }> {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
      return { token: JSON.stringify(decoded) };
    } catch (error) {
      throw new Error('Invalid or expired token.');
    }
  }

  async sendOtp(email: string): Promise<{ message: string }> {
    const otp = generateOtp();
    console.log("OTP",otp);
    
    await OTPModel.findOneAndDelete({ email });
    await OTPModel.create({ email, otp });

    await sendOtpEmail(email, 'OTP Verification', `Your OTP is ${otp}`);
    return { message: 'OTP sent to email' };
  }

  async resendOtp(email: string): Promise<{ message: string }> {
    const otp = generateOtp();
        console.log("OTP",otp);
    await OTPModel.findOneAndDelete({ email });
    await OTPModel.create({ email, otp });

    await sendOtpEmail(email, 'Resend OTP', `Your new OTP is ${otp}`);
    return { message: 'OTP resent to email' };
  }

  async verifyOtp(data: { email: string; otp: string }): Promise<{ message: string }> {
    const { email, otp } = data;
    const record = await OTPModel.findOne({ email });

    if (!record || record.otp !== otp) {
      throw new Error('Invalid or expired OTP');
    }

    await OTPModel.deleteOne({ email });
    return { message: 'OTP verified successfully' };
  }

  async resetPassword(data: { email: string; newPassword: string }): Promise<{ message: string }> {
    const { email, newPassword } = data;

    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    // user.password = hashedPassword;
    // await user.save();
    await this.userRepository.updatePassword(email, hashedPassword);

    return { message: 'Password reset successful' };
  }
}
