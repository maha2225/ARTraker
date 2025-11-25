import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPrescriptionsAdmin, addPrescription } from './prescriptionSlice';
import Card from '../../components/Card';
import API from '../../api/api';

const PrescriptionList = () => {
  const dispatch = useDispatch();
  const { list } = useSelector(state => state.prescriptions);
  const [userId, setUserId] = useState('');
  const [medicationId, setMedicationId] = useState('');
  const [dosage, setDosage] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [patients, setPatients] = useState([]);
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    dispatch(fetchPrescriptionsAdmin());

    // Fetch patients & medications for dropdowns
    API.get('/counselor/patients').then(res => setPatients(res.data));
    API.get('/medications').then(res => setMedications(res.data));
  }, [dispatch]);

  const handleAdd = () => {
    if (!userId || !medicationId || !dosage || !startDate || !endDate) return;
    dispatch(addPrescription({ userId, medicationId, dosage, startDate, endDate }));
    setUserId('');
    setMedicationId('');
    setDosage('');
    setStartDate('');
    setEndDate('');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Prescriptions</h1>

      <div className="flex flex-col gap-2 mb-4 max-w-md">
        <select value={userId} onChange={e => setUserId(e.target.value)} className="p-2 border rounded">
          <option value="">Select Patient</option>
          {patients.map(p => <option key={p.id} value={p.id}>{p.clientName}</option>)}
        </select>

        <select value={medicationId} onChange={e => setMedicationId(e.target.value)} className="p-2 border rounded">
          <option value="">Select Medication</option>
          {medications.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
        </select>

        <input type="text" placeholder="Dosage" value={dosage} onChange={e => setDosage(e.target.value)}
          className="p-2 border rounded" />
        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="p-2 border rounded" />
        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="p-2 border rounded" />
        <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Add Prescription</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {list.map(p => (
          <Card key={p.id}>
            <h2 className="font-semibold">{p.Medication.name} - {p.User.clientName}</h2>
            <p>Dosage: {p.dosage}</p>
            <p>From: {p.startDate} To: {p.endDate}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PrescriptionList;
