
import { injectable } from "inversify";
import { BaseRepository } from "../baseRepository/baseRepository";
import {IAdminRepository} from "./interface/IAdminRepository";
import { IHospitalDocument } from "../../models/hospital/interfaces/hospitalInterface";
import Hospital from "../../models/hospital/hospitalModel";

@injectable()
export class AdminRepository extends BaseRepository<IHospitalDocument> implements IAdminRepository {
  constructor() {
    super(Hospital);
  }

  async getAdminId(adminId: string): Promise<IHospitalDocument | null> {
    return await Hospital.findOne({ adminId }).lean();
  }
  async findByEmail(email: string): Promise<IHospitalDocument | null> {
    return await Hospital.findOne({  email }).lean();
  }
}