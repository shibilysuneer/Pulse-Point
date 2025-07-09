// import React, { useEffect, useState } from "react";
// import { useAppDispatch } from "../../redux/hooks";
// import { createDonorRequest } from "../../redux/slices/user/donorSlice";
// import { toast } from "react-toastify";
// import type { DonorFormData } from "../../types/donorTypes";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import type { RootState } from "../../redux/store";
// import { fetchMyDonorRequest,cancelDonorRequest,clearDonorRequest  } from "../../redux/slices/user/donorSlice";

// const isLessThan3Months = (lastDate: string): boolean => {
//   const lastDonated = new Date(lastDate);
//   const today = new Date();
//   const threeMonthsAgo = new Date();
//   threeMonthsAgo.setMonth(today.getMonth() - 3);
//   return lastDonated > threeMonthsAgo;
// };

// const DonorRequestForm = () => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate()

// const { loading,request  } = useSelector((state: RootState) => state.donor);

// useEffect(() => {
//   dispatch(fetchMyDonorRequest());
// }, [dispatch]);

//   const [dateError, setDateError] = useState("");
//   const [formData, setFormData] = useState<DonorFormData>({
//     username: "",
//     age: "",
//     bloodGroup: "",
//     gender: "",
//     location: "",
//     phone: "",
//     address: "",
//     donatedBefore: "no",
//     lastDonatedDate: "",
//     height: "",
//     weight: "",
//     regularMedicine: false,
//     tattoo: false,
//     minorSurgery: false,
//     majorSurgery: false,
//     dentalExtraction: false,
//     repeatedDiarrhoea: false,
//   });

//   const handleChange = (e: React.ChangeEvent<any>) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//  const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//    if (
//     formData.donatedBefore === "yes" &&
//     formData.lastDonatedDate &&
//     isLessThan3Months(formData.lastDonatedDate)
//   ) {
//     setDateError("You must wait at least 3 months after your last donation.");
//     return;
//   }

//   setDateError(""); 
//   try {
//     const dataToSubmit = { ...formData };
//     if (formData.donatedBefore === "no") {
//       delete dataToSubmit.lastDonatedDate;
//     }

//     const action = await dispatch(createDonorRequest(dataToSubmit));
//     if (createDonorRequest.fulfilled.match(action)) {
//       toast.success("Donor request submitted successfully!");
//       navigate("/user/home")
//     }
//     //  else {
//     //   throw new Error(action.payload || "Submission failed");
//     // }
//   } catch (err: any) {
//     toast.error(err.message || "Something went wrong");
//   }
// };
// if (loading) {
//   return <div className="text-center mt-10">Loading...</div>;
// }
// if (request && request.status === "approved") {
//     return (
//       <div className="max-w-xl mx-auto p-6 bg-green-50 rounded shadow mt-8 text-center">
//         <h2 className="text-2xl font-bold text-green-700">✅ You're already an approved donor!</h2>
//         <p className="mt-4 text-gray-700">
//           Thank you for registering as a donor.
//         </p>
//         <button
//           onClick={() => navigate('/user/home')}
//           className="mt-6 bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
//         >
//           Go to Home
//         </button>
//       </div>
//     );
//   }
//   if (request && request.status === "pending") {
//      const handleCancel = async () => {
//     try {
//        if (!request || !request._id) {
//       toast.error("Unable to cancel. Donor request ID not found.");
//       return;
//     }
//       await dispatch(cancelDonorRequest(request._id));
//       toast.success("Your donor request has been cancelled.");
//       dispatch(fetchMyDonorRequest()); // refresh state
//     } catch (error: any) {
//       toast.error(error.message || "Failed to cancel request");
//     }
//   };
//   return (
//     <div className="max-w-xl mx-auto p-6 bg-yellow-50 rounded shadow mt-8 text-center">
//       <h2 className="text-2xl font-bold text-yellow-700">⏳ Your request is pending approval</h2>
//       <p className="mt-4 text-gray-700">
//         Thank you for registering. Please wait while our team reviews your request.
//       </p>
//       <div className="mt-6 flex justify-center gap-4">
//         <button
//           onClick={() => navigate('/user/home')}
//           className="bg-yellow-600 text-white px-5 py-2 rounded hover:bg-yellow-700"
//         >
//           Go to Home
//         </button>
//         <button
//           onClick={handleCancel}
//           className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700"
//         >
//           Cancel Registration
//         </button>
//       </div>
//     </div>
//   );
// }

// if (request && request.status === "rejected") {
//    const handleReapply = () => {
//     dispatch(clearDonorRequest());
//      navigate('/user/donor'); // optionally
//   };
//   return (
//     <div className="max-w-xl mx-auto p-6 bg-red-50 rounded shadow mt-8 text-center">
//       <h2 className="text-2xl font-bold text-red-700">❌ Your request was rejected</h2>
//       <p className="mt-4 text-gray-700">
//         Unfortunately, your donor request was rejected. 
//       </p>
//       <div className="mt-6 flex justify-center gap-4">
//       <button
//         onClick={() => navigate('/user/home')}
//         className="mt-6 bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700"
//       >
//         Go to Home
//       </button>
//        <button
//   onClick={handleReapply}
//   className="mt-6 bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700"
// >
//   Register Again
// </button>
// </div>
//     </div>
//   );
// }

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-6">
//       <h2 className="text-2xl font-bold text-red-600 text-center mb-4">Donor Personal Details</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Personal Details */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input name="username" placeholder="Name" className=" input" 
//           value={formData.username} onChange={handleChange}  />
//           <input name="age" placeholder="Age" className="input" 
//           value={formData.age} onChange={handleChange}  />
//           <input name="bloodGroup" placeholder="Blood Group" className="input" value={formData.bloodGroup} onChange={handleChange}  />
//           <select name="gender" className="input" value={formData.gender} onChange={handleChange} required>
//             <option value="" disabled>Select Gender</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//           </select>
//           <input name="location" placeholder="Location" className="input" value={formData.location} onChange={handleChange}  />
//           <input name="phone" placeholder="Phone" className="input" value={formData.phone} onChange={handleChange}  />
//           <textarea name="address" placeholder="Address" className="input col-span-2" value={formData.address} onChange={handleChange}  />
//         </div>

//         {/* Medical Conditions */}
//         <h2 className="text-xl font-bold mt-6 text-center text-gray-700">Medical Condition</h2>
//         <div>
//           <label className="block mb-2">Have you donated blood previously?</label>
//           <div className="flex gap-4">
//             <label><input type="radio" name="donatedBefore" value="yes" checked={formData.donatedBefore === "yes"} onChange={handleChange} /> Yes</label>
//             <label><input type="radio" name="donatedBefore" value="no" checked={formData.donatedBefore === "no"} onChange={handleChange} /> No</label>
//           </div>
//           {formData.donatedBefore === "yes" && (
//              <>
//             <input type="date" name="lastDonatedDate" className="input mt-2" value={formData.lastDonatedDate||""} onChange={handleChange} />
//             {dateError && <p className="text-sm text-red-600 mt-1">{dateError}</p>}
//             </>
//           )}
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
//           <input name="height" placeholder="Height (cm)" className="input" value={formData.height} onChange={handleChange}  />
//           <input name="weight" placeholder="Weight (kg)" className="input" value={formData.weight} onChange={handleChange}  />
//         </div>

//         {/* Checkboxes */}
//         <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
//           <label><input type="checkbox" name="regularMedicine" checked={formData.regularMedicine} onChange={handleChange} /> Regular Medicine</label>
//           <label><input type="checkbox" name="tattoo" checked={formData.tattoo} onChange={handleChange} /> Tattoo / Piercing</label>
//           <label><input type="checkbox" name="minorSurgery" checked={formData.minorSurgery} onChange={handleChange} /> Minor Surgery</label>
//           <label><input type="checkbox" name="majorSurgery" checked={formData.majorSurgery} onChange={handleChange} /> Major Surgery</label>
//           <label><input type="checkbox" name="dentalExtraction" checked={formData.dentalExtraction} onChange={handleChange} /> Dental Extraction</label>
//           <label><input type="checkbox" name="repeatedDiarrhoea" checked={formData.repeatedDiarrhoea} onChange={handleChange} /> Repeated Diarrhoea</label>
//         </div>

//         <div className="text-center mt-6">
//           <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">Submit</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default DonorRequestForm;


import  { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { donorRequestSchema } from "../../validations/donorRequeValidation";
import { useAppDispatch } from "../../redux/hooks";
import { useSelector } from "react-redux";
import { createDonorRequest, fetchMyDonorRequest, cancelDonorRequest, clearDonorRequest } from "../../redux/slices/user/donorSlice";
import type { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DonorRequestForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, request } = useSelector((state: RootState) => state.donor);

  useEffect(() => {
    dispatch(fetchMyDonorRequest());
  }, [dispatch]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (request && request.status === "approved") {
    return (
      <div className="max-w-xl mx-auto p-6 bg-green-50 rounded shadow mt-8 text-center">
        <h2 className="text-2xl font-bold text-green-700">✅ You're already an approved donor!</h2>
        <p className="mt-4 text-gray-700">Thank you for registering as a donor.</p>
        <button
          onClick={() => navigate("/user/home")}
          className="mt-6 bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
        >
          Go to Home
        </button>
      </div>
    );
  }

  if (request && request.status === "pending") {
    const handleCancel = async () => {
      try {
        if (!request || !request._id) {
          toast.error("Unable to cancel. Donor request ID not found.");
          return;
        }
        await dispatch(cancelDonorRequest(request._id));
        toast.success("Your donor request has been cancelled.");
        dispatch(fetchMyDonorRequest());
      } catch (error: any) {
        toast.error(error.message || "Failed to cancel request");
      }
    };

    return (
      <div className="max-w-xl mx-auto p-6 bg-yellow-50 rounded shadow mt-8 text-center">
        <h2 className="text-2xl font-bold text-yellow-700">⏳ Your request is pending approval</h2>
        <p className="mt-4 text-gray-700">
          Thank you for registering. Please wait while our team reviews your request.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => navigate("/user/home")}
            className="bg-yellow-600 text-white px-5 py-2 rounded hover:bg-yellow-700"
          >
            Go to Home
          </button>
          <button
            onClick={handleCancel}
            className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700"
          >
            Cancel Registration
          </button>
        </div>
      </div>
    );
  }

  if (request && request.status === "rejected") {
    const handleReapply = () => {
      dispatch(clearDonorRequest());
      navigate("/user/donor");
    };

    return (
      <div className="max-w-xl mx-auto p-6 bg-red-50 rounded shadow mt-8 text-center">
        <h2 className="text-2xl font-bold text-red-700">❌ Your request was rejected</h2>
        <p className="mt-4 text-gray-700">Unfortunately, your donor request was rejected.</p>
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => navigate("/user/home")}
            className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700"
          >
            Go to Home
          </button>
          <button
            onClick={handleReapply}
            className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700"
          >
            Register Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-bold text-red-600 text-center mb-4">Donor Personal Details</h2>
      <Formik
        initialValues={{
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
        }}

        validationSchema={donorRequestSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const dataToSubmit = { ...values };
            if (values.donatedBefore === "no") {
              dataToSubmit.lastDonatedDate = "";//delete dataToSubmit.lastDonatedDate;
            }

            const action = await dispatch(createDonorRequest(dataToSubmit));
            if (createDonorRequest.fulfilled.match(action)) {
              toast.success("Donor request submitted successfully!");
              navigate("/user/home");
            }
          } catch (err: any) {
            toast.error(err.message || "Something went wrong");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, isSubmitting }) => (
          <Form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field name="username" placeholder="Name" className="input" />
              <ErrorMessage name="username" component="div" className="text-red-600 text-sm" />

              <Field name="age" placeholder="Age" className="input" />
              <ErrorMessage name="age" component="div" className="text-red-600 text-sm" />

              <Field name="bloodGroup" placeholder="Blood Group" className="input" />
              <ErrorMessage name="bloodGroup" component="div" className="text-red-600 text-sm" />

              <Field as="select" name="gender" className="input">
                <option value="" disabled>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Field>
              <ErrorMessage name="gender" component="div" className="text-red-600 text-sm" />

              <Field name="location" placeholder="Location" className="input" />
              <ErrorMessage name="location" component="div" className="text-red-600 text-sm" />

              <Field name="phone" placeholder="Phone" className="input" />
              <ErrorMessage name="phone" component="div" className="text-red-600 text-sm" />

              <Field as="textarea" name="address" placeholder="Address" className="input col-span-2" />
              <ErrorMessage name="address" component="div" className="text-red-600 text-sm" />
            </div>

            <h2 className="text-xl font-bold mt-6 text-center text-gray-700">Medical Condition</h2>
            <div>
              <label className="block mb-2">Have you donated blood previously?</label>
              <div className="flex gap-4">
                <label><Field type="radio" name="donatedBefore" value="yes" /> Yes</label>
                <label><Field type="radio" name="donatedBefore" value="no" /> No</label>
              </div>
              <ErrorMessage name="donatedBefore" component="div" className="text-red-600 text-sm" />

              {values.donatedBefore === "yes" && (
                <>
                  <Field type="date" name="lastDonatedDate" className="input mt-2" />
                  <ErrorMessage name="lastDonatedDate" component="div" className="text-red-600 text-sm" />
                </>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <Field name="height" placeholder="Height (cm)" className="input" />
              <ErrorMessage name="height" component="div" className="text-red-600 text-sm" />

              <Field name="weight" placeholder="Weight (kg)" className="input" />
              <ErrorMessage name="weight" component="div" className="text-red-600 text-sm" />
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <label><Field type="checkbox" name="regularMedicine" /> Regular Medicine</label>
              <label><Field type="checkbox" name="tattoo" /> Tattoo / Piercing</label>
              <label><Field type="checkbox" name="minorSurgery" /> Minor Surgery</label>
              <label><Field type="checkbox" name="majorSurgery" /> Major Surgery</label>
              <label><Field type="checkbox" name="dentalExtraction" /> Dental Extraction</label>
              <label><Field type="checkbox" name="repeatedDiarrhoea" /> Repeated Diarrhoea</label>
            </div>

            <div className="text-center mt-6">
              <button type="submit" disabled={isSubmitting} className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DonorRequestForm;