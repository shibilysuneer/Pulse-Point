
import { Document } from "mongoose";
export interface IDonor {
  username: string;
  age: string;
  bloodGroup: string;
  gender: string;
  location: string;
  phone: string;
  address: string;
  donatedBefore: "yes" | "no";
  lastDonatedDate?: string| null;
  height: string;
  weight: string;
  regularMedicine: boolean;
  tattoo: boolean;
  minorSurgery: boolean;
  majorSurgery: boolean;
  dentalExtraction: boolean;
  repeatedDiarrhoea: boolean;
  status: 'pending' | 'approved' | 'rejected';
 isBlocked:Boolean;
}
export interface IDonorDocument extends IDonor, Document {}