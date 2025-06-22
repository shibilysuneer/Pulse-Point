import { IUser, IUserDocument} from '../../../models/user/interface/userInterface';

export interface IUserRepository {
  findUserByEmail(email: string): Promise<IUserDocument | null>;
  createUser(data: Partial<IUser>): Promise<IUserDocument>;
  updatePassword(email: string, hashedPassword: string): Promise<void>;

}
