import { injectable } from "inversify";
import User from "../../models/user/userModel";
import { BaseRepository } from "../baseRepository/baseRepository";
import { IUser, IUserDocument } from "../../models/user/interface/userInterface";
import { IUserRepository } from "./interface/IUserRepository"; // <-- add this

@injectable()
export class UserRepository extends BaseRepository<IUserDocument> implements IUserRepository {
  constructor() {
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
}
