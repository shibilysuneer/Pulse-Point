
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import {
  fetchDonorRequests,
} from "../../redux/slices/hospital/reqDonorSlice";
import { Pagination } from "antd";
import usePagination from "../../hooks/usePagination";

const DonorRequesters = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { donorRequests, loading } = useSelector(
    (state: RootState) => state.reqDonor
  );
 const {
    currentPage,
    setCurrentPage,
    pageSize,
    search,
  setSearch,
  // resetPage
  } = usePagination();

  useEffect(() => {
    dispatch(fetchDonorRequests());
  }, [dispatch]);

  const handleViewClick = (id: string) => {
    navigate(`/hospital/donor/${id}`);
  };

//   const handleStatusUpdate = (id: string, status: "approved" | "rejected") => {
//     dispatch(changeDonorStatus({ id, status }));
//   };
 // ✅ Add this before pagination slicing
const filteredDonors = donorRequests.filter((donor: any) =>
  donor.username.toLowerCase().includes(search.toLowerCase()) ||
  donor.location.toLowerCase().includes(search.toLowerCase())||
  donor.bloodGroup.toLowerCase().includes(search.toLowerCase())

);

// ✅ Then paginate the filtered list
const startIndex = (currentPage - 1) * pageSize;
const endIndex = startIndex + pageSize;
const paginatedDonors = filteredDonors.slice(startIndex, endIndex);


  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-red-600 text-center">
        Donor Requests
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading donor requests...</p>
      ) : (
        <>
        <div className="mb-4 flex justify-center">
  <input
    type="text"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="Search by name or location"
    className="px-3 py-2 border rounded w-full max-w-md"
  />
</div>

        <table className="w-full table-auto border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Blood Group</th>
              <th className="p-2 border">Location</th>
              <th className="p-2 border">Gender</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">View</th>
            </tr>
          </thead>
          <tbody>
            {paginatedDonors.map((donor: any) => (
              <tr key={donor._id} className="text-center">
                <td className="p-2 border">{donor.username}</td>
                <td className="p-2 border">{donor.bloodGroup}</td>
                <td className="p-2 border">{donor.location}</td>
                <td className="p-2 border capitalize">{donor.gender}</td>
                <td className="p-2 border">
                  <span
                    className={`px-2 py-1 text-xs font-semibold ${
                      donor.status === "approved"
                        ? "text-green-500"
                        : donor.status === "rejected"
                        ? "text-red-500"
                         : donor.status === "pending"
                         ? "text-yellow-500"
                         : donor.status === "cancelled"
                         ? "text-gray-400"
                         : "text-black"
                        // : "text-yellow-500"
                    }`}
                  >
                    {donor.status}
                  </span>
                </td>
                <td className="p-2 border">
                  <button
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => handleViewClick(donor._id)}
                  >
                    View
                  </button>
                </td>
                {/* <td className="p-2 border space-x-1">
                  <button
                    disabled={donor.status !== "pending"}
                    onClick={() => handleStatusUpdate(donor._id, "approved")}
                    className="px-3 py-1 bg-green-600 text-white rounded disabled:opacity-50"
                  >
                    Approve
                  </button>
                  <button
                    disabled={donor.status !== "pending"}
                    onClick={() => handleStatusUpdate(donor._id, "rejected")}
                    className="px-3 py-1 bg-red-600 text-white rounded disabled:opacity-50"
                  >
                    Reject
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
         {/* ✅ Pagination control */}
          <div className="mt-4 flex justify-center">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={filteredDonors.length}
              onChange={setCurrentPage}
              showSizeChanger={false}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default DonorRequesters;
