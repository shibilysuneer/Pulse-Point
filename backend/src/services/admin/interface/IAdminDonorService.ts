import { IDonor } from "../../../models/user/interface/donorInterface";
export interface FetchDonorParams {
  page: number;
  limit: number;
  search?: string;
}

export interface IAdminDonorService {
  getApprovedDonors(params: FetchDonorParams): Promise<{ donors: IDonor[]; total: number }>;
  toggleDonorBlock(id: string, isBlocked: boolean): Promise<IDonor | null>;
   getDonorById(id: string): Promise<IDonor | null>;
}
