// src/services/donorService.ts
import { injectable,inject } from "inversify";
import TYPES from "../../config/inversify/types";
import { IDonorService } from "./interface/IDonorService";
import { IDonor } from "../../models/user/interface/donorInterface";
import { IDonorRepository } from "../../repositories/user/interface/IDonorRepository";

@injectable()
export class DonorService implements IDonorService {
  constructor(
    @inject(TYPES.UserDonorRepository) private donorRepo: IDonorRepository
  ) {}

  async createDonorRequest(donorData: IDonor): Promise<IDonor> {
    return await this.donorRepo.createDonorRequest(donorData);
  }

  async getAllRequests(): Promise<IDonor[]> {
    return await this.donorRepo.getAllDonorRequests();
  }

  async updateDonorStatus(id: string, status: string): Promise<IDonor | null> {
    return await this.donorRepo.updateDonorStatus(id, status);
  }
    async getSingleReqDonor(id: string): Promise<IDonor | null> { 
    return await this.donorRepo.getDonorById(id);
  }
  async hosToggleBlockStatus(id: string, isBlocked: boolean): Promise<IDonor | null> {
      return await this.donorRepo.updateBlockStatus(id, isBlocked);
  }
}
