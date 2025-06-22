import { IUser, IUserDocument} from '../../../models/user/interface/userInterface';
import { OtpRecord } from '../../../types/user/authType';

export interface IUserRepository {
  findUserByEmail(email: string): Promise<IUserDocument | null>;
  createUser(data: Partial<IUser>): Promise<IUserDocument>;
  updatePassword(email: string, hashedPassword: string): Promise<void>;

  saveOtp(email: string, otp: string): Promise<void>;
  reSaveOtp(email: string, otp: string): Promise<void>;
  findOtpByEmail(email: string): Promise<OtpRecord | null>;
  deleteOtp(email: string): Promise<void>;
}
