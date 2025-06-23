import { useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { useSelector } from "react-redux";
import { fetchHospitals, toggleHospitalBlock } from "../../redux/slices/admin/adminHospitalSlice";

const AdminHospital = () => {
  const dispatch = useAppDispatch();
  const { hospitals, loading } = useSelector((state: any) => state.adminHospital);

// const [editModalOpen, setEditModalOpen] = useState(false);
// const [selectedHospital, setSelectedHospital] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchHospitals({ page: 1, limit: 10 }));
  }, [dispatch]);

  const handleBlockToggle = (id: string, isBlocked: boolean) => {
    dispatch(toggleHospitalBlock({ hospitalId: id, isBlocked: !isBlocked }));
  };
// const openEditModal = (hospital: any) => {
//   setSelectedHospital(hospital);
//   setEditModalOpen(true);
// };

// const closeModal = () => {
//   setEditModalOpen(false);
//   setSelectedHospital(null);
// };
 if (loading) {
    return <div className="p-6">Loading hospitals...</div>;
  }
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-red-600 text-center">Manage Hospitals</h2>
      <table className="w-full border table-auto text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Reg. No</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {hospitals?.map((h: any) => (
            <tr key={h._id}>
              <td className="p-2 border">{h.name}</td>
              <td className="p-2 border">{h.email}</td>
              <td className="p-2 border">{h.registrationNumber}</td>
              <td className="p-2 border">
                {h.isBlocked ? (
                  <span className="text-red-500">Blocked</span>
                ) : (
                  <span className="text-green-500">Active</span>
                )}
              </td>
              <td className="p-2 border">
                <button
                  className={`px-3 py-1 rounded ${
                    h.isBlocked ? "bg-green-500" : "bg-red-500"
                  } text-white`}
                  onClick={() => handleBlockToggle(h._id, h.isBlocked)}
                >
                  {h.isBlocked ? "Unblock" : "Block"}
                </button>
                {/* <button className="ml-2 px-3 py-1 bg-blue-500 text-white rounded">
                  Edit
                </button> */}
                {/* <button
          className="ml-2 px-3 py-1 bg-blue-500 text-white rounded"
          onClick={() => openEditModal(h)}
        >
          Edit
        </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      {/* Modal */}
      {/* {editModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Edit Hospital</h3>
            <p><strong>Name:</strong> {selectedHospital?.name}</p>
            <p><strong>Email:</strong> {selectedHospital?.email}</p>
            <p><strong>Reg. No:</strong> {selectedHospital?.registrationNumber}</p> */}

            {/* You can add form inputs here for editing and dispatch update action */}
{/* 
            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )} */}



    </div>
  );
};

export default AdminHospital;
