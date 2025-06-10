import mongoose,{Schema}from 'mongoose'
import { IHospitalDocument } from './interfaces/hospitalInterface';

export const hospitalSchema:Schema<IHospitalDocument> = new Schema({
  name: 
  { type: String, required: true },
  email:
   { type: String,
     required: true,
       },
  password: 
  {  type: String,
    required: function () {
      return !this.isGoogleAuth;
    }, },
  isGoogleAuth: 
  { type: Boolean,
     default: false }, 
    phone: 
    { type: String },
     googleId: { type: String },
   address: { type: String },
}, { timestamps: true });

const Hospital  = mongoose.model<IHospitalDocument>('Hospital', hospitalSchema);
export default Hospital;