import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import {Helmet} from "react-helmet";

const AdminDashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Helmet>
                <meta charSet="utf-8" />
                <title>Admin Dashboard - BloodDonate</title>
            </Helmet>
      {/* Sidebar */}
      <div className="w-64 bg-red-600 text-white flex flex-col min-h-screen">
        {/* Header Section */}
        <div className="p-6 text-2xl font-extrabold text-center border-b border-red-700">
          Admin Dashboard
        </div>

        {/* Navigation Links Section */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-4 px-6 pt-4">
            {/* Home Menu - 1st Home */}
            <li>
              <NavLink
                to="/admin-dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "bg-red-700 p-3 rounded-md shadow-lg block"
                    : "hover:bg-red-500 p-3 rounded-md block transition duration-300"
                }
              >
                Dashboard Home
              </NavLink>
            </li>

            {/* All Users Menu */}
            <li>
              <NavLink
                to="/admin-dashboard/all-users"
                className={({ isActive }) =>
                  isActive
                    ? "bg-red-700 p-3 rounded-md shadow-lg block"
                    : "hover:bg-red-500 p-3 rounded-md block transition duration-300"
                }
              >
                All Users
              </NavLink>
            </li>

            {/* Blood Donation Requests */}
            <li>
              <NavLink
                to="/admin-dashboard/all-blood-donation-requests"
                className={({ isActive }) =>
                  isActive
                    ? "bg-red-700 p-3 rounded-md shadow-lg block"
                    : "hover:bg-red-500 p-3 rounded-md block transition duration-300"
                }
              >
                Blood Donation Requests
              </NavLink>
            </li>

            {/* Content Management */}
            <li>
              <NavLink
                to="/admin-dashboard/content-management"
                className={({ isActive }) =>
                  isActive
                    ? "bg-red-700 p-3 rounded-md shadow-lg block"
                    : "hover:bg-red-500 p-3 rounded-md block transition duration-300"
                }
              >
                Content Management
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

      {/* Main Content Section */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboardLayout;
