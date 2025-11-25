import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home, UserPlus, Users, FilePlus, ClipboardList, CheckSquare,
  Settings, BarChart2, Box, X
} from "lucide-react";
import { useSidebar } from "./SidebarContext"; // import the hook

const Sidebar = ({ role }) => {
  const location = useLocation();
  const { open, setOpen } = useSidebar(); // access context state

  const menus = {
    counselor: [
      { path: "/counselor", label: "Dashboard", icon: <Home size={18} /> },
      { path: "/counselor/createPatient", label: "Create Patient", icon: <UserPlus size={18} /> },
      { path: "/counselor/viewPatients", label: "View Patients", icon: <Users size={18} /> },
      { path: "/counselor/addPrescription", label: "Add Prescription", icon: <FilePlus size={18} /> },
      { path: "/counselor/trackAdherence", label: "Track Adherence", icon: <ClipboardList size={18} /> },
      { path: "/counselor/reviewTreatment", label: "Review Treatment", icon: <CheckSquare size={18} /> },
    ],
    admin: [
      { path: "/admin", label: "Manage Counselors", icon: <Settings size={18} /> },
      { path: "/admin/viewPatients", label: "View Patients", icon: <Users size={18} /> },
      { path: "/admin/adherenceReports", label: "Adherence Reports", icon: <BarChart2 size={18} /> },
      { path: "/admin/otherTasks", label: "Other Tasks", icon: <Box size={18} /> },
    ],
  };

  const menuItems = menus[role] || [];
  const bgColor = "bg-teal-700";
  const activeColor = "bg-blue-800";

  return (
    <>
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 ${bgColor} text-white shadow-lg p-4 flex flex-col
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static
          z-50
        `}
      >
        <button
          className="lg:hidden absolute top-4 right-4"
          onClick={() => setOpen(false)}
        >
          <X size={24} />
        </button>

        <ul className="flex flex-col gap-3 mt-10 lg:mt-0">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li
                key={item.path}
                onClick={() => setOpen(false)} // closes drawer on mobile
                className={`p-3 rounded cursor-pointer transition-all duration-300 flex items-center gap-3 ${
                  isActive ? activeColor : "hover:bg-teal-600"
                }`}
              >
                <Link to={item.path} className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>

      {open && (
        <div
          className="absolute inset-0 bg-gray-500 bg-opacity-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
