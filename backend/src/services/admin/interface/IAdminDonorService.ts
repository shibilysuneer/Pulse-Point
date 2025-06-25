import { IDonor } from "../../../models/user/interface/donorInterface";

export interface IAdminDonorService {
  getApprovedDonors(): Promise<IDonor[]>;
  toggleDonorBlock(id: string, isBlocked: boolean): Promise<IDonor | null>;
   getDonorById(id: string): Promise<IDonor | null>;
}
