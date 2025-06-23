import { IHospital, IHospitalDocument } from "../../../models/hospital/interfaces/hospitalInterface";

export interface IHospitalRepository{
    findByEmail(email:string):Promise<IHospitalDocument | null>;
    create(data: IHospital): Promise<IHospitalDocument>; 
    updatePassword(email: string, newPassword: string): Promise<void>;

     findHospitals(filter: any, page: number, limit: number): Promise<IHospital[]>;
     countHospitals(filter: any): Promise<number>;

    //  findByIdAndUpdate(id: string, update: Partial<IHospital>): Promise<IHospital | null>;
     findByIdAndUpdate(id: string, update: Partial<IHospital>): Promise<IHospital | null>;
}