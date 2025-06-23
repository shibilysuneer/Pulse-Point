// src/services/donorService.ts
import { injectable,inject } from "inversify";
import TYPES from "../../config/inversify/types";
import { IDonorService } from "./interface/IDonorService";
import { IDonor } from "../../models/user/interface/donorInterface";
import { IDonorRepository } from "../../repositories/user/interface/IDonorRepository";

@injectable()
export class DonorService implements IDonorService {
  constructor(
    @inject(TYPES.DonorRepository) private donorRepo: IDonorRepository
  ) {}

  async createDonorRequest(donorData: IDonor): Promise<IDonor> {
    return await this.donorRepo.createDonorRequest(donorData);
  }
}
