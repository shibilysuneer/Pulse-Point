// src/repositories/user/interface/IDonorRepository.ts
import { IDonor } from "../../../models/user/interface/donorInterface";

export interface IDonorRepository {
  createDonorRequest(donorData: IDonor): Promise<IDonor>;
  getAllDonorRequests(): Promise<IDonor[]>;
  getSingleReqDonor(id: string): Promise<IDonor | null>;
  updateDonorStatus(id: string, status: string): Promise<IDonor | null>;
//   getApprovedDonors(): Promise<IDonor[]>;
// toggleDonorStatus(id: string, status: string): Promise<IDonor | null>;
  // updateBlockStatus(id: string, isBlocked: boolean): Promise<IDonor | null>;

}
