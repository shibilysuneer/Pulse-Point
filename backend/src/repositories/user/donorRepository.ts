// src/repositories/donorRepository.ts
import { injectable } from "inversify";
import Donor from "../../models/user/donorModel";
import { IDonor } from "../../models/user/interface/donorInterface";
import { IDonorRepository } from "./interface/IDonorRepository";

@injectable()
export class DonorRepository implements IDonorRepository {
  async createDonorRequest(donorData: IDonor): Promise<IDonor> {
    const donor = new Donor(donorData);
    return await donor.save();
  }

  async getAllDonorRequests(): Promise<IDonor[]> {
    return await Donor.find().sort({ createdAt: -1 });
  }

  async getDonorById(id: string): Promise<IDonor | null> {
    return await Donor.findById(id);
  }
}
