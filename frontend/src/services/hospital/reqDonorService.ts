// src/services/hospital/donorService.ts
import HospitalAPI from "../../api/HospitalAPI";

export const getDonorRequests = async () => {
  const response = await HospitalAPI.get("/donor-requests");
  return response.data;
};
export const getDonorById = async (id: string) => {
  const response = await HospitalAPI.get(`/donor/${id}`);
  return response.data;
};
export const updateDonorStatus = async (id: string, status: string) => {
  const response = await HospitalAPI.patch(`/donor-request/${id}/status`, {
    status,
  });
   return response.data;
};