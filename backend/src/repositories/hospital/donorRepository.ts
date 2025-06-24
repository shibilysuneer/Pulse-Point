// src/repositories/user/donorRepository.ts
import { injectable } from "inversify";
// import Donor from "../../models/user/donorModel";
import { IDonor } from "../../models/user/interface/donorInterface";
import { IDonorRepository } from "./interface/IDonorRepository";
import DonorRequester from "../../models/user/donorModel";

@injectable()
export class DonorRepository implements IDonorRepository {
  async createDonorRequest(donorData: IDonor): Promise<IDonor> {
    const donor = new DonorRequester(donorData);
    return await donor.save();
  }

  async getAllDonorRequests(): Promise<IDonor[]> {
    return await DonorRequester.find().sort({ createdAt: -1 });
  }

  async getDonorById(id: string): Promise<IDonor | null> {
    return await DonorRequester.findById(id);
  }

  async updateDonorStatus(id: string, status: string): Promise<IDonor | null> {
    return await DonorRequester.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
  }
}
