
import { injectable } from "inversify";
import { BaseRepository } from "../baseRepository/baseRepository";
import { AdminModel } from "../../models/admin/adminModal";
import { IAdminDocument } from "../../models/admin/interfaces/adminInterface";
import {IAdminRepository} from "./interface/IAdminRepository";

@injectable()
export class AdminRepository extends BaseRepository<IAdminDocument> implements IAdminRepository {
  constructor() {
    super(AdminModel);
  }

  async getAdminId(adminId: string): Promise<IAdminDocument | null> {
    return await AdminModel.findOne({ adminId }).lean();
  }
  async findByEmail(email: string): Promise<IAdminDocument | null> {
    return await AdminModel.findOne({ email }).lean();
  }
}