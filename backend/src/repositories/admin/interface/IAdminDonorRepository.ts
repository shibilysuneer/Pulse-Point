import { IDonor } from "../../../models/user/interface/donorInterface";

export interface IAdminDonorRepository {
  getApprovedDonors(): Promise<IDonor[]>;
  toggleIsBlocked(id: string, isBlocked: boolean): Promise<IDonor | null>;
findById(id: string): Promise<IDonor | null>;  
}
