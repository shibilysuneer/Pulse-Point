import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchPendingHospitals } from "../../redux/slices/admin/adminHospitalSlice";
import type { RootState, AppDispatch } from "../../redux/store";

const HospitalRequesters = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { hospitals, loading } = useSelector(
    (state: RootState) => state.adminHospital);

    const [currentPage, setCurrentPage] = useState(1);
    const [searchInput, setSearchInput] = useState("");
    const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchPendingHospitals({ page: currentPage, limit: 10,search}));
  }, [dispatch,currentPage,search]);

  const handleViewClick = (id: string) => {
    navigate(`/admin/hospitals/${id}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-red-700 text-center">
        Hospital Registration Requests
      </h2>
{/* search */}
      <div className="flex items-center justify-start mb-8 space-x-2">
  <input
    type="text"
    value={searchInput}
    onChange={(e) => setSearchInput(e.target.value)}
    placeholder="Search by hospital name"
    className="border rounded px-6 py-2 w-96"
  />
  <button
    onClick={() =>{
    setSearch(searchInput.trim());
    setCurrentPage(1);
  }}
    className="bg-red-500 text-white px-3 py-1 rounded"
  >
    Search
  </button>
 <button
  onClick={() => {
    setSearchInput("");
    setSearch("");
    setCurrentPage(1);
  }}
  className="bg-gray-400 text-white px-3 py-1 rounded"
>
  Clear
</button>
</div>
      {loading ? (
        <p className="text-center text-gray-500">Loading hospitals...</p>
      ) : (
        <table className="w-full table-auto border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">License</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">View</th>
            </tr>
          </thead>
          <tbody>
            {hospitals.map((hospital: any) => (
              <tr key={hospital._id} className="text-center">
                <td className="p-2 border">{hospital.name}</td>
                <td className="p-2 border">{hospital.email}</td>
                <td className="p-2 border">{hospital.phone}</td>
                <td className="p-2 border">{hospital.licenseNumber}</td>
                {/* <td className="p-2 border capitalize text-yellow-600 font-medium">
                  {hospital.status}
                </td> */}
                <td
  className={`p-2 border capitalize font-medium ${
    hospital.status === "pending"
      ? "text-yellow-600"
      : hospital.status === "approved"
      ? "text-green-600"
      : hospital.status === "rejected"
      ? "text-red-600"
      : "text-gray-500"
  }`}
>
  {hospital.status}
</td>
                <td className="p-2 border">
                  <button
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    onClick={() => handleViewClick(hospital._id)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
<div className="flex justify-center mt-4 space-x-4">
  <button
    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
    disabled={currentPage === 1}
    className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
  >
    Previous
  </button>
  
  <span>Page {currentPage}</span>

  <button
    onClick={() => setCurrentPage((p) => p + 1)}
    className="px-3 py-1 bg-gray-300 rounded"
  >
    Next
  </button>
</div>
    </div>
  );
};

export default HospitalRequesters;
