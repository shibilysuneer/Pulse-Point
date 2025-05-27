import IBaseRepository from "../../baseRepository/interface/IBaseRepository";
import { IAdminDocument } from "../../../models/admin/interfaces/adminInterface";
// import { BaseRepository } from "../../baseRepository/baseRepository";

export  interface IAdminRepository extends IBaseRepository<IAdminDocument>{
  findByEmail(email:string):Promise<IAdminDocument |null>;
}
