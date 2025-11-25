import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatientById, clearPatient } from "./patientsSlice";

const PatientDetails = ({ patientId, onClose }) => {
  const dispatch = useDispatch();

  // Get current patient state from Redux
  const {
    currentPatient: patient,
    currentPatientStatus: loading,
    currentPatientError: error,
  } = useSelector((state) => state.patients);

  // Fetch patient details on mount
  useEffect(() => {
    if (patientId) dispatch(fetchPatientById(patientId));
    return () => dispatch(clearPatient()); // Cleanup
  }, [dispatch, patientId]);

  if (!patientId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-300 hover:bg-gray-400 rounded px-3 py-1"
        >
          Close
        </button>

        {loading === "loading" && <p>Loading patient details...</p>}
        {loading === "failed" && <p className="text-red-600">{error}</p>}

        {loading === "succeeded" && patient && (
          <>
            <h1 className="text-2xl font-bold mb-4">{patient.name}</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p><strong>Phone:</strong> {patient.phone}</p>
                <p><strong>Age:</strong> {patient.age ?? "N/A"}</p>
                <p><strong>Gender:</strong> {patient.gender}</p>
                <p><strong>Next Appointment:</strong> {patient.nextAppointment ?? "N/A"}</p>
              </div>
              <div>
                <p><strong>Counselor:</strong> {patient.Counselor?.name || "N/A"}</p>
              </div>
            </div>

            {patient.adherenceRecords?.length > 0 && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Adherence History</h2>
                <ul className="space-y-1">
                  {patient.adherenceRecords.map((record) => (
                    <li key={record.id} className="p-2 border rounded bg-gray-50">
                      <p><strong>Month:</strong> {record.month}</p>
                      <p><strong>Adherence Rate:</strong> {record.monthlyAdherenceRate ?? 0}%</p>
                      <p><strong>Days Missed:</strong> {record.daysMissed}</p>
                      <p><strong>Status:</strong> {record.status}</p>
                      {record.primaryBarriers && <p><strong>Barriers:</strong> {record.primaryBarriers}</p>}
                      {record.notes && <p><strong>Notes:</strong> {record.notes}</p>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PatientDetails;
