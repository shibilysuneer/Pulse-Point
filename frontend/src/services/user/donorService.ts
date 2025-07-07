import UserAPI from "../../api/UserAPI";

export const submitDonorForm = async (formData: any) => {
  const response = await UserAPI.post("/donor-request", formData);
  console.log("res-request",response);
  
  return response.data;
};
export const fetchMyDonorRequestService = async () => {
  const token = localStorage.getItem("user_token");
  const response = await UserAPI.get("/donor-request",{
     headers: {
      Authorization: `Bearer ${token}`,
    },
  });
    console.log("res-request2",response);
  return response.data;
};

export const cancelDonorRequestService = async (id: string) => {
  await UserAPI.patch(`/donor-request/${id}`);
  return id;
};