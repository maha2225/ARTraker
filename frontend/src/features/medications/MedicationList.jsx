
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMedications, addMedication } from './medicationSlice';
import Card from '../../components/Card';

const MedicationList = () => {
  const dispatch = useDispatch();
  const { list } = useSelector(state => state.medications);
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');

  useEffect(() => {
    dispatch(fetchMedications());
  }, [dispatch]);

  const handleAdd = () => {
    if (!name || !dosage) return;
    dispatch(addMedication({ name, dosage }));
    setName('');
    setDosage('');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Medications</h1>

      <div className="flex gap-2 mb-4">
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)}
          className="p-2 border rounded flex-1" />
        <input type="text" placeholder="Dosage" value={dosage} onChange={e => setDosage(e.target.value)}
          className="p-2 border rounded flex-1" />
        <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {list.map(med => (
          <Card key={med.id}>
            <h2 className="font-semibold">{med.name}</h2>
            <p>Dosage: {med.dosage}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MedicationList;
