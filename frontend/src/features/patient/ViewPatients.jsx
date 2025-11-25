import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients } from "./patientsSlice";
import { useNavigate } from "react-router-dom";
import PatientDetails from "./PatientDetails";
const ViewPatients = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list: patients, status, error } = useSelector((state) => state.patients);
  const user = useSelector((state) => state.auth.user);
const [selectedPatient, setSelectedPatient] = useState(null);



  useEffect(() => {
      dispatch(fetchPatients());
  }, [dispatch, user]);

  const handleViewDetails = (id) => {
  setSelectedPatient(id); // <-- this will trigger the modal to show
};


  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        {user.role === "admin" ? "All Patients" : "My Patients"}
      </h2>

      {status === "loading" && <p>Loading patients...</p>}
      {status === "failed" && <p className="text-red-600">Error: {error}</p>}

      {patients.length > 0 && status === "succeeded" && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Phone</th>
                <th className="py-2 px-4 border-b">Age</th>
                <th className="py-2 px-4 border-b">Gender</th>
                <th className="py-2 px-4 border-b">Next Appointment</th>
                {user.role === "admin" && (
                  <th className="py-2 px-4 border-b">Counselor</th>
                )}
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p.id} className="text-center">
                  <td className="py-2 px-4 border-b">{p.name}</td>
                  <td className="py-2 px-4 border-b">{p.phone}</td>
                  <td className="py-2 px-4 border-b">{p.age ?? "N/A"}</td>
                  <td className="py-2 px-4 border-b">{p.gender}</td>
                  <td className="py-2 px-4 border-b">{p.nextAppointment || "N/A"}</td>
                  {user.role === "admin" && (
  <td className="py-2 px-4 border-b">{p.Counselor?.name || "N/A"}</td>
)}

                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => setSelectedPatient(p.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {patients.length === 0 && status === "succeeded" && (
        <p className="mt-4 text-gray-600">No patients available.</p>
      )}
      {selectedPatient && (
        <PatientDetails
          patientId={selectedPatient}
          onClose={() => setSelectedPatient(null)}
        />
      )}
    </div>
  );
};

export default ViewPatients;
