import { injectable, inject } from "inversify";
import { FetchDonorParams, IAdminDonorService } from "./interface/IAdminDonorService";
import { IDonor } from "../../models/user/interface/donorInterface";
import TYPES from "../../config/inversify/types";
import { IAdminDonorRepository  } from "../../repositories/admin/interface/IAdminDonorRepository";

@injectable()
export class AdminDonorService implements IAdminDonorService {
  constructor(
    @inject(TYPES.AdminDonorRepository)
    private donorRepo: IAdminDonorRepository 
  ) {}

  async getApprovedDonors({ page, limit, search }:FetchDonorParams): Promise<{ donors: IDonor[]; total: number }> {
    return await this.donorRepo.getApprovedDonors({ page, limit, search });
  }

  async toggleDonorBlock(id: string, isBlocked: boolean): Promise<IDonor | null> {
    return await this.donorRepo.toggleIsBlocked(id, isBlocked);
  }
  async getDonorById(id: string): Promise<IDonor | null> {
    return await this.donorRepo.findById(id);
  }
}
