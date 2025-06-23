export interface Hospital {
  _id: string;
  name: string;
  email: string;
  registrationNumber: string;
  isBlocked: boolean;
  createdAt?: string;
  updatedAt?: string;
}
export interface UpdateHospitalRequest {
  _id: string;
  name?: string;
  email?: string;
  registrationNumber?: string;
  isBlocked?: boolean;
}
// export interface CreateHospitalRequest {
//   name: string;
//   email: string;
//   password: string;
//   registrationNumber: string;
// }