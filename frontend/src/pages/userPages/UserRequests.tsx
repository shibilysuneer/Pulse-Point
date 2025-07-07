// import { useEffect } from "react";
// import { fetchMyDonorRequests, 
//     // cancelDonorRequest
//  } from "../../redux/slices/user/donorSlice";
// // import { toast } from "react-toastify";
// import { useSelector } from "react-redux";
// import type { RootState } from "../../redux/store";
// import { useAppDispatch } from "../../redux/hooks";

// const UserDonorRequests = () => {
//   const dispatch = useAppDispatch();
//   const { myRequests, loading } = useSelector((state: RootState) => state.donor);

//   useEffect(() => {
//     dispatch(fetchMyDonorRequests());
//   }, [dispatch]);

// //   const handleCancel = async (id: string) => {
// //     try {
// //       await dispatch(cancelDonorRequest(id));
// //       toast.success("Request cancelled!");
// //     } catch {
// //       toast.error("Failed to cancel request");
// //     }
// //   };

//   if (loading) return <div className="p-6 text-center">Loading your requests...</div>;

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-6">
//       <h2 className="text-2xl font-bold text-red-600 text-center mb-4">
//         My Donor Requests
//       </h2>

//       {(!myRequests || myRequests.length === 0) ? (
//         <p className="text-center text-gray-500">No requests found.</p>
//       ) : (
//         <table className="w-full table-auto border text-sm">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-2 border">Blood Group</th>
//               <th className="p-2 border">Location</th>
//               <th className="p-2 border">Status</th>
//               <th className="p-2 border text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {myRequests.map((req) => (
//               <tr key={req._id} className="text-center">
//                 <td className="p-2 border">{req.bloodGroup}</td>
//                 <td className="p-2 border">{req.location}</td>
//                 <td
//                   className={`p-2 border capitalize font-medium ${
//                     req.status === "pending"
//                       ? "text-yellow-600"
//                       : req.status === "approved"
//                       ? "text-green-600"
//                       : req.status === "cancelled"
//                       ? "text-red-600"
//                       : "text-gray-500"
//                   }`}
//                 >
//                   {req.status}
//                 </td>
//                 {/* <td className="p-2 border text-center">
//                   {req.status === "pending" && (
//                     <button
//                       onClick={() => handleCancel(req._id)}
//                       className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
//                     >
//                       Cancel
//                     </button>
//                   )}
//                 </td> */}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default UserDonorRequests;
