import express from 'express';
import dotenv from 'dotenv';
import adminRoutes from "./routes/adminRoutes"
import connectDB from "./config/db"
dotenv.config();
connectDB();


const app =express()

app.listen(3000,()=>{
    console.log("server running port 3000...");
})
// app.get("/",(_req,res)=>{
//     res.json({
//         message:"API working"
//     })
// })
app.use("/api",adminRoutes)