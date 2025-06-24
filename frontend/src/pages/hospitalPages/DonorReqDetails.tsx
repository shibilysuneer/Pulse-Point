import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store";
import {
  fetchSingleDonor,
  changeDonorStatus,
} from "../../redux/slices/hospital/reqDonorSlice";

const DonorDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

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
      dispatch(changeDonorStatus({ id, status }));
    }
  };

  if (loading || !selectedDonor) {
    return <p className="text-center mt-10 text-gray-500">Loading donor details...</p>;
  }

  const donor = selectedDonor;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">Donor Details</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <p><strong>Name:</strong> {donor.username}</p>
        <p><strong>Age:</strong> {donor.age}</p>
        <p><strong>Gender:</strong> {donor.gender}</p>
        <p><strong>Blood Group:</strong> {donor.bloodGroup}</p>
        <p><strong>Phone:</strong> {donor.phone}</p>
        <p><strong>Location:</strong> {donor.location}</p>
        <p><strong>Address:</strong> {donor.address}</p>
        <p><strong>Height:</strong> {donor.height}</p>
        <p><strong>Weight:</strong> {donor.weight}</p>
        <p><strong>Donated Before:</strong> {donor.donatedBefore}</p>
        {donor.donatedBefore === "yes" && (
          <p><strong>Last Donated Date:</strong> {donor.lastDonatedDate || "N/A"}</p>
        )}
        <p><strong>Regular Medicine:</strong> {donor.regularMedicine ? "Yes" : "No"}</p>
        <p><strong>Tattoo (last 6 months):</strong> {donor.tattoo ? "Yes" : "No"}</p>
        <p><strong>Minor Surgery (last 6 months):</strong> {donor.minorSurgery ? "Yes" : "No"}</p>
        <p><strong>Major Surgery (last 6 months):</strong> {donor.majorSurgery ? "Yes" : "No"}</p>
        <p><strong>Dental Extraction (last 6 months):</strong> {donor.dentalExtraction ? "Yes" : "No"}</p>
        <p><strong>Repeated Diarrhoea (last 6 months):</strong> {donor.repeatedDiarrhoea ? "Yes" : "No"}</p>
        <p>
          <strong>Status:</strong>{" "}
          <span
            className={
              donor.status === "approved"
                ? "text-green-500"
                : donor.status === "rejected"
                ? "text-red-500"
                : "text-yellow-500"
            }
          >
            {donor.status}
          </span>
        </p>
      </div>

      {donor.status === "pending" && (
        <div className="mt-6 flex justify-between">
          <button
            onClick={() => handleStatusUpdate("approved")}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Approve
          </button>
          <button
            onClick={() => handleStatusUpdate("rejected")}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Reject
          </button>
        </div>
      )}

      <div className="mt-6 text-center">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-blue-600 hover:underline"
        >
          ← Back
        </button>
      </div>
    </div>
  );
};

export default DonorDetails;
