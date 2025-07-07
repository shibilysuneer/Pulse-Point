import mongoose,{Schema}from 'mongoose'
import { IHospitalDocument } from './interfaces/hospitalInterface';
const AddressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  zipCode: String,
  latitude: Number,
  longitude: Number,
}, { _id: false }); 

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
    licenseNumber: { type: String },
    website: { type: String },

   address: AddressSchema,
    registrationNumber: {
    type: String,
    required: true, 
  },
   role: {
    type: String,
    enum: ["admin", "hospital",],
    default: "hospital",
    required: true
  },
   isBlocked: {
      type: Boolean,
      default: false,
    },
    status:{
      type:String,
      enum:['unregistered', 'pending', 'approved', 'rejected'],
      default:'unregistered'
    },
    
  
}, { timestamps: true });
hospitalSchema.index({ location: '2dsphere' });

const Hospital  = mongoose.model<IHospitalDocument>('Hospital', hospitalSchema);
export default Hospital;