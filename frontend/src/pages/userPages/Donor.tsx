import React, { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { createDonorRequest } from "../../redux/slices/user/donorSlice";
import { toast } from "react-toastify";
import type { DonorFormData } from "../../types/donorType";
import { useNavigate } from "react-router-dom";

const DonorRequestForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const [formData, setFormData] = useState<DonorFormData>({
    username: "",
    age: "",
    bloodGroup: "",
    gender: "",
    location: "",
    phone: "",
    address: "",
    donatedBefore: "no",
    lastDonatedDate: "",
    height: "",
    weight: "",
    regularMedicine: false,
    tattoo: false,
    minorSurgery: false,
    majorSurgery: false,
    dentalExtraction: false,
    repeatedDiarrhoea: false,
  });

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const dataToSubmit = { ...formData };
    if (formData.donatedBefore === "no") {
      delete dataToSubmit.lastDonatedDate;
    }

    const action = await dispatch(createDonorRequest(dataToSubmit));
    if (createDonorRequest.fulfilled.match(action)) {
      toast.success("Donor request submitted successfully!");
      navigate("/user/home")
    }
    //  else {
    //   throw new Error(action.payload || "Submission failed");
    // }
  } catch (err: any) {
    toast.error(err.message || "Something went wrong");
  }
};

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-bold text-red-600 text-center mb-4">Donor Personal Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Personal Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="username" placeholder="Name" className=" input" 
          value={formData.username} onChange={handleChange}  />
          <input name="age" placeholder="Age" className="input" 
          value={formData.age} onChange={handleChange}  />
          <input name="bloodGroup" placeholder="Blood Group" className="input" value={formData.bloodGroup} onChange={handleChange}  />
          <select name="gender" className="input" value={formData.gender} onChange={handleChange} required>
            <option value="" disabled>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <input name="location" placeholder="Location" className="input" value={formData.location} onChange={handleChange}  />
          <input name="phone" placeholder="Phone" className="input" value={formData.phone} onChange={handleChange}  />
          <textarea name="address" placeholder="Address" className="input col-span-2" value={formData.address} onChange={handleChange}  />
        </div>

        {/* Medical Conditions */}
        <h2 className="text-xl font-bold mt-6 text-center text-gray-700">Medical Condition</h2>
        <div>
          <label className="block mb-2">Have you donated blood previously?</label>
          <div className="flex gap-4">
            <label><input type="radio" name="donatedBefore" value="yes" checked={formData.donatedBefore === "yes"} onChange={handleChange} /> Yes</label>
            <label><input type="radio" name="donatedBefore" value="no" checked={formData.donatedBefore === "no"} onChange={handleChange} /> No</label>
          </div>
          {formData.donatedBefore === "yes" && (
            <input type="date" name="lastDonatedDate" className="input mt-2" value={formData.lastDonatedDate} onChange={handleChange} />
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <input name="height" placeholder="Height (cm)" className="input" value={formData.height} onChange={handleChange}  />
          <input name="weight" placeholder="Weight (kg)" className="input" value={formData.weight} onChange={handleChange}  />
        </div>

        {/* Checkboxes */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
          <label><input type="checkbox" name="regularMedicine" checked={formData.regularMedicine} onChange={handleChange} /> Regular Medicine</label>
          <label><input type="checkbox" name="tattoo" checked={formData.tattoo} onChange={handleChange} /> Tattoo / Piercing</label>
          <label><input type="checkbox" name="minorSurgery" checked={formData.minorSurgery} onChange={handleChange} /> Minor Surgery</label>
          <label><input type="checkbox" name="majorSurgery" checked={formData.majorSurgery} onChange={handleChange} /> Major Surgery</label>
          <label><input type="checkbox" name="dentalExtraction" checked={formData.dentalExtraction} onChange={handleChange} /> Dental Extraction</label>
          <label><input type="checkbox" name="repeatedDiarrhoea" checked={formData.repeatedDiarrhoea} onChange={handleChange} /> Repeated Diarrhoea</label>
        </div>

        <div className="text-center mt-6">
          <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default DonorRequestForm;
