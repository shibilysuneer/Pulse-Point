import express from 'express';
import dotenv from 'dotenv';
import adminRoutes from "./routes/adminRoutes"
import hospitalRoutes from './routes/hospitalRoutes'
import userRoutes from './routes/userRoutes'
import connectDB from "./config/db"
import cors from 'cors'
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
dotenv.config();
connectDB();


const app =express()

app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))

app.use(cors({
    origin:'http://localhost:5173',
    credentials: true
}))

app.use("/api/admin",adminRoutes)
app.use("/api/hospital",hospitalRoutes)
app.use("/api/user",userRoutes)


app.listen(3000,()=>{
    console.log("server running port 3000...");
})
