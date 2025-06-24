// // pages/admin/AdminDonor.tsx
// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import type { RootState, AppDispatch } from "../../redux/store";
// import { fetchDonors } from "../../redux/slices/admin/adminDonorSlice";

// const AdminDonor = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { donors, loading } = useSelector((state: RootState) => state.adminDonor);

//   useEffect(() => {
//     dispatch(fetchDonors());
//   }, [dispatch]);

//   if (loading) {
//     return <div className="p-6">Loading donors...</div>;
//   }

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4 text-red-600 text-center">Registered Donors</h2>
//       <table className="w-full border table-auto text-left">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="p-2 border">Name</th>
//             <th className="p-2 border">Age</th>
//             <th className="p-2 border">Gender</th>
//             <th className="p-2 border">Blood Group</th>
//             <th className="p-2 border">Phone</th>
//             <th className="p-2 border">Location</th>
//             <th className="p-2 border">Donated Before</th>
//           </tr>
//         </thead>
//         <tbody>
//           {donors.map((donor: any) => (
//             <tr key={donor._id}>
//               <td className="p-2 border">{donor.username}</td>
//               <td className="p-2 border">{donor.age}</td>
//               <td className="p-2 border">{donor.gender}</td>
//               <td className="p-2 border">{donor.bloodGroup}</td>
//               <td className="p-2 border">{donor.phone}</td>
//               <td className="p-2 border">{donor.location}</td>
//               <td className="p-2 border">
//                 {donor.donatedBefore === "yes" ? "Yes" : "No"}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminDonor;


import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminDonors, toggleDonorStatus } from "../../redux/slices/admin/adminDonorSlice";
import type{ RootState, AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";

const AdminDonorList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { donors, loading } = useSelector((state: RootState) => state.adminDonor);

  useEffect(() => {
    dispatch(fetchAdminDonors());
  }, [dispatch]);

  const handleToggleStatus = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "blocked" : "active";
    dispatch(toggleDonorStatus({ id, status: newStatus }));
  };

  const handleViewClick = (id: string) => {
    navigate(`/admin/donors/${id}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
         Donors List
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading donors...</p>
      ) : (
        <table className="w-full table-auto border text-sm shadow rounded-md overflow-hidden">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Blood Group</th>
              <th className="p-2 border">Gender</th>
              <th className="p-2 border">Location</th>
              <th className="p-2 border text-center">Status</th>
              <th className="p-2 border text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {donors.map((donor: any) => (
              <tr key={donor._id} className="hover:bg-gray-50">
                <td className="p-2 border">{donor.username}</td>
                <td className="p-2 border">{donor.bloodGroup}</td>
                <td className="p-2 border capitalize">{donor.gender}</td>
                <td className="p-2 border">{donor.location}</td>
                <td className="p-2 border text-center">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                      donor.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {donor.status}
                  </span>
                </td>
                <td className="p-2 border text-center space-x-2">
                  <button
                    onClick={() => handleViewClick(donor._id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleToggleStatus(donor._id, donor.status)}
                    className={`${
                      donor.status === "active"
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    } text-white px-3 py-1 rounded text-xs`}
                  >
                    {donor.status === "active" ? "Block" : "Unblock"}
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

export default AdminDonorList;
