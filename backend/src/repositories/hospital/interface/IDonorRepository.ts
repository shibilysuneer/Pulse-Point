// src/repositories/user/interface/IDonorRepository.ts
import { IDonor } from "../../../models/user/interface/donorInterface";

export interface IDonorRepository {
  createDonorRequest(donorData: IDonor): Promise<IDonor>;
  getAllDonorRequests(): Promise<IDonor[]>;
  getDonorById(id: string): Promise<IDonor | null>;
  updateDonorStatus(id: string, status: string): Promise<IDonor | null>;
}
