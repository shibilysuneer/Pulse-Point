import  { model, Schema } from 'mongoose';
import { IUserDocument } from './interface/userInterface';

const userSchema = new Schema<IUserDocument>(
  {
    username: {
      type: String,
      required: true,
      
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'user',
    },
    isGoogleAuth: {
     type: Boolean,
     default: false 
    },
  },
  { timestamps: true }
);

const User = model<IUserDocument>("User", userSchema);

export default User;