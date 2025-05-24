import express from 'express';
import dotenv from 'dotenv';
import connectDB from "./config/db"
dotenv.config();
connectDB();


const app =express()

app.listen(3000,()=>{
    console.log("server running port 3000...");
})