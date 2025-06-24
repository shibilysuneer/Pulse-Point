// src/services/hospital/donorService.ts
import HospitalAPI from "../../api/HospitalAPI";

export const getDonorRequests = async () => {
  const response = await HospitalAPI.get("/donor-requests");
  return response.data;
};
