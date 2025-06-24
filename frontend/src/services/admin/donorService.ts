import AdminAPI from "../../api/AdminAPI"


export const getAllDonors =async ()=>{
    const response = await AdminAPI.get("/donors")
    return response.data;
}

export const toggleDonorsStatus = async (id: string, status: string) => {
  const response = await AdminAPI.patch(`/donors/${id}/status`, { status });
  return response.data;
};