import { IDonor } from "../../../models/user/interface/donorInterface";
import { FetchDonorParams } from "../../../services/admin/interface/IAdminDonorService";

export interface IAdminDonorRepository {
  // getApprovedDonors(): Promise<IDonor[]>;
    getApprovedDonors(params: FetchDonorParams): Promise<{ donors: IDonor[]; total: number }>;
  toggleIsBlocked(id: string, isBlocked: boolean): Promise<IDonor | null>;
findById(id: string): Promise<IDonor | null>;  
}
