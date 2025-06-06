import { injectable } from "inversify";
import Hospital from '../../models/hospital/hospitalModel'
import {  IHospital, IHospitalDocument } from "../../models/hospital/interfaces/hospitalInterface";
import { BaseRepository } from "../baseRepository/baseRepository";

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
}