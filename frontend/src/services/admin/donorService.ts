import AdminAPI from "../../api/AdminAPI"


export const getAllDonors =async ()=>{
    const response = await AdminAPI.get("/donors")
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
