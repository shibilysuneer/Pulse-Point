

export interface DonorFormData {
  _id?: string;
  username: string;
  age: string;
  bloodGroup: string;
  gender: string;
  location: string;
  phone: string;
  address: string;
  donatedBefore: "yes" | "no";
  lastDonatedDate?: string | null;
  height: string;
  weight: string;
  regularMedicine: boolean;
  tattoo: boolean;
  minorSurgery: boolean;
  majorSurgery: boolean;
  dentalExtraction: boolean;
  repeatedDiarrhoea: boolean;
  createdAt?: string;
  updatedAt?: string;
}
