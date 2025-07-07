import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Card, Spin, Descriptions, message } from "antd";
import type { RootState, AppDispatch } from "../../redux/store";
import { fetchHospitalById, updateHospitalStatus } from "../../redux/slices/admin/adminHospitalSlice";
// import { notification } from "antd";

const HospitalDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedHospital:hospital, loading, error } = useSelector(
    (state: RootState) => state.adminHospital
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchHospitalById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

const handleStatusUpdate = (newStatus: "approved" | "rejected") => {
  if (!hospital || !id) return;

  dispatch(updateHospitalStatus({ hospitalId: id, newStatus }))
    .unwrap()
    .then(() => {
      message.success(`Hospital ${newStatus}`);
    })
    .catch((err:any) => {
      message.error(err || "Error updating status");
    });
};

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-64px)]">
        <Spin size="large" />
      </div>
    );
  }

  if (!hospital) {
    return (
      <div className="text-center text-red-600 mt-10">
        Hospital not found or failed to load.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card title="Hospital Details" bordered>
        <Descriptions bordered column={1} labelStyle={{ fontWeight: 'bold' }}>
          <Descriptions.Item label="Name">{hospital.name}</Descriptions.Item>
          <Descriptions.Item label="Email">{hospital.email}</Descriptions.Item>
          <Descriptions.Item label="Phone">{hospital.phone}</Descriptions.Item>
          <Descriptions.Item label="Registration Number">{hospital.registrationNumber}</Descriptions.Item>
          <Descriptions.Item label="License Number">{hospital.licenseNumber}</Descriptions.Item>
          <Descriptions.Item label="Website">{hospital.website}</Descriptions.Item>
          {/* <Descriptions.Item label="Status">{hospital.status}</Descriptions.Item> */}
          <Descriptions.Item label="Status">
  <span
    className={`capitalize font-semibold ${
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
  </span>
</Descriptions.Item>

          <Descriptions.Item label="Blocked">{hospital.isBlocked ? "Yes" : "No"}</Descriptions.Item>
          {hospital.address && (
            <>
              <Descriptions.Item label="Street">{hospital.address.street}</Descriptions.Item>
              <Descriptions.Item label="City">{hospital.address.city}</Descriptions.Item>
              <Descriptions.Item label="State">{hospital.address.state}</Descriptions.Item>
              <Descriptions.Item label="Zip Code">{hospital.address.zipCode}</Descriptions.Item>
            </>
          )}
          {/* <Descriptions.Item label="Created At">{new Date(hospital.createdAt).toLocaleString()}</Descriptions.Item> */}
        
        </Descriptions>

       {hospital.status === "pending" && ( 
<div className="flex justify-between mt-8">
  <button
    onClick={() => handleStatusUpdate("approved")}
    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
  >
   ✅ Approve
  </button>
  <button
    onClick={() => handleStatusUpdate("rejected")}
    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
  >
   ❌ Reject
  </button>
</div>
)}
      </Card>
       <div className="mt-8 text-center">
      <button
        onClick={() => window.history.back()}
        className="text-blue-600 hover:underline text-sm"
      >
        ← Back to List
      </button>
    </div>

    </div>
  );
};

export default HospitalDetails;
