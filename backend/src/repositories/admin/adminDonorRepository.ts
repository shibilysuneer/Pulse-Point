import { injectable } from "inversify";
import DonorRequester from "../../models/user/donorModel";
import { IDonor } from "../../models/user/interface/donorInterface";
import { IAdminDonorRepository  } from "./interface/IAdminDonorRepository"
import { FetchDonorParams } from "../../services/admin/interface/IAdminDonorService";

@injectable()
export class AdminDonorRepository implements IAdminDonorRepository  {
  // Get only donors with approved status
  // async getApprovedDonors(): Promise<IDonor[]> {
  //   return await DonorRequester.find({ status: "approved" }).sort({ createdAt: -1 });
  // }
async getApprovedDonors({ page, limit, search }:FetchDonorParams): Promise<{ donors: IDonor[]; total: number }> {
  const filter: any = { status: "approved" };

 if (search) {
    filter.$or = [
      { username: { $regex: search, $options: "i" } },
      { bloodGroup: search }
    ];
  }

  const total = await DonorRequester.countDocuments(filter);

  const donors = await DonorRequester.find(filter)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  return { donors, total };
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
