import { model, models, Schema } from "mongoose";
import { IOtpDocument } from "./interface/otpInterface";

const otpSchema = new Schema<IOtpDocument>({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 300 }, 
  });

//   export const OTPModel = model<IOtpDocument>("OTP", otpSchema);
export const OTPModel = models.OTP || model<IOtpDocument>("OTP", otpSchema);
