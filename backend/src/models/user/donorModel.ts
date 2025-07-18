// src/models/donorModel.ts
import mongoose from "mongoose";

const donorRequesterSchema  = new mongoose.Schema({
   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  username: { type: String, required: true },
  age: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  gender: { type: String, required: true },
  location: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  donatedBefore: { type: String, enum: ["yes", "no"], required: true },
  lastDonatedDate: { type: String, required: false,
  default: null },
  height: { type: String, required: true },
  weight: { type: String, required: true },
  regularMedicine: { type: Boolean, required: true },
  tattoo: { type: Boolean, required: true },
  minorSurgery: { type: Boolean, required: true },
  majorSurgery: { type: Boolean, required: true },
  dentalExtraction: { type: Boolean, required: true },
  repeatedDiarrhoea: { type: Boolean, required: true },

  status: {
    type: String,
    enum: ["pending", "approved", "rejected","cancelled"],
    default: "pending"
  },isBlocked: {
  type: Boolean,
  default: false,
}
}, {
  timestamps: true,
});

const DonorRequester  = mongoose.model("DonorRequester", donorRequesterSchema);
export default DonorRequester;
