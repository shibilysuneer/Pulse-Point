import { configureStore } from "@reduxjs/toolkit";
import adminReducer from './slices/admin/adminSlice'
import hospitalReducer from './slices/hospital/hospitalSlice'

 export const store =configureStore({
    reducer:{
        admin:adminReducer,
        hospital:hospitalReducer,
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
