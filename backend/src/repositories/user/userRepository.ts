import { inject, injectable } from "inversify";
import User from "../../models/user/userModel";
import { BaseRepository } from "../baseRepository/baseRepository";
import { IUser, IUserDocument } from "../../models/user/interface/userInterface";
import { IUserRepository } from "./interface/IUserRepository"; // <-- add this
import { OtpRecord } from "../../types/user/authType";
import { IOtpRepository } from "../otp/interface/IOtpRepository";
import TYPES from "../../config/inversify/types";

@injectable()
export class UserRepository extends BaseRepository<IUserDocument> implements IUserRepository {
  constructor(
     @inject(TYPES.OtpRepository) 
    private otpRepository: IOtpRepository
  ) {
    super(User);
  }

  async findUserByEmail(email: string): Promise<IUserDocument | null> {
    return this.model.findOne({ email });
  }

  async createUser(data: IUser): Promise<IUserDocument> {
    const user = new User(data);
    return await user.save();
  }

  async updatePassword(email: string, hashedPassword: string): Promise<void> {
    const user = await this.model.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    user.password = hashedPassword;
    await user.save();
  }
 async saveOtp(email: string, otp: string): Promise<void> {
    await this.otpRepository.saveOtp( email, otp);
  }
   async reSaveOtp(email: string, otp: string): Promise<void> {
    // await OTPModel.findOneAndUpdate(
    //   { email },
    //   { otp, createdAt: new Date() },
    //   { new: true, upsert: true }
    // );
    await this.otpRepository.reSaveOtp(email, otp);
  }
  async findOtpByEmail(email: string): Promise<OtpRecord | null> {
    // return await OTPModel.findOne({ email });
    return await this.otpRepository.findOtpByEmail(email);
  }
  async deleteOtp(email: string): Promise<void> {
    // await OTPModel.deleteOne({ email });
    await this.otpRepository.deleteOtp(email);
  }
  async updateUserPassword(
    email: string,
    hashedPassword: string
  ): Promise<void> {
    await this.model.findOneAndUpdate(
      { email },
      { $set: { password: hashedPassword } },
      { new: true, runValidators: false }
    );
  }
}
