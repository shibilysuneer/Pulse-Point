import { injectable, inject } from "inversify";
import { IAdminDonorService } from "./interface/IAdminDonorService";
import { IDonor } from "../../models/user/interface/donorInterface";
import TYPES from "../../config/inversify/types";
import { IAdminDonorRepository  } from "../../repositories/admin/interface/IAdminDonorRepository";

@injectable()
export class AdminDonorService implements IAdminDonorService {
  constructor(
    @inject(TYPES.AdminDonorRepository)
    private donorRepo: IAdminDonorRepository 
  ) {}

  async getApprovedDonors(): Promise<IDonor[]> {
    return await this.donorRepo.getApprovedDonors();
  }

  async toggleDonorBlock(id: string, isBlocked: boolean): Promise<IDonor | null> {
    return await this.donorRepo.toggleIsBlocked(id, isBlocked);
  }
  async getDonorById(id: string): Promise<IDonor | null> {
    return await this.donorRepo.findById(id);
  }
}
