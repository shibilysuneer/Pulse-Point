import  { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { fetchDonorRequests } from "../../redux/slices/hospital/reqDonorSlice";

const DonorRequesters = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { donorRequests, loading } = useSelector(
    (state: RootState) => state.reqDonor
  );

  useEffect(() => {
    dispatch(fetchDonorRequests());
  }, [dispatch]);

  const handleViewClick = (id: string) => {
    navigate(`/hospital/donor/${id}`); // make sure this route exists
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-red-600 text-center">
        Donor Requests
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading donor requests...</p>
      ) : (
        <table className="w-full table-auto border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Blood Group</th>
              <th className="p-2 border">Location</th>
              <th className="p-2 border">Gender</th>
              <th className="p-2 border">View</th>
            </tr>
          </thead>
          <tbody>
            {donorRequests.map((donor) => (
              <tr key={donor._id} className="text-center">
                <td className="p-2 border">{donor.username}</td>
                <td className="p-2 border">{donor.bloodGroup}</td>
                <td className="p-2 border">{donor.location}</td>
                <td className="p-2 border capitalize">{donor.gender}</td>
                <td className="p-2 border">
                  <button
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => handleViewClick(donor._id)}
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

export default DonorRequesters;
