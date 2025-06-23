import UserAPI from "../../api/UserAPI";

export const submitDonorForm = async (formData: any) => {
  const response = await UserAPI.post("/donor/request", formData);
  return response.data;
};
