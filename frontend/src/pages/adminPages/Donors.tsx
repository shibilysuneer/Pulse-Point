// pages/admin/AdminDonor.tsx
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store";
import { fetchDonors } from "../../redux/slices/admin/adminDonorSlice";

const AdminDonor = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { donors, loading } = useSelector((state: RootState) => state.adminDonor);

  useEffect(() => {
    dispatch(fetchDonors());
  }, [dispatch]);

  if (loading) {
    return <div className="p-6">Loading donors...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-red-600 text-center">Registered Donors</h2>
      <table className="w-full border table-auto text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Age</th>
            <th className="p-2 border">Gender</th>
            <th className="p-2 border">Blood Group</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Location</th>
            <th className="p-2 border">Donated Before</th>
          </tr>
        </thead>
        <tbody>
          {donors.map((donor: any) => (
            <tr key={donor._id}>
              <td className="p-2 border">{donor.username}</td>
              <td className="p-2 border">{donor.age}</td>
              <td className="p-2 border">{donor.gender}</td>
              <td className="p-2 border">{donor.bloodGroup}</td>
              <td className="p-2 border">{donor.phone}</td>
              <td className="p-2 border">{donor.location}</td>
              <td className="p-2 border">
                {donor.donatedBefore === "yes" ? "Yes" : "No"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDonor;
