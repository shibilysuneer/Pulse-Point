import { injectable } from "inversify";
import DonorRequester from "../../models/user/donorModel";
import { IDonor } from "../../models/user/interface/donorInterface";
import { IAdminDonorRepository  } from "./interface/IAdminDonorRepository"

@injectable()
export class AdminDonorRepository implements IAdminDonorRepository  {
  // Get only donors with approved status
  async getApprovedDonors(): Promise<IDonor[]> {
    return await DonorRequester.find({ status: "approved" }).sort({ createdAt: -1 });
  }

  // Toggle donor active/blocked status (extend schema to support if needed)
  async toggleIsBlocked(id: string, isBlocked: boolean): Promise<IDonor | null> {
    return await DonorRequester.findByIdAndUpdate(
      id,
      { isBlocked  },
      { new: true }
    );
  }
   async findById(id: string): Promise<IDonor | null> {
    return await DonorRequester.findById(id); // ✅ Implementation for service
  }
}
