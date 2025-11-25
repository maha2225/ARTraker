import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from '../../components/Sidebar';

import ManageCounselors from './ManageCounselors';
import AdherenceReports from './AdherenceReports';
import ViewPatients from '../patient/ViewPatients';
import OtherTasks from './OtherTasks';

const AdminDashboard = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role={user?.role} />

      <main className="flex-1 p-6 overflow-auto">
        <Routes>
          <Route path="/" element={<ManageCounselors />} />
          <Route path="viewPatients" element={<ViewPatients />} />
          <Route path="adherenceReports" element={<AdherenceReports />} />
          <Route path="otherTasks" element={<OtherTasks />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
