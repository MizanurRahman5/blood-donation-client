import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/14052021-06_generated-removebg-preview.png'

const Footer = () => {
  return (
    <footer className="bg-red-600 text-white py-10 relative">
      {/* Top Zigzag Decoration */}
      <div className="absolute top-0 left-0 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="text-red-500 fill-current"
        >
          <path
            fillOpacity="1"
            d="M0,32L48,53.3C96,75,192,117,288,133.3C384,149,480,139,576,117.3C672,96,768,64,864,53.3C960,43,1056,53,1152,80C1248,107,1344,149,1392,170.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section */}
        <div>
          <div className="text-2xl font-bold">
                    <NavLink to="/" className="italic flex items-center">
                      <img className='max-w-[80px]' src={logo} alt="" />
                      <h3>BloodDonate</h3>
                    </NavLink>
                  </div>
          <p className="text-sm">
            Rokto is an automated blood service that connects blood searchers
            with voluntary donors in a moment through SMS and website.
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-white hover:text-gray-300">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
          <p className="text-sm mt-4">
            <a href="#" className="underline hover:text-gray-300">Terms & Conditions</a> |{' '}
            <a href="#" className="underline hover:text-gray-300">Privacy Policy</a>
          </p>
        </div>

        {/* Middle Section */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Important Links</h3>
          <ul className="text-sm space-y-2">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">Add Blood Request</a></li>
            <li><a href="#" className="hover:underline">Search Blood Donors in Bangladesh</a></li>
            <li><a href="#" className="hover:underline">Frequently Asked Questions (FAQs)</a></li>
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Contact Us</a></li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <h3 className="text-2xl font-bold mb-4">About Blood</h3>
          <ul className="text-sm space-y-2">
            <li><a href="#" className="hover:underline">What is blood?</a></li>
            <li><a href="#" className="hover:underline">What is blood donation?</a></li>
            <li><a href="#" className="hover:underline">Who can donate blood?</a></li>
            <li><a href="#" className="hover:underline">How often can I donate blood?</a></li>
            <li><a href="#" className="hover:underline">Different Blood Terms</a></li>
            <li><a href="#" className="hover:underline">Different Blood Groups</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-gray-800 text-gray-300 text-center text-sm py-4 mt-10">
        <p>
          Copyright © Codist 2015 - Present | Made with <span className="text-red-500">&lt;3</span> by Codist
        </p>
        <p>DMCA Protected</p>
      </div>
    </footer>
  );
};

export default Footer;
