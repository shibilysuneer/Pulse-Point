import mongoose,{Schema}from 'mongoose'
import { IHospitalDocument } from './interfaces/hospitalInterface';

export const hospitalSchema:Schema<IHospitalDocument> = new Schema({
  name: 
  { type: String, required: true },
  email:
   { type: String,
     required: true,
      unique: true },
  password: 
  { type: String,
     required: true },
  isGoogleAuth: 
  { type: Boolean,
     default: false }, 
    phone: 
    { type: String },
   address: { type: String },
}, { timestamps: true });

const Hospital  = mongoose.model<IHospitalDocument>('Hospital', hospitalSchema);
export default Hospital;