// src/services/admin/HospitalService.ts
import { inject, injectable } from "inversify";
import { IHospital } from "../../models/hospital/interfaces/hospitalInterface";
import { IHospitalRepository } from "../../repositories/hospital/interface/IHospitalRepository";
import { FetchHospitalParams, IHospitalService } from "./interface/IHospitalService";
import TYPES from "../../config/inversify/types";

@injectable()
export class HospitalService implements IHospitalService {
  constructor(
    @inject(TYPES.HospitalRepository) private hospitalRepository: IHospitalRepository
  ) {}

  async fetchHospitals({ page, limit, search }: FetchHospitalParams): Promise<{ hospitals: IHospital[]; total: number }> {
    const filter: any = {};
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    const hospitals = await this.hospitalRepository.findHospitals(filter, page, limit);
    const total = await this.hospitalRepository.countHospitals(filter);
    return { hospitals, total };
  }

  async toggleBlockStatus(hospitalId: string, isBlocked: boolean): Promise<IHospital> {
      console.log(`Service: toggling hospital ${hospitalId} to isBlocked=${isBlocked}`);

    const updated = await this.hospitalRepository.findByIdAndUpdate(hospitalId, { isBlocked });
    if (!updated) throw new Error("Hospital not found");
    return updated;
  }

//   async updateHospital(hospitalId: string, updates: Partial<IHospital>): Promise<IHospital> {
//     const updated = await this.hospitalRepository.findByIdAndUpdate(hospitalId, updates);
//     if (!updated) throw new Error("Hospital not found");
//     return updated;
//   }
}
