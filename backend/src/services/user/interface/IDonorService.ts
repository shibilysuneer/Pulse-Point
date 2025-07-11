
import { IDonor } from "../../../models/user/interface/donorInterface";

export interface IDonorService {
  createDonorRequest(donorData: IDonor): Promise<IDonor>;
   getAllRequests(): Promise<IDonor[]>;
  updateDonorStatus(id: string, status: string): Promise<IDonor | null>;
  getSingleReqDonor(id: string): Promise<IDonor | null>;
  hosToggleBlockStatus(id: string, isBlocked: boolean): Promise<IDonor | null>;
  getMyDonorRequest(userId: string): Promise<IDonor | null>;
  cancelDonorRequest(requestId: string, userId: string): Promise<void>;

}
