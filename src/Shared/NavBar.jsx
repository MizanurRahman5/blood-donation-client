import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/14052021-06_generated-removebg-preview.png";
import { AuthContex } from "../Provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContex); // AuthContext থেকে user এবং logOut ফাংশন
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    avatar: "",
    district: "",
    upazila: "",
    bloodGroup: "",
    role: "user", // Default role
  });

  console.log(profileData.role);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.email) {
        console.error("No email found for the user.");
        return;
      }

      try {
        // API call with email to get data for the logged-in user
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
        console.log("User logged out successfully");
      })
      .catch((error) => {
        console.error("Logout Error:", error.message);
      });
  };

  return (
    <nav className="sticky top-0 z-50 bg-red-600 text-white">
      <div className="max-w-6xl mx-auto flex justify-between items-center py-4">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <NavLink to="/" className="italic flex items-center">
            <img className="max-w-[80px]" src={logo} alt="BloodDonate Logo" />
            <h3>BloodDonate</h3>
          </NavLink>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex font-semibold space-x-8">
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
            <>
              <NavLink
                to="/funding"
                className={({ isActive }) =>
                  isActive ? "text-gray-200" : "hover:text-gray-200"
                }
              >
                Funding
              </NavLink>
              {/* User Avatar with Dropdown */}
              <div className="relative group">
                <div className="cursor-pointer flex items-center">
                  <img
                    src={profileData.avatar || "https://via.placeholder.com/32"}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="ml-2">{profileData.name || "Profile"}</span>
                </div>
                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-md opacity-0 group-hover:opacity-100">
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
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
