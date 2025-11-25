import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients } from "../patient/patientsSlice";
import { fetchMedications } from "../medications/medicationSlice";
import { createPrescription } from "../prescriptions/prescriptionSlice";
import toast from "react-hot-toast"; // import toast

const AddPrescription = () => {
  const dispatch = useDispatch();

  const { list: patients = [] } = useSelector((state) => state.patients || {});
  const { list: medications = [] } = useSelector(
    (state) => state.medications || {}
  );
  const { user } = useSelector((state) => state.auth);

  const counselorId = user?.id || "";

  const [formData, setFormData] = useState({
    userId: "",
    medicationId: "",
    startDate: "",
    endDate: "",
    dosage: "",
  });

  useEffect(() => {
    dispatch(fetchPatients());
    dispatch(fetchMedications()); 
  }, [dispatch]);

  const submitPrescription = async (e) => {
    e.preventDefault();

    try {
      await dispatch(
        createPrescription({
          ...formData,
          counselorId,
        })
      ).unwrap();

      toast.success("Prescription added successfully!");

      setFormData({
        userId: "",
        medicationId: "",
        startDate: "",
        endDate: "",
        dosage: "",
      });
    } catch (err) {
      toast.error("Error adding prescription");
      console.error(err);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Add Prescription</h2>

      <form onSubmit={submitPrescription} className="space-y-4">
        {/* Patient Dropdown */}
        <div>
          <label className="block text-sm mb-1 font-medium">Patient</label>
          <Select
            options={patients.map((p) => ({ value: p.id, label: p.name }))}
            placeholder="Select patient..."
            isSearchable
            value={
              formData.userId
                ? { value: formData.userId, label: patients.find(p => p.id === formData.userId)?.name }
                : null
            }
            onChange={(selected) =>
              setFormData({ ...formData, userId: selected.value })
            }
          />
        </div>

        {/* Medication Dropdown */}
        <div>
          <label className="block text-sm mb-1 font-medium">Medication</label>
          <Select
            options={medications.map((m) => ({ value: m.id, label: `${m.name} (${m.dosage})` }))}
            placeholder="Select medication..."
            isSearchable
            value={
              formData.medicationId
                ? {
                    value: formData.medicationId,
                    label: medications.find(m => m.id === formData.medicationId)
                      ? `${medications.find(m => m.id === formData.medicationId).name} (${medications.find(m => m.id === formData.medicationId).dosage})`
                      : "",
                  }
                : null
            }
            onChange={(selected) => {
              const med = medications.find((m) => m.id === selected.value);
              setFormData({
                ...formData,
                medicationId: selected.value,
                dosage: med ? med.dosage : "",
              });
            }}
          />
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-sm mb-1 font-medium">Start Date</label>
          <input
            type="date"
            className="border p-2 w-full rounded"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            required
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block text-sm mb-1 font-medium">End Date</label>
          <input
            type="date"
            className="border p-2 w-full rounded"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            required
          />
        </div>

        {/* Dosage Auto-Filled */}
        <div>
          <label className="block text-sm mb-1 font-medium">Dosage</label>
          <input
            type="text"
            className="border p-2 w-full rounded bg-gray-100"
            value={formData.dosage}
            disabled
          />
          <p className="text-xs text-gray-500 mt-1">
            Auto-filled from selected medication
          </p>
        </div>

        <button
          className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700"
          type="submit"
          disabled={!counselorId}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddPrescription;
