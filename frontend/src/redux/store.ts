import { configureStore } from "@reduxjs/toolkit";
import adminReducer from './slices/admin/adminSlice'
import hospitalReducer from './slices/hospital/hospitalSlice'
import userReducer from './slices/user/userSlice'
import adminHospitalReducer from "./slices/admin/adminHospitalSlice"
import donorReducer from "./slices/user/donorSlice";

 export const store =configureStore({
    reducer:{
        admin:adminReducer,
        hospital:hospitalReducer,
        user:userReducer,
        adminHospital:adminHospitalReducer,
        Donor:donorReducer,
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
