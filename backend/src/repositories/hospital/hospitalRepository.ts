import { injectable } from "inversify";
import Hospital from '../../models/hospital/hospitalModel'
import {  IHospital, IHospitalDocument } from "../../models/hospital/interfaces/hospitalInterface";
import { BaseRepository } from "../baseRepository/baseRepository";
import { FetchHospitalParams } from "../../services/admin/interface/IHospitalService";

@injectable()
export class HospitalRepository extends BaseRepository<IHospitalDocument>{
    constructor(){
        super(Hospital)
    }
    async findByEmail(email: string):Promise<IHospitalDocument | null>{
        return this.model.findOne({email})
    }
     async create(data: IHospital): Promise<IHospitalDocument> {
    const hospital = new Hospital(data);
    return await hospital.save();
  }
  async updatePassword(email: string, hashedPassword: string): Promise<void> {
    const hospital = await this.model.findOne({ email });
    if (!hospital) {
        throw new Error("Hospital not found");
    }
    hospital.password = hashedPassword;
    await hospital.save();
}
 async findHospitals(filter: any, page: number, limit: number): Promise<IHospital[]> {
    return await Hospital.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();
  }

  async countHospitals(filter: any): Promise<number> {
    return await Hospital.countDocuments(filter);
  }

  async findByIdAndUpdate(id: string, update: Partial<IHospital>): Promise<IHospital | null> {
    return await Hospital.findByIdAndUpdate(id, update, { new: true });
  }


  async updateRegistrationDetails(
  hospitalId: string,
  data: {
    licenseNumber: string;
    website?: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
    status?: string;
  }
): Promise<IHospitalDocument | null> {
  return await this.model.findByIdAndUpdate(
    hospitalId,
    {
      licenseNumber: data.licenseNumber,
      website: data.website,
      address: data.address,
      status: data.status ?? 'pending'
    },
    { new: true }
  );
}

  async getPendingHospitals({ page, limit, search }: FetchHospitalParams): Promise<{ hospitals: IHospital[]; total: number }> {
    // return Hospital.find({ status: { $ne: "unregistered" }}).sort({ createdAt: -1 });
    const filter: any = {
    status: { $ne: "unregistered" },
  };
  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }
   const total = await Hospital.countDocuments(filter);

  const hospitals = await Hospital.find(filter)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  return { hospitals, total };
  }

  
  async findById(id: string): Promise<IHospital | null> {
    return Hospital.findById(id).lean();
  }
  async updateStatus(id: string, status: "approved" | "rejected"): Promise<IHospital | null> {
  return this.findByIdAndUpdate(id, { status });
}

}