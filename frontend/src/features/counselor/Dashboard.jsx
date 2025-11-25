import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients } from "../patient/patientsSlice";
import { fetchPatientPrescriptions } from "../prescriptions/prescriptionSlice";
import { fetchMedications } from "../medications/medicationSlice";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { list: patients = [], status: patientsStatus } = useSelector((state) => state.patients);
  const { list: prescriptions = [], loading: prescriptionsLoading } = useSelector((state) => state.prescriptions);
  const { list: medications = [] } = useSelector((state) => state.medications);

  useEffect(() => {
    if (patientsStatus === "idle") dispatch(fetchPatients());
    dispatch(fetchPatientPrescriptions());
    dispatch(fetchMedications());
  }, [dispatch, patientsStatus]);

  const totalPatients = patients.length;
  const totalPrescriptions = prescriptions.length;
  const totalMedications = medications.length;

  const recentActivities = prescriptions
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 font-sans">
      <h1 className="text-3xl font-extrabold mb-4 text-teal-700 drop-shadow-md">
        Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-5 bg-linear-to-r from-teal-500 via-teal-600 to-teal-700 text-white shadow-lg rounded-xl border border-teal-600 hover:scale-105 transition-transform duration-300">
          <h2 className="text-sm font-semibold">Total Patients</h2>
          <p className="mt-2 text-2xl font-bold">{totalPatients}</p>
          <Link to="/patients" className="mt-2 inline-block text-sm underline hover:text-white">
            Manage Patients
          </Link>
        </div>

        <div className="p-5 bg-linear-to-r from-blue-500 via-blue-600 to-blue-700 text-white shadow-lg rounded-xl border border-blue-600 hover:scale-105 transition-transform duration-300">
          <h2 className="text-sm font-semibold">Total Prescriptions</h2>
          <p className="mt-2 text-2xl font-bold">{totalPrescriptions}</p>
          <Link to="/prescriptions" className="mt-2 inline-block text-sm underline hover:text-white">
            Manage Prescriptions
          </Link>
        </div>

        <div className="p-5 bg-linear-to-r from-gray-500 via-gray-600 to-gray-700 text-white shadow-lg rounded-xl border border-gray-600 hover:scale-105 transition-transform duration-300">
          <h2 className="text-sm font-semibold">Total Medications</h2>
          <p className="mt-2 text-2xl font-bold">{totalMedications}</p>
          <Link to="/medications" className="mt-2 inline-block text-sm underline hover:text-white">
            Manage Medications
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/patients/create"
          className="p-4 bg-linear-to-r from-teal-600 to-teal-700 text-white font-semibold shadow-lg rounded-lg text-center hover:from-teal-700 hover:to-teal-800 transform hover:-translate-y-1 transition-all duration-300"
        >
          Add Patient
        </Link>
        <Link
          to="/prescriptions/add"
          className="p-4 bg-linear-to-r from-blue-600 to-blue-700 text-white font-semibold shadow-lg rounded-lg text-center hover:from-blue-700 hover:to-blue-800 transform hover:-translate-y-1 transition-all duration-300"
        >
          Add Prescription
        </Link>
        <Link
          to="/adherence/track"
          className="p-4 bg-linear-to-r from-gray-600 to-gray-700 text-white font-semibold shadow-lg rounded-lg text-center hover:from-gray-700 hover:to-yellow-800 transform hover:-translate-y-1 transition-all duration-300"
        >
          Track Adherence
        </Link>
      </div>

      {/* Recent Activities */}
      <div className="bg-white shadow-lg rounded-xl border border-gray-200 p-5">
        <h2 className="text-xl font-semibold mb-4 text-teal-700">Recent Activities</h2>
        {recentActivities.length > 0 ? (
          <ul className="space-y-3">
            {recentActivities.map((activity) => (
              <li
                key={activity.id}
                className="p-3 border rounded-lg flex justify-between items-center hover:shadow-md transition-shadow duration-300"
              >
                <div>
                  <p>
                    <strong className="text-teal-700">{activity.User?.name || "Unknown Patient"}</strong> prescribed{" "}
                    <strong className="text-blue-600">{activity.Medication?.name || "Unknown Medication"}</strong>
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(activity.createdAt).toLocaleString()}
                  </p>
                </div>
                <Link
                  to={`/prescriptions/${activity.id}`}
                  className="text-blue-600 text-sm underline hover:text-blue-800"
                >
                  View
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No recent activities found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
