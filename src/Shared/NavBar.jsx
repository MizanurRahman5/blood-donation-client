import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/14052021-06_generated-removebg-preview.png";
import { AuthContex } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContex); // AuthContext থেকে user এবং logOut ফাংশন
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    avatar: "",
    district: "",
    upazila: "",
    bloodGroup: "",
    role: "user", // Default role
  });

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.email) {
        console.error("No email found for the user.");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3000/user?email=${user.email}`
        );
        const data = await response.json();

        if (response.ok) {
          setProfileData({
            name: data.name,
            email: data.email,
            avatar: data.avatar,
            district: data.district,
            upazila: data.upazila,
            bloodGroup: data.bloodGroup,
            role: data.role || "user", // Default role is 'user' if not provided
          });
        } else {
          console.error("Failed to fetch user data:", data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUserData();
  }, [user]);

  const handleLogout = () => {
    logOut()
      .then(() => {
        // Logout সফল হলে SweetAlert দেখানো হবে
        Swal.fire({
          icon: "success",
          title: "Logged Out!",
          text: "You have successfully logged out.",
          showConfirmButton: false,
          timer: 2000, 
        });
      })
      .catch((error) => {
        
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: `Logout failed: ${error.message}`,
        });
      });
  };

  return (
    <nav className="sticky top-0 z-50 bg-red-600 text-white">
      <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-4 md:px-8">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <NavLink to="/" className="italic flex items-center">
            <img className="max-w-[80px]" src={logo} alt="BloodDonate Logo" />
            <h3>BloodDonate</h3>
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="block md:hidden text-white focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5M3.75 12h16.5M3.75 18.75h16.5"
            />
          </svg>
        </button>

        {/* Links */}
        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } md:flex font-semibold space-y-4 md:space-y-0 md:space-x-8 absolute md:static left-0 top-[70px] w-full md:w-auto bg-red-600 md:bg-transparent py-4 md:py-0 px-6 md:px-0`}
        >
          <NavLink
            to="/donation-requests"
            className={({ isActive }) =>
              isActive ? "text-gray-200" : "hover:text-gray-200"
            }
          >
            Donation Requests
          </NavLink>
          <NavLink
            to="/blog"
            className={({ isActive }) =>
              isActive ? "text-gray-200" : "hover:text-gray-200"
            }
          >
            Blog
          </NavLink>
          <NavLink
            to="/search"
            className={({ isActive }) =>
              isActive ? "text-gray-200" : "hover:text-gray-200"
            }
          >
            Search Donors
          </NavLink>
          {!user ? (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "text-gray-200" : "hover:text-gray-200"
              }
            >
              Login
            </NavLink>
          ) : (
            <div className="relative">
              {/* User Avatar with Dropdown */}
              <button
                className="flex items-center space-x-2"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <img
                  src={profileData.avatar || "https://via.placeholder.com/32"}
                  alt="User Avatar"
                  className="w-8 h-8 border border-red-500 rounded-full"
                />
                <span>{profileData.name || "Profile"}</span>
              </button>
              {/* Dropdown */}
              <div
                className={`absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-md ${
                  isDropdownOpen ? "block" : "hidden"
                }`}
              >
                <NavLink
                  to={
                    profileData.role === "admin"
                      ? "/admin-dashboard"
                      : profileData.role === "volunteer"
                      ? "/volunteer-dashboard"
                      : "/dashboard"
                  }
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Dashboard
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
