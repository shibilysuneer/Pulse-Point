
import dotenv from 'dotenv';
dotenv.config(); 
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

type GenTokenPayload = {
  _id: string;
  role: string;
};
export const generateToken = ({_id, role}: GenTokenPayload )  => {
    return jwt.sign({ _id, role }, JWT_SECRET, {expiresIn: "1h"})
}
export const generateRefreshToken = ({_id, role}: GenTokenPayload )  => {
    return jwt.sign({ _id, role }, JWT_REFRESH_SECRET, {expiresIn: "7d"})
}