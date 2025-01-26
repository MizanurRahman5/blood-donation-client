import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-red-600 text-white flex flex-col min-h-screen">
      {/* Header Section */}
      <div className="p-6 text-2xl font-extrabold text-center border-b border-red-700">
        BloodDonate Dashboard
      </div>

      {/* Navigation Links Section */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-4 px-6 pt-4">
          {/* Dashboard Menu */}
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "bg-red-700 p-3 rounded-md shadow-lg block"
                  : "hover:bg-red-500 p-3 rounded-md block transition duration-300"
              }
            >
              Dashboard Home
            </NavLink>
          </li>

          {/* Profile Menu */}
          <li>
            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) =>
                isActive
                  ? "bg-red-700 p-3 rounded-md shadow-lg block"
                  : "hover:bg-red-500 p-3 rounded-md block transition duration-300"
              }
            >
              Profile
            </NavLink>
          </li>

          {/* My Donation Requests */}
          <li>
            <NavLink
              to="/dashboard/my-donation-requests"
              className={({ isActive }) =>
                isActive
                  ? "bg-red-700 p-3 rounded-md shadow-lg block"
                  : "hover:bg-red-500 p-3 rounded-md block transition duration-300"
              }
            >
              My Donation Requests
            </NavLink>
          </li>

          {/* Create Donation Request */}
          <li>
            <NavLink
              to="/dashboard/create-donation-request"
              className={({ isActive }) =>
                isActive
                  ? "bg-red-700 p-3 rounded-md shadow-lg block"
                  : "hover:bg-red-500 p-3 rounded-md block transition duration-300"
              }
            >
              Create Donation Request
            </NavLink>
          </li>
          {/* Divider */}
          <hr className="my-4 border-red-700" />

          {/* Home Menu - 2nd Home */}
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "bg-red-700 p-3 rounded-md shadow-lg block"
                  : "hover:bg-red-500 p-3 rounded-md block transition duration-300"
              }
            >
              Home
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
