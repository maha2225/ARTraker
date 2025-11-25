import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

import CreatePatient from "./CreatePatient";
import ViewPatients from "../patient/ViewPatients";
import AddPrescription from "./AddPrescription";
import TrackAdherence from "./TrackAdherence";
import ReviewTreatment from "./ReviewTreatment";
import Dashboard from "./Dashboard";

const CounselorPage = () => {
  const location = useLocation();

  // derive active menu from URL
  const activeMenu = location.pathname.split("/")[2] || "dashboard"; // e.g., /counselor/createPatient

  return (
    <div className="flex">
      <Sidebar
        role="counselor"
        activeMenu={activeMenu}
      />

      <main className="flex-1 bg-gray-100 p-6">
        <Routes>
          <Route path="" element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="createPatient" element={<CreatePatient />} />
          <Route path="viewPatients" element={<ViewPatients />} />
          <Route path="addPrescription" element={<AddPrescription />} />
          <Route path="trackAdherence" element={<TrackAdherence />} />
          <Route path="reviewTreatment" element={<ReviewTreatment />} />
        </Routes>
      </main>
    </div>
  );
};

export default CounselorPage;
