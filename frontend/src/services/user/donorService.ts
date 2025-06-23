import UserAPI from "../../api/UserAPI";

export const submitDonorForm = async (formData: any) => {
  const response = await UserAPI.post("/donor-request", formData);
  console.log("res-request",response);
  
  return response.data;
};
