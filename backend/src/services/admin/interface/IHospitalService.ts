// src/services/admin/interfaces/IHospitalService.ts
import { IHospital } from "../../../models/hospital/interfaces/hospitalInterface";

export interface FetchHospitalParams {
  page: number;
  limit: number;
  search?: string;
}

export interface IHospitalService {
  fetchHospitals(params: FetchHospitalParams): Promise<{ hospitals: IHospital[]; total: number }>;
  toggleBlockStatus(hospitalId: string, isBlocked: boolean): Promise<IHospital>;
//   updateHospital(hospitalId: string, updates: Partial<IHospital>): Promise<IHospital>;
}
