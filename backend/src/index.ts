import express from 'express';
import dotenv from 'dotenv';
import adminRoutes from "./routes/adminRoutes"
import connectDB from "./config/db"
import cors from 'cors'
dotenv.config();
connectDB();


const app =express()

app.use(cors({
    origin:'http://localhost:5173',
    credentials: true
}))

app.use("/api/admin",adminRoutes)

app.listen(3000,()=>{
    console.log("server running port 3000...");
})
// app.get("/",(_req,res)=>{
//     res.json({
//         message:"API working"
//     })
// })
