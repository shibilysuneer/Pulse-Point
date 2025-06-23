export interface DonorFormData {
  username: string;
  age: string;
  bloodGroup: string;
  gender: string;
  location: string;
  phone: string;
  address: string;
  donatedBefore: "yes" | "no";
  lastDonatedDate?: string; 
  height: string;
  weight: string;
  regularMedicine: boolean;
  tattoo: boolean;
  minorSurgery: boolean;
  majorSurgery: boolean;
  dentalExtraction: boolean;
  repeatedDiarrhoea: boolean;
}
