import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients, createPatientAdherence } from "../patient/patientsSlice";
import toast from "react-hot-toast";

const TrackAdherenceForm = () => {
  const dispatch = useDispatch();
  const { list: patients = [], loading } = useSelector((state) => state.patients);

  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [formData, setFormData] = useState({
    month:"",
    monthlyAdherenceRate: "",
    status: "",
    daysMissed: "",
    primaryBarriers: "",
    lastClinicVisit: "",
    nextAppointment: "",
    notes:""
  });

  const statusOptions = ["Good", "Fair", "Poor"];

  useEffect(() => {
    if (!patients.length) dispatch(fetchPatients());
  }, [dispatch, patients.length]);

  const handlePatientSelect = (selected) => {
    const id = selected ? selected.value : "";
    setSelectedPatientId(id);

    const patient = patients.find((p) => p.id === id);
    if (patient) {
      setFormData({
        month:patient.month || "",
        monthlyAdherenceRate: patient.monthlyAdherenceRate || "",
        status: patient.status || "",
        daysMissed: patient.daysMissed || "",
        primaryBarriers: patient.primaryBarriers || "",
        lastClinicVisit: patient.lastClinicVisit ? patient.lastClinicVisit.split("T")[0] : "",
        nextAppointment: patient.nextAppointment ? patient.nextAppointment.split("T")[0] : "",
        notes:patient.notes || ""
      });
    } else {
      setFormData({
        month:"",
        monthlyAdherenceRate: "",
        status: "",
        daysMissed: "",
        primaryBarriers: "",
        lastClinicVisit: "",
        nextAppointment: "",
        notes:""
      });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!selectedPatientId) {
    toast.error("Please select a patient first");
    return;
  }

  try {
    // Convert numeric fields
    const payload = {
      ...formData,
      daysMissed: Number(formData.daysMissed),
      monthlyAdherenceRate: Number(formData.monthlyAdherenceRate)
    };

    await dispatch(createPatientAdherence({ id: selectedPatientId, data: payload })).unwrap();
    toast.success("Adherence info updated successfully!");

    // Reset form
    setSelectedPatientId("");
    setFormData({
      month: "",
      monthlyAdherenceRate: "",
      status: "",
      daysMissed: "",
      primaryBarriers: "",
      lastClinicVisit: "",
      nextAppointment: "",
      notes: ""
    });
  } catch (err) {
    toast.error(err.message || "Error creating adherence");
    console.error(err);
  }
};


  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Track Patient Adherence</h2>

      {/* Patient Dropdown */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">Select Patient</label>
        <Select
          options={patients.map((p) => ({ value: p.id, label: p.name }))}
          placeholder="Search and select patient..."
          isSearchable
          value={selectedPatientId ? { value: selectedPatientId, label: patients.find((p) => p.id === selectedPatientId)?.name } : null}
          onChange={handlePatientSelect}
          isLoading={loading}
        />
      </div>

      {selectedPatientId && (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Status */}

          <div>
            <label className="block mb-1 font-medium">Month</label>
            <input
              type="month"
              name="month"
              value={formData.month}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          </div>

          {/* Days Missed */}
          <div>
            <label className="block mb-1 font-medium">Days Missed</label>
            <input
              type="number"
              name="daysMissed"
              value={formData.daysMissed}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              min={0}
            />
          </div>

          {/* Monthly Adherence Rate */}
          <div>
            <label className="block mb-1 font-medium">Monthly Adherence Rate (%)</label>
            <input
              type="number"
              name="monthlyAdherenceRate"
              value={formData.monthlyAdherenceRate}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              min={0}
              max={100}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            >
              <option value="">Select status...</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Primary Barriers */}
          <div>
            <label className="block mb-1 font-medium">Primary Barriers</label>
            <input
              type="text"
              name="primaryBarriers"
              value={formData.primaryBarriers}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          </div>

          {/* Last Clinic Visit */}
          <div>
            <label className="block mb-1 font-medium">Last Clinic Visit</label>
            <input
              type="date"
              name="lastClinicVisit"
              value={formData.lastClinicVisit}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          </div>

          {/* Next Appointment */}
          <div>
            <label className="block mb-1 font-medium">Next Appointment</label>
            <input
              type="date"
              name="nextAppointment"
              value={formData.nextAppointment}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          </div>

          {/* Monthly Adherence Rate */}
          <div>
            <label className="block mb-1 font-medium">Additional Notes</label>
            <textarea
              type="text"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          </div>

          <button
            type="submit"
            className="bg-teal-600 hover:bg-teal-700 text-white p-2 rounded w-full"
          >
            Save Adherence Info
          </button>
        </form>
      )}
    </div>
  );
};

export default TrackAdherenceForm;
