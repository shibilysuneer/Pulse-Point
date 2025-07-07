import { configureStore } from "@reduxjs/toolkit";
import adminReducer, { refreshAccessToken } from './slices/admin/adminSlice'
import hospitalReducer from './slices/hospital/hospitalSlice'
import userReducer from './slices/user/userSlice'
import adminHospitalReducer from "./slices/admin/adminHospitalSlice"
import donorReducer from "./slices/user/donorSlice";
import adminDonorReducer from "./slices/admin/adminDonorSlice";
import reqDonorReducer from "./slices/hospital/reqDonorSlice"
import { setAdminRefreshTokenHandler } from "../api/AdminAPI";

 export const store =configureStore({
    reducer:{
        admin:adminReducer,
        hospital:hospitalReducer,
        user:userReducer,
        adminHospital:adminHospitalReducer,
        donor:donorReducer,
        adminDonor: adminDonorReducer,
        reqDonor:reqDonorReducer,
    }
})
setAdminRefreshTokenHandler(async () => {
  const result = await store.dispatch(refreshAccessToken());
  if (refreshAccessToken.fulfilled.match(result)) {
    return result.payload;
  }
  return null;
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
