
import { IDonor } from "../../../models/user/interface/donorInterface";

export interface IDonorService {
  createDonorRequest(donorData: IDonor): Promise<IDonor>;
}
