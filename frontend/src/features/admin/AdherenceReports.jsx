import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPatients, fetchPatientAdherence } from '../patient/patientsSlice';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const AdherenceReports = () => {
  const dispatch = useDispatch();
  
  // Get patients from the patients slice
  const { list: patients = [], status } = useSelector((state) => state.patients || {});

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Fetch patients if not already loaded
    if (status === 'idle') dispatch(fetchPatients());
  }, [dispatch, status]);

  useEffect(() => {
    // Fetch adherence for each patient
    patients.forEach((patient) => {
      if (!patient.adherenceRecords) {
        dispatch(fetchPatientAdherence(patient.id));
      }
    });
  }, [dispatch, patients]);

  useEffect(() => {
    // Prepare chart data from all patients' adherence records
    const data = patients.flatMap((patient) => 
      (patient.adherenceRecords || []).map((record) => ({
        patient: patient.name || 'Unknown',
        adherenceRate: record.monthlyAdherenceRate || 0,
        daysMissed: record.daysMissed || 0,
        updatedAt: record.updatedAt,
        id: record.id,
      }))
    );
    setChartData(data);
  }, [patients]);

  const totalPatients = patients.length;
  const allAdherenceRecords = patients.flatMap((p) => p.adherenceRecords || []);
  const averageAdherence =
    allAdherenceRecords.reduce((sum, r) => sum + (r.monthlyAdherenceRate || 0), 0) /
    (allAdherenceRecords.length || 1);

  return (
    <div className="p-6 bg-white rounded-lg shadow border border-gray-200">
      <h1 className="text-2xl font-bold mb-6">Adherence Reports</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="p-4 bg-teal-100 rounded-lg shadow">
          <h2 className="text-sm font-medium text-gray-600">Total Patients</h2>
          <p className="text-xl font-bold">{totalPatients}</p>
        </div>
        <div className="p-4 bg-teal-100 rounded-lg shadow">
          <h2 className="text-sm font-medium text-gray-600">Average Adherence Rate</h2>
          <p className="text-xl font-bold">{averageAdherence.toFixed(2)}%</p>
        </div>
        <div className="p-4 bg-teal-100 rounded-lg shadow">
          <h2 className="text-sm font-medium text-gray-600">Patients Missing &gt; 3 Days</h2>
          <p className="text-xl font-bold">
            {allAdherenceRecords.filter((r) => r.daysMissed > 3).length}
          </p>
        </div>
      </div>

      <div className="w-full h-80">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="patient" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="adherenceRate" fill="#14b8a6" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500">No adherence data available.</p>
        )}
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-3">Recent Adherence Records</h2>
        {allAdherenceRecords.length > 0 ? (
          <ul className="space-y-2">
            {allAdherenceRecords
              .slice()
              .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
              .slice(0, 5)
              .map((record) => (
                <li
                  key={record.id}
                  className="p-3 border rounded flex justify-between items-center bg-gray-50"
                >
                  <div>
                    <p>
                      <strong>{record.User?.name || 'Unknown Patient'}</strong> - Adherence Rate:{' '}
                      <strong>{record.monthlyAdherenceRate || 0}%</strong> ({record.daysMissed} days missed)
                    </p>
                    <p className="text-xs text-gray-500">
                      Last updated: {new Date(record.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </li>
              ))}
          </ul>
        ) : (
          <p className="text-gray-500">No recent adherence records found.</p>
        )}
      </div>
    </div>
  );
};

export default AdherenceReports;
