import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { fetchDonorRequests } from "../../redux/slices/hospital/reqDonorSlice";

const HosDonors = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { donorRequests, loading } = useSelector(
    (state: RootState) => state.reqDonor
  );

  useEffect(() => {
    dispatch(fetchDonorRequests());
  }, [dispatch]);

  // ✅ Filter only approved donors
  const approvedDonors = donorRequests?.filter(
    (donor: any) => donor.status === "approved"
  );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4 text-green-600 text-center">
         Donors
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading approved donors...</p>
      ) : approvedDonors.length === 0 ? (
        <p className="text-center text-gray-500">No approved donors found.</p>
      ) : (
        <table className="w-full table-auto border text-sm shadow rounded">
          <thead className="bg-green-50">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Blood Group</th>
              <th className="p-2 border">Location</th>
              <th className="p-2 border">Gender</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">View</th>
            </tr>
          </thead>
          <tbody>
            {approvedDonors.map((donor: any) => (
              <tr key={donor._id} className="text-center hover:bg-green-50 transition">
                <td className="p-2 border">{donor.username}</td>
                <td className="p-2 border">{donor.bloodGroup}</td>
                <td className="p-2 border">{donor.location}</td>
                <td className="p-2 border capitalize">{donor.gender}</td>
                <td className="p-2 border">{donor.phone}</td>
                <td className="p-2 border">
                  <button
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => navigate(`/hospital/donor/${donor._id}`)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HosDonors;
