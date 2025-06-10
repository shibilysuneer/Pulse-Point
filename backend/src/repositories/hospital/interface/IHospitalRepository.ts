import { IHospital, IHospitalDocument } from "../../../models/hospital/interfaces/hospitalInterface";

export interface IHospitalRepository{
    findByEmail(email:string):Promise<IHospitalDocument | null>;
    create(data: IHospital): Promise<IHospitalDocument>; 
    updatePassword(email: string, newPassword: string): Promise<void>;

}