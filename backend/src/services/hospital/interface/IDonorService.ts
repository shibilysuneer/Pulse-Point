// src/services/user/interface/IDonorService.ts
import { IDonor } from "../../../models/user/interface/donorInterface";

export interface IDonorService {
  createDonorRequest(donorData: IDonor): Promise<IDonor>;
  getAllRequests(): Promise<IDonor[]>;
  updateDonorStatus(id: string, status: string): Promise<IDonor | null>;
    // getApprovedDonors(): Promise<IDonor[]>;
//   toggleDonorStatus(id: string, status: string): Promise<IDonor | null>;
  // hosToggleBlockStatus(id: string, isBlocked: boolean): Promise<IDonor | null>;

}
