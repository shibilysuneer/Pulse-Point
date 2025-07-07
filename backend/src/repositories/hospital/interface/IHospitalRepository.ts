import { IHospital, IHospitalDocument } from "../../../models/hospital/interfaces/hospitalInterface";
import { FetchHospitalParams } from "../../../services/admin/interface/IHospitalService";

export interface IHospitalRepository{
    findByEmail(email:string):Promise<IHospitalDocument | null>;
    create(data: IHospital): Promise<IHospitalDocument>; 
    updatePassword(email: string, newPassword: string): Promise<void>;

     findHospitals(filter: any, page: number, limit: number): Promise<IHospital[]>;
     countHospitals(filter: any): Promise<number>;

    //  findByIdAndUpdate(id: string, update: Partial<IHospital>): Promise<IHospital | null>;
     findByIdAndUpdate(id: string, update: Partial<IHospital>): Promise<IHospital | null>;

     updateRegistrationDetails(
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
): Promise<IHospitalDocument | null>;


getPendingHospitals(params: FetchHospitalParams): Promise<{ hospitals: IHospital[]; total: number }>;
findById(id: string): Promise<IHospital | null>;
updateStatus(id: string, status: "approved" | "rejected"): Promise<IHospital | null>;

}