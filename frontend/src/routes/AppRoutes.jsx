import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PatientDetails from "../features/patient/PatientDetails";
import LoginPage from "../features/auth/Login";
import AdminDashboard from "../features/admin/AdminDashboard";
import CounselorPage from "../features/counselor/CounselorPage";

const AppRoutes = () => {
  const { user } = useSelector((state) => state.auth);

  const RequireAuth = ({ children, role }) => {
    if (!user) return <Navigate to="/login" />;
    if (role && user.role !== role) return <Navigate to="/" />;
    return children;
  };

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/counselor/*"
        element={
          <RequireAuth role="counselor">
            <CounselorPage />
          </RequireAuth>
        }
      />

      <Route
        path="/admin/*"
        element={
          <RequireAuth role="admin">
            <AdminDashboard />
          </RequireAuth>
        }
      />

      <Route path="/patients/:id/art-tracker" element={<PatientDetails />} />

      <Route
        path="*"
        element={<Navigate to={user ? `/${user.role}` : "/login"} />}
      />
    </Routes>
  );
};

export default AppRoutes;
