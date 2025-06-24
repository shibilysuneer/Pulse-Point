
import { IDonor } from "../../../models/user/interface/donorInterface";

export interface IDonorService {
  createDonorRequest(donorData: IDonor): Promise<IDonor>;
   getAllRequests(): Promise<IDonor[]>;
  updateDonorStatus(id: string, status: string): Promise<IDonor | null>;
}
