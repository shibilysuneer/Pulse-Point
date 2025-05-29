import jwt from "jsonwebtoken"

// const JWT_SECRET = process.env.JWT_SECRET

export const generateToken =(payload:any)=>{
    const secret =process.env.JWT_SECRET;
    if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
    return jwt.sign(payload,secret,{expiresIn:'1d' })
}