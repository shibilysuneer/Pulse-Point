import IBaseRepository from "../../baseRepository/interface/IBaseRepository";
import { IHospitalDocument } from "../../../models/hospital/interfaces/hospitalInterface";

export  interface IAdminRepository extends IBaseRepository<IHospitalDocument>{
  findByEmail(email:string):Promise<IHospitalDocument |null>;
  updateAdminPassword(email: string, hashedPassword: string): Promise<void>;
  
}
