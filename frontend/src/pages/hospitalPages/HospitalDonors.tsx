import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { fetchDonorRequests,hosToggleDonorBlock } from "../../redux/slices/hospital/reqDonorSlice";
import { Pagination } from "antd";
import usePagination from "../../hooks/usePagination";

const HosDonors = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { donorRequests, loading  } = useSelector(
    (state: RootState) => state.reqDonor
  );
  const {
  currentPage,
  setCurrentPage,
  pageSize,
  search,
  setSearch,
} = usePagination();


  useEffect(() => {
    dispatch(fetchDonorRequests());
  }, [dispatch]);

  // ✅ Filter only approved
  const approvedDonors = donorRequests
    ?.filter((donor: any) => donor.status === "approved")
    ?.filter((donor: any) =>
      donor.username.toLowerCase().includes(search.toLowerCase()) ||
      donor.location.toLowerCase().includes(search.toLowerCase()) ||
      donor.bloodGroup.toLowerCase().includes(search.toLowerCase())
    );

  // ✅ Paginate filtered results
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedDonors = approvedDonors.slice(startIndex, endIndex);


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
        <>
          {/* ✅ Search Input */}
          <div className="mb-4 flex justify-center">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, location or blood group"
              className="px-3 py-2 border rounded w-full max-w-md"
            />
          </div>
        <table className="w-full table-auto border text-sm shadow rounded">
          <thead className="bg-green-50">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Blood Group</th>
              <th className="p-2 border">Location</th>
              <th className="p-2 border">Gender</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">View</th>
              <th className="p-2 border">Block</th>
            </tr>
          </thead>
          <tbody>
            {paginatedDonors.map((donor: any) => (
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
                <td className="p-2 border">
  <button
    className={`px-3 py-1 rounded text-xs ${
      donor.isBlocked ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
    } text-white`}
    onClick={() =>{ 
      dispatch(hosToggleDonorBlock({ id: donor._id, isBlocked: !donor.isBlocked }))
    }
    }
  >
    {donor.isBlocked ? "Unblock" : "Block"}
  </button>
</td>
                
              </tr>
            ))}
          </tbody>
        </table>
        
          {/* ✅ Pagination Control */}
          <div className="mt-4 flex justify-center">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={approvedDonors.length}
              onChange={setCurrentPage}
              showSizeChanger={false}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default HosDonors;

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import type { RootState, AppDispatch } from "../../redux/store";
// import { useNavigate } from "react-router-dom";
// import { fetchDonorRequests, hosToggleDonorBlock } from "../../redux/slices/hospital/reqDonorSlice";
// import { Pagination } from "antd";
// import usePagination from "../../hooks/usePagination";

// const HosDonors = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();

//   const { donorRequests, loading, error } = useSelector(
//     (state: RootState) => state.reqDonor
//   );

//   const {
//     currentPage,
//     setCurrentPage,
//     pageSize,
//     search,
//     setSearch,
//   } = usePagination();

//   useEffect(() => {
//     dispatch(fetchDonorRequests());
//   }, [dispatch]);

//   // ✅ Filter only approved
//   const approvedDonors = donorRequests
//     ?.filter((donor: any) => donor.status === "approved")
//     ?.filter((donor: any) =>
//       donor.username.toLowerCase().includes(search.toLowerCase()) ||
//       donor.location.toLowerCase().includes(search.toLowerCase()) ||
//       donor.bloodGroup.toLowerCase().includes(search.toLowerCase())
//     );

//   // ✅ Paginate filtered results
//   const startIndex = (currentPage - 1) * pageSize;
//   const endIndex = startIndex + pageSize;
//   const paginatedDonors = approvedDonors.slice(startIndex, endIndex);

//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-bold mb-4 text-green-600 text-center">
//         Donors
//       </h2>

//       {loading ? (
//         <p className="text-center text-gray-500">Loading approved donors...</p>
//       ) : error ? (
//         // <p className="text-center text-red-500">{error}</p>
//          <p className="text-center text-red-500">
//     {error === "Unauthorized"
//       ? "Access denied. Please register as an approved hospital."
//       : error}
//   </p>
//       ) : approvedDonors.length === 0 ? (
//         <p className="text-center text-gray-500">No approved donors found.</p>
//       ) : (
//         <>
//           {/* ✅ Search Input */}
//           <div className="mb-4 flex justify-center">
//             <input
//               type="text" 
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search by name, location or blood group"
//               className="px-3 py-2 border rounded w-full max-w-md"
//             />
//           </div>

//           <table className="w-full table-auto border text-sm shadow rounded">
//             <thead className="bg-green-50">
//               <tr>
//                 <th className="p-2 border">Name</th>
//                 <th className="p-2 border">Blood Group</th>
//                 <th className="p-2 border">Location</th>
//                 <th className="p-2 border">Gender</th>
//                 <th className="p-2 border">Phone</th>
//                 <th className="p-2 border">View</th>
//                 <th className="p-2 border">Block</th>
//               </tr>
//             </thead>
//             <tbody>
//               {paginatedDonors.map((donor: any) => (
//                 <tr key={donor._id} className="text-center hover:bg-green-50 transition">
//                   <td className="p-2 border">{donor.username}</td>
//                   <td className="p-2 border">{donor.bloodGroup}</td>
//                   <td className="p-2 border">{donor.location}</td>
//                   <td className="p-2 border capitalize">{donor.gender}</td>
//                   <td className="p-2 border">{donor.phone}</td>
//                   <td className="p-2 border">
//                     <button
//                       className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
//                       onClick={() => navigate(`/hospital/donor/${donor._id}`)}
//                     >
//                       View
//                     </button>
//                   </td>
//                   <td className="p-2 border">
//                     <button
//                       className={`px-3 py-1 rounded text-xs ${
//                         donor.isBlocked ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
//                       } text-white`}
//                       onClick={() => {
//                         dispatch(hosToggleDonorBlock({ id: donor._id, isBlocked: !donor.isBlocked }));
//                       }}
//                     >
//                       {donor.isBlocked ? "Unblock" : "Block"}
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* ✅ Pagination Control */}
//           <div className="mt-4 flex justify-center">
//             <Pagination
//               current={currentPage}
//               pageSize={pageSize}
//               total={approvedDonors.length}
//               onChange={setCurrentPage}
//               showSizeChanger={false}
//             />
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default HosDonors;

