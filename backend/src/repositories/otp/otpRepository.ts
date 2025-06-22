import { injectable } from "inversify";
import { OTPModel } from "../../models/user/otpModel";
import { IOtpRepository } from "./interface/IOtpRepository";
import { BaseRepository } from "../baseRepository/baseRepository";
import { OtpRecord } from "../../types/user/authType";
import { IOtpDocument } from "../../models/user/interface/otpInterface";


@injectable()
export class OtpRepository extends BaseRepository<IOtpDocument> implements IOtpRepository {
  constructor() {
    super(OTPModel);
  }

  async saveOtp(email: string, otp: string): Promise<void> {
    await this.model.create({ email, otp, createdAt: new Date() });
  }

  async reSaveOtp(email: string, otp: string): Promise<void> {
    await this.model.findOneAndUpdate(
      { email },
      { otp, createdAt: new Date() },
      { new: true, upsert: true }
    );
  }

  async findOtpByEmail(email: string): Promise<OtpRecord | null> {
    return await this.model.findOne({ email });
  }

  async deleteOtp(email: string): Promise<void> {
    await this.model.deleteOne({ email });
  }
}