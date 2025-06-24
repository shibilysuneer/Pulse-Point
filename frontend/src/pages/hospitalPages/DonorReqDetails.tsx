import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store";
import {
  fetchSingleDonor,
  changeDonorStatus,
} from "../../redux/slices/hospital/reqDonorSlice";
import { toast } from "react-toastify";

const DonorDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
const [actionTaken, setActionTaken] = useState(false);
  const { selectedDonor, loading } = useSelector(
    (state: RootState) => state.reqDonor
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleDonor(id));
    }
  }, [dispatch, id]);

  const handleStatusUpdate = (status: "approved" | "rejected") => {
    if (id) {
        try {
            dispatch(changeDonorStatus({ id, status }));
      setActionTaken(true);
      if (status === "approved") {
    toast.success("Donor approved successfully");
  } else {
    toast.error("Donor rejected");
  } 
        } catch (error) {
           toast.error("Failed to update status"); 
        }
     
    }
  };

  if (loading || !selectedDonor) {
    return <p className="text-center mt-10 text-gray-500">Loading donor details...</p>;
  }

  const donor = selectedDonor;
 const Detail = ({
  label,
  value,
  danger = false,
}: {
  label: string;
  value: string;
  danger?: boolean;
}) => (
  <p>
    <span className="font-medium text-gray-700">{label}:</span>{" "}
    <span className={danger ? "text-red-600 font-semibold" : "text-gray-900"}>
      {value}
    </span>
  </p>
);

  return (
    // <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
    //   <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">Donor Details</h2>

    //   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
    //     <p><strong>Name:</strong> {donor.username}</p>
    //     <p><strong>Age:</strong> {donor.age}</p>
    //     <p><strong>Gender:</strong> {donor.gender}</p>
    //     <p><strong>Blood Group:</strong> {donor.bloodGroup}</p>
    //     <p><strong>Phone:</strong> {donor.phone}</p>
    //     <p><strong>Location:</strong> {donor.location}</p>
    //     <p><strong>Address:</strong> {donor.address}</p>
    //     <p><strong>Height:</strong> {donor.height}</p>
    //     <p><strong>Weight:</strong> {donor.weight}</p>
    //     <p><strong>Donated Before:</strong> {donor.donatedBefore}</p>
    //     {donor.donatedBefore === "yes" && (
    //       <p><strong>Last Donated Date:</strong> {donor.lastDonatedDate || "N/A"}</p>
    //     )}
    //     <p><strong>Regular Medicine:</strong> {donor.regularMedicine ? "Yes" : "No"}</p>
    //     <p><strong>Tattoo (last 6 months):</strong> {donor.tattoo ? "Yes" : "No"}</p>
    //     <p><strong>Minor Surgery (last 6 months):</strong> {donor.minorSurgery ? "Yes" : "No"}</p>
    //     <p><strong>Major Surgery (last 6 months):</strong> {donor.majorSurgery ? "Yes" : "No"}</p>
    //     <p><strong>Dental Extraction (last 6 months):</strong> {donor.dentalExtraction ? "Yes" : "No"}</p>
    //     <p><strong>Repeated Diarrhoea (last 6 months):</strong> {donor.repeatedDiarrhoea ? "Yes" : "No"}</p>
    //     <p>
    //       <strong>Status:</strong>{" "}
    //       <span
    //         className={
    //           donor.status === "approved"
    //             ? "text-green-500"
    //             : donor.status === "rejected"
    //             ? "text-red-500"
    //             : "text-yellow-500"
    //         }
    //       >
    //         {donor.status}
    //       </span>
    //     </p>
    //   </div>

    //   {donor.status === "pending" && !actionTaken && (
    //     <div className="mt-6 flex justify-between">
    //       <button
    //         onClick={() => handleStatusUpdate("approved")}
    //          disabled={actionTaken}
    //         className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    //       >
    //         Approve
    //       </button>
    //       <button
    //         onClick={() => handleStatusUpdate("rejected")}
    //          disabled={actionTaken}
    //         className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
    //       >
    //         Reject
    //       </button>
    //     </div>
    //   )}

    //   <div className="mt-6 text-center">
    //     <button
    //       onClick={() => navigate(-1)}
    //       className="text-sm text-blue-600 hover:underline"
    //     >
    //       ← Back
    //     </button>
    //   </div>
    // </div>
    
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-xl mt-8">
  <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
     Donor Details
  </h2>

  {/* Donor Info Section */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
    <Detail label="Name" value={donor.username} />
    <Detail label="Age" value={donor.age} />
    <Detail label="Gender" value={donor.gender} />
    <Detail label="Blood Group" value={donor.bloodGroup} />
    <Detail label="Phone" value={donor.phone} />
    <Detail label="Location" value={donor.location} />
    <Detail label="Address" value={donor.address} />
    <Detail label="Height" value={`${donor.height} cm`} />
    <Detail label="Weight" value={`${donor.weight} kg`} />
    <Detail label="Donated Before" value={donor.donatedBefore} />
    {donor.donatedBefore === "yes" && (
      <Detail
        label="Last Donated Date"
        value={donor.lastDonatedDate || "N/A"}
      />
    )}
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-3">Health Conditions</h3>
     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
    <Detail
    label="Regular Medicine"
    value={donor.regularMedicine ? "Yes" : "No"}
    danger={donor.regularMedicine}
  />
  <Detail
    label="Tattoo (6 months)"
    value={donor.tattoo ? "Yes" : "No"}
    danger={donor.tattoo}
  />
  <Detail
    label="Minor Surgery"
    value={donor.minorSurgery ? "Yes" : "No"}
    danger={donor.minorSurgery}
  />
  <Detail
    label="Major Surgery"
    value={donor.majorSurgery ? "Yes" : "No"}
    danger={donor.majorSurgery}
  />
  <Detail
    label="Dental Extraction"
    value={donor.dentalExtraction ? "Yes" : "No"}
    danger={donor.dentalExtraction}
  />
  <Detail
    label="Repeated Diarrhoea"
    value={donor.repeatedDiarrhoea ? "Yes" : "No"}
    danger={donor.repeatedDiarrhoea}
  />

    {/* Status */}
    <div className="col-span-2 text-center mt-4">
      <span
        className={`inline-block px-4 py-1 text-sm font-semibold rounded-full ${
          donor.status === "approved"
            ? "bg-green-100 text-green-700"
            : donor.status === "rejected"
            ? "bg-red-100 text-red-700"
            : "bg-yellow-100 text-yellow-700"
        }`}
      >
        Status: {donor.status}
      </span>
    </div>
  </div>

  {/* Action Buttons */}
  {donor.status === "pending" && !actionTaken && (
    <div className="flex justify-between mt-8">
      <button
        onClick={() => handleStatusUpdate("approved")}
        disabled={actionTaken}
        className="bg-green-600 text-white font-medium px-5 py-2 rounded-lg hover:bg-green-700 transition"
      >
        ✅ Approve
      </button>
      <button
        onClick={() => handleStatusUpdate("rejected")}
        disabled={actionTaken}
        className="bg-red-600 text-white font-medium px-5 py-2 rounded-lg hover:bg-red-700 transition"
      >
        ❌ Reject
      </button>
    </div>
  )}

  {/* Back Button */}
  <div className="mt-8 text-center">
    <button
      onClick={() => navigate(-1)}
      className="text-blue-600 hover:underline text-sm"
    >
      ← Back to List
    </button>
  </div>
</div>

  );
};

export default DonorDetails;
