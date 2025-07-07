// src/services/admin/interfaces/IHospitalService.ts
import { IHospital } from "../../../models/hospital/interfaces/hospitalInterface";

export interface FetchHospitalParams {
  page: number;
  limit: number;
  search?: string;
   status?: string;
}

export interface IHospitalService {
  fetchHospitals(params: FetchHospitalParams): Promise<{ hospitals: IHospital[]; total: number }>;
  toggleBlockStatus(hospitalId: string, isBlocked: boolean): Promise<IHospital>;
  getPendingHospitals(params: FetchHospitalParams): Promise<{ hospitals: IHospital[]; total: number }>;
  getHospitalById(id: string): Promise<IHospital>;
  updateStatus(id: string, status: "approved" | "rejected"): Promise<IHospital>;

 }
