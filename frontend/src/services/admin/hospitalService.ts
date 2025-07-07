import AdminAPI from "../../api/AdminAPI"; // Axios instance for admin requests
import type { PaginationPayload } from "../../types/commonTypes";
// import { Hospital, UpdateHospitalRequest } from "../../types/hospitalType";

// pendinghospital.ts
export const getPendingHospitals = async ({
  page,
  limit,
  search,
}: PaginationPayload) => {
  const response = await AdminAPI.get("/pending-hospitals",{
      params: { page, limit, search ,status},
    });
  return response.data;
};
// ✅ Fetch all hospitals (with optional pagination/search)
export const fetchHospitalsService = async ({
  page,
  limit,
  search,
  status,
}: PaginationPayload)=> {
  try {
    const response = await AdminAPI.get("/hospitals", {
      params: { page, limit, search ,status},
    });
    return response.data;
  } catch (error: any) {
    console.error("Fetch hospitals error:", error);
    throw error;
  }
};

// ✅ Toggle hospital block/unblock status
export const toggleHospitalBlockService = async (
  hospitalId: string,
  isBlocked: boolean
) => {
  try {
    const response = await AdminAPI.patch(`/hospitals/${hospitalId}/block`, {
      isBlocked
    });
    return response.data;
  } catch (error: any) {
    console.error("Toggle block status error:", error);
    throw error;
  }
};
export const getHospitalByIdService = async (id: string) => {
  const { data } = await AdminAPI.get(`/hospitals/${id}`);
  return data;
};
export const updateHospitalStatusService = async (hospitalId: string, newStatus: "approved" | "rejected") => {
  const response = await AdminAPI.patch(`/hospitals/${hospitalId}/status`, {
    status: newStatus
  });
  return response.data;
};
