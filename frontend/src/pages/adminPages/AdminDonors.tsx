

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAdminDonors,adToggleDonorBlock  } from "../../redux/slices/admin/adminDonorSlice";
// import type { RootState, AppDispatch } from "../../redux/store";
// import { useNavigate } from "react-router-dom";

// const AdminDonorList = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();

//   const { donors, loading,total  } = useSelector((state: RootState) => state.adminDonor);
// const [currentPage, setCurrentPage] = useState(1);
// const [search, setSearch] = useState("");

// const limit = 10;

//   // useEffect(() => {
//   //   dispatch(fetchAdminDonors({ page: currentPage, limit,search }));
//   // }, [dispatch,currentPage,search]);
// useEffect(() => {
//   dispatch(fetchAdminDonors({ page: currentPage, limit, search }));
// }, [dispatch, currentPage]);

// useEffect(() => {
//   setCurrentPage(1);
// }, [search]);


//   const handleViewClick = (id: string) => {
//     navigate(`/admin/donors/${id}`);
//   };
// if (loading) {
//     return <div className="p-6">Loading donors...</div>;
//   }
//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
//         Manage Donors
//       </h2>

// {/* search */}
// <div className="flex justify-center mb-4">
//   <input
//     type="text"
//     value={search}
//     onChange={(e) => {
//       setSearch(e.target.value);
//       setCurrentPage(1);
//     }}
//     placeholder="Search donors by name..."
//     className="border px-3 py-1 rounded w-64"
//   />
// </div>

//       {loading ? (
//         <p className="text-center text-gray-500">Loading donors...</p>
//       ) : (
//         <table className="w-full table-auto border text-sm shadow rounded-md overflow-hidden">
//           <thead className="bg-gray-100">
//             <tr className="text-left">
//               <th className="p-2 border">Name</th>
//               <th className="p-2 border">Blood Group</th>
//               <th className="p-2 border">Gender</th>
//               <th className="p-2 border">Location</th>
//               <th className="p-2 border text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {(donors ?? []).map((donor: any) => (
//               <tr key={donor._id} className="hover:bg-gray-50">
//                 <td className="p-2 border">{donor.username}</td>
//                 <td className="p-2 border">{donor.bloodGroup}</td>
//                 <td className="p-2 border capitalize">{donor.gender}</td>
//                 <td className="p-2 border">{donor.location}</td>
//                 {/* <td className="p-2 border text-center">
//                   <span
//                     className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
//                       donor.status === "active"
//                         ? "bg-green-100 text-green-700"
//                         : "bg-red-100 text-red-700"
//                     }`}
//                   >
//                     {donor.status === "active" ? "Active" : "Blocked"}
//                   </span>
//                 </td> */}
//                 <td className="p-2 border text-center space-x-2">
//                   <button
//                     onClick={() => handleViewClick(donor._id)}
//                     className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
//                   >
//                     View
//                   </button>
//                   <button
//                     onClick={() =>
//                     dispatch(adToggleDonorBlock({ donorId: donor._id, isBlocked: !donor.isBlocked }))
//                     }
//                     className={`${
//                      donor.isBlocked
//                         ? "bg-red-500 hover:bg-red-600"
//                         : "bg-green-500 hover:bg-green-600"
//                     } text-white px-3 py-1 rounded text-xs`}
//                   >
//                     {donor.isBlocked ?  "Unblock" : "Block"}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       <div className="flex justify-center mt-4 space-x-4">
//   <button
//     onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
//     disabled={currentPage === 1}
//     className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
//   >
//     Previous
//   </button>

//   <span>Page {currentPage}</span>

//   <button
//     onClick={() => {
//       const maxPage = Math.ceil(total / limit);
//       if (currentPage < maxPage) setCurrentPage((p) => p + 1);
//     }}
//     className="px-3 py-1 bg-gray-300 rounded"
//   >
//     Next
//   </button>
// </div>

//     </div>
//   );
// };

// export default AdminDonorList;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminDonors, adToggleDonorBlock } from "../../redux/slices/admin/adminDonorSlice";
import type { RootState, AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
// import { useDebounce } from "use-debounce";


const AdminDonorList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { donors, loading } = useSelector((state: RootState) => state.adminDonor);

 const [currentPage, setCurrentPage] = useState(1);
const [searchInput, setSearchInput] = useState("");
const [search, setSearch] = useState("");            // actual committed search term


useEffect(() => {
    dispatch(fetchAdminDonors({ page: currentPage, limit: 10,search   }));
  }, [dispatch,, currentPage,search]);

  // useEffect(() => {
  //   dispatch(fetchAdminDonors({ page: currentPage, limit, search }));
  // }, [dispatch, currentPage, search]);

  // const handleSearch = () => {
  //   setSearchInput("");
  //   setCurrentPage(1);
  //   // setSearch(searchInput.trim());
  // };

  // const handleClear = () => {
  //   setSearchInput("");
  //   // setSearch("");
  //   setCurrentPage(1);
  // };

  const handleViewClick = (id: string) => {
    navigate(`/admin/donors/${id}`);
  };

  if (loading) {
    return <div className="p-6">Loading donors...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
        Manage Donors
      </h2>

      {/* Search area */}
      {/* <div className="flex items-center justify-start mb-8 space-x-2">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search donors by name or blood group..."
          className="border rounded px-6 py-2 w-96"
        />
        
        <button
          onClick={handleClear}
          className="bg-gray-400 text-white px-3 py-1 rounded"
        >
          Clear
        </button>
      </div> */}
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


      {/* Table */}
      <table className="w-full table-auto border text-sm shadow rounded-md overflow-hidden">
        <thead className="bg-gray-100">
          <tr className="text-left">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Blood Group</th>
            <th className="p-2 border">Gender</th>
            <th className="p-2 border">Location</th>
            <th className="p-2 border text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {(!donors || donors.length === 0) ? (
            <tr>
              <td colSpan={5} className="text-center p-4 text-gray-500">
                No donors found.
              </td>
            </tr>
          ) : (
            donors.map((donor: any) => (
              <tr key={donor._id} className="hover:bg-gray-50">
                <td className="p-2 border">{donor.username}</td>
                <td className="p-2 border">{donor.bloodGroup}</td>
                <td className="p-2 border capitalize">{donor.gender}</td>
                <td className="p-2 border">{donor.location}</td>
                <td className="p-2 border text-center space-x-2">
                  <button
                    onClick={() => handleViewClick(donor._id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                  >
                    View
                  </button>
                  <button
                    onClick={() =>
                      dispatch(adToggleDonorBlock({ donorId: donor._id, isBlocked: !donor.isBlocked }))
                    }
                    className={`${
                      donor.isBlocked
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                    } text-white px-3 py-1 rounded text-xs`}
                  >
                    {donor.isBlocked ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {/* <div className="flex justify-center mt-4 space-x-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span>Page {currentPage}</span>

        <button
          onClick={() => {
            const maxPage = Math.ceil(total / limit);
            if (currentPage < maxPage) setCurrentPage((p) => p + 1);
          }}
          className="px-3 py-1 bg-gray-300 rounded"
          disabled={currentPage >= Math.ceil(total / limit)}
        >
          Next
        </button>
      </div> */}
      
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

export default AdminDonorList;
