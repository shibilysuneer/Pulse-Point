import AdminAPI from "../../api/AdminAPI"
import type { PaginationPayload } from "../../types/commonTypes";


export const getAllDonors =async ({page,limit,search}:PaginationPayload)=>{
    const response = await AdminAPI.get("/donors",{  params: { page, limit,search },})
    return response.data;
}

export const toggleDonorBlockService = async (donorId: string, isBlocked: boolean) => {
  const response = await AdminAPI.patch(`/donors/${donorId}/block`, { isBlocked  });
  return response.data;
};
export const getDonorById = async (id: string) => {
  const response = await AdminAPI.get(`/donors/${id}`);
  return response.data;
};
