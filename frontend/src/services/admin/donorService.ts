import AdminAPI from "../../api/AdminAPI"


export const getAllDonors =async ()=>{
    const response = await AdminAPI.get("/donors")
    return response.data;
}