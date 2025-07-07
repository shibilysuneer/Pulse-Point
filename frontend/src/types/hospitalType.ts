export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Hospital {
  _id: string;
  name: string;
  email: string;
  registrationNumber: string;
   phone?: string;
   licenseNumber?: string;
  website?: string;
  status?: string;
   address?: Address;
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

  phone?: string;
  licenseNumber?: string;
  website?: string;
  status?: string;
  address?: Address;
}
