import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
  fetchPatients,
  fetchPatientAdherence
} from "../patient/patientsSlice";
import {
  
  fetchPatientPrescriptions
} from "../prescriptions/prescriptionSlice";

const ReviewTreatment = () => {
  const dispatch = useDispatch();

  // Redux state
  const { list: patients = [], status: patientsStatus } = useSelector((state) => state.patients);
  const { list: prescriptionsList = [], loading: prescriptionsLoading } = useSelector((state) => state.prescriptions);

  // Component state
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [adherenceRecords, setAdherenceRecords] = useState([]);

  // Fetch patients on mount
  useEffect(() => {
    if (patientsStatus === "idle") dispatch(fetchPatients());
  }, [dispatch, patientsStatus]);

  // Handle patient selection
  const handlePatientSelect = async (selected) => {
    if (!selected) return;

    const patientId = selected.value;
    const patientData = patients.find((p) => p.id === patientId);
    setSelectedPatient(patientData);

    // Fetch prescriptions for selected patient
    const presRes = await dispatch(fetchPatientPrescriptions(patientId)).unwrap();
    setPrescriptions(presRes.prescriptions);

    // Fetch adherence records for selected patient
    const adherenceRes = await dispatch(fetchPatientAdherence(patientId)).unwrap();
    setAdherenceRecords(adherenceRes.adherenceRecords);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Review Treatment</h2>

      {/* Patient Dropdown */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">Select Patient</label>
        <Select
          options={patients.map((p) => ({ value: p.id, label: p.name }))}
          placeholder="Search and select patient..."
          onChange={handlePatientSelect}
          isLoading={patientsStatus === "loading"}
        />
      </div>

      {selectedPatient && (
        <div>
          {/* 1️⃣ Patient Info */}
          <div className="mb-6 p-4 border rounded bg-gray-50">
            <h3 className="text-xl font-semibold mb-2">Patient Info</h3>
            <p><strong>Name:</strong> {selectedPatient.name}</p>
            <p><strong>Age:</strong> {selectedPatient.age || "N/A"}</p>
            <p><strong>Sex:</strong> {selectedPatient.sex || "N/A"}</p>
            <p><strong>Last Visit:</strong> {selectedPatient.lastClinicVisit || "N/A"}</p>
          </div>

          {/* 2️⃣ Prescriptions */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Prescriptions</h3>
            {prescriptions.length > 0 ? (
              prescriptions.map((pr) => (
                <div key={pr.id} className="p-3 border rounded mb-2">
                  <p><strong>Medication:</strong> {pr.Medication?.name}</p>
                  <p><strong>Dosage:</strong> {pr.dosage}</p>
                  <p><strong>Start:</strong> {pr.startDate}</p>
                  <p><strong>End:</strong> {pr.endDate}</p>
                  <p><strong>Status:</strong> {pr.status || "Active"}</p>
                </div>
              ))
            ) : (
              <p>No prescriptions found.</p>
            )}
          </div>

          {/* 3️⃣ Adherence */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Adherence Records</h3>
            {adherenceRecords.length > 0 ? (
              adherenceRecords.map((record) => (
                <div key={record.id} className="p-3 border rounded mb-2 bg-gray-50">
                  <p><strong>Month:</strong> {record.month}</p>
                  <p><strong>Adherence Rate:</strong> {record.monthlyAdherenceRate}%</p>
                  <p><strong>Status:</strong> {record.status}</p>
                  <p><strong>Days Missed:</strong> {record.daysMissed}</p>
                  <p><strong>Primary Barriers:</strong> {record.primaryBarriers || "N/A"}</p>
                </div>
              ))
            ) : (
              <p>No adherence records found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewTreatment;
