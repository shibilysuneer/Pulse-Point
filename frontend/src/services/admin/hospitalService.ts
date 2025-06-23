import AdminAPI from "../../api/AdminAPI"; // Axios instance for admin requests
import type { PaginationPayload } from "../../types/commonTypes";
// import { Hospital, UpdateHospitalRequest } from "../../types/hospitalType";

// ✅ Fetch all hospitals (with optional pagination/search)
export const fetchHospitalsService = async ({
  page,
  limit,
  search,
}: PaginationPayload)=> {
  try {
    const response = await AdminAPI.get("/hospitals", {
      params: { page, limit, search },
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
      block: !isBlocked,
    });
    return response.data;
  } catch (error: any) {
    console.error("Toggle block status error:", error);
    throw error;
  }
};

// ✅ Update hospital information
// export const updateHospitalService = async (
//   hospital: UpdateHospitalRequest
// ): Promise<Hospital> => {
//   try {
//     const response = await AdminAPI.put(`/hospitals/${hospital._id}`, hospital);
//     return response.data;
//   } catch (error: any) {
//     console.error("Update hospital error:", error);
//     throw error;
//   }
// };
