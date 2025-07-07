
import { IDonor } from "../../../models/user/interface/donorInterface";

export interface IDonorRepository {
  createDonorRequest(donorData: IDonor): Promise<IDonor>;
  getAllDonorRequests(): Promise<IDonor[]>;
  getDonorById(id: string): Promise<IDonor | null>;
  updateDonorStatus(id: string, status: string): Promise<IDonor | null>;
  updateBlockStatus(id: string, isBlocked: boolean): Promise<IDonor | null>;
  getDonorRequestByUserId(userId: string): Promise<IDonor | null>;
  cancelDonorRequest(requestId: string, userId: string): Promise<void>;

}
