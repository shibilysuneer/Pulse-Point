import { configureStore } from "@reduxjs/toolkit";
import adminReducer from './slices/admin/adminSlice'
import hospitalReducer from './slices/hospital/hospitalSlice'
import userReducer from './slices/user/userSlice'
import adminHospitalReducer from "./slices/admin/adminHospitalSlice"
import donorReducer from "./slices/user/donorSlice";
import adminDonorReducer from "./slices/admin/adminDonorSlice";
import reqDonorReducer from "./slices/hospital/reqDonorSlice"

 export const store =configureStore({
    reducer:{
        admin:adminReducer,
        hospital:hospitalReducer,
        user:userReducer,
        adminHospital:adminHospitalReducer,
        Donor:donorReducer,
        adminDonor: adminDonorReducer,
        reqDonor:reqDonorReducer,
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
