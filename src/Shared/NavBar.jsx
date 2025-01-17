import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/14052021-06_generated-removebg-preview.png'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-red-600 text-white">
      <div className="max-w-6xl mx-auto flex justify-between items-center py-4">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <NavLink to="/" className="italic flex items-center">
            <img className='max-w-[80px]' src={logo} alt="" />
            <h3>BloodDonate</h3>
          </NavLink>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex font-semibold space-x-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'text-gray-200' : 'hover:text-gray-200'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? 'text-gray-200' : 'hover:text-gray-200'
            }
          >
            About Us
          </NavLink>
          <NavLink
            to="/search-donors"
            className={({ isActive }) =>
              isActive ? 'text-gray-200' : 'hover:text-gray-200'
            }
          >
            Search Donors
          </NavLink>
          <NavLink
            to="/add-request"
            className={({ isActive }) =>
              isActive ? 'text-gray-200' : 'hover:text-gray-200'
            }
          >
            Add Blood Request
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive ? 'text-gray-200' : 'hover:text-gray-200'
            }
          >
            Register
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? 'text-gray-200' : 'hover:text-gray-200'
            }
          >
            Login
          </NavLink>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none focus:ring-2 focus:ring-gray-300 rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-red-700 text-white">
          <NavLink
            to="/"
            className="block px-4 py-2 hover:bg-red-800"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="block px-4 py-2 hover:bg-red-800"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About Us
          </NavLink>
          <NavLink
            to="/search-donors"
            className="block px-4 py-2 hover:bg-red-800"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Search Donors
          </NavLink>
          <NavLink
            to="/add-request"
            className="block px-4 py-2 hover:bg-red-800"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Add Blood Request
          </NavLink>
          <NavLink
            to="/register"
            className="block px-4 py-2 hover:bg-red-800"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Register
          </NavLink>
          <NavLink
            to="/login"
            className="block px-4 py-2 hover:bg-red-800"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Login
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
