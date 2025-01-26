import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContex } from '../../Provider/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Helmet} from "react-helmet";

const imag_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${imag_hosting_key}`;


const locationData = {
  Dhaka: ['Dhanmondi', 'Uttara', 'Gulshan', 'Mirpur'],
  Chittagong: ['Pahartali', 'Kotwali', 'Halishahar', 'Sitakunda'],
  Sylhet: ['Sylhet Sadar', 'Beanibazar', 'Golapganj'],
  Rajshahi: ['Rajshahi Sadar', 'Puthia', 'Godagari'],
  Khulna: ['Khulna Sadar', 'Dumuria', 'Batiaghata'],
  Barishal: ['Barishal Sadar', 'Banaripara', 'Uzirpur'],
  Rangpur: ['Rangpur Sadar', 'Pirganj', 'Badarganj'],
  Mymensingh: ['Mymensingh Sadar', 'Trishal', 'Fulbaria'],
};

const Register = () => {
  const { createUser, setUser } = useContext(AuthContex);

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    avatar: '',
    bloodGroup: 'A+',
    district: '',
    upazila: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [avatarUploadProgress, setAvatarUploadProgress] = useState(null);

  // Toast Messages
  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle avatar upload
  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formDataImage = new FormData();
      formDataImage.append('image', file);

      try {
        setAvatarUploadProgress('Uploading...');
        const response = await axios.post(image_hosting_api, formDataImage);
        setFormData({ ...formData, avatar: response.data.data.url });
        setAvatarUploadProgress('Upload Successful');
      } catch (error) {
        console.error('Error uploading avatar:', error);
        setAvatarUploadProgress('Upload Failed');
      }
    }
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validate password
    if (formData.password !== formData.confirmPassword) {
      notifyError('Passwords do not match!');
      return;
    }

    // Validate required fields
    if (
      !formData.email ||
      !formData.name ||
      !formData.district ||
      !formData.upazila ||
      !formData.password
    ) {
      notifyError('Please fill out all required fields!');
      return;
    }

    try {
      setLoading(true);

      // Firebase user creation
      await createUser(formData.email, formData.password);

      const newUser = {
        email: formData.email,
        name: formData.name,
        avatar: formData.avatar,
        bloodGroup: formData.bloodGroup,
        district: formData.district,
        upazila: formData.upazila,
        role: 'donor',
        status: 'active',
      };

      // Set user in AuthContext
      setUser(newUser);

      // Send user data to the backend
      fetch('http://localhost:3000/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      
      

      notifySuccess('Registration successful!');

      // Reset form
      setFormData({
        email: '',
        name: '',
        avatar: '',
        bloodGroup: 'A+',
        district: '',
        upazila: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.error('Error registering user:', error.message);
      notifyError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Filter upazilas based on selected district
  const filteredUpazilas = formData.district
    ? locationData[formData.district]
    : [];

  return (
    <>
      <ToastContainer />
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded">
      <Helmet>
                <meta charSet="utf-8" />
                <title>Register - BloodDonate</title>
            </Helmet>
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block font-semibold">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>

          {/* Name */}
          <div>
            <label className="block font-semibold">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>

          {/* Avatar */}
          <div>
            <label className="block font-semibold">Avatar:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="w-full px-4 py-2 border rounded"
            />
            {avatarUploadProgress && (
              <p className="text-sm mt-2">{avatarUploadProgress}</p>
            )}
            {formData.avatar && (
              <img
                src={formData.avatar}
                alt="Avatar Preview"
                className="w-16 h-16 rounded-full mt-2"
              />
            )}
          </div>

          {/* Blood Group */}
          <div>
            <label className="block font-semibold">Blood Group:</label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
            >
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>O+</option>
              <option>O-</option>
            </select>
          </div>

          {/* District */}
          <div>
            <label className="block font-semibold">District:</label>
            <select
              name="district"
              value={formData.district}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
              required
            >
              <option value="">Select District</option>
              {Object.keys(locationData).map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>

          {/* Upazila */}
          <div>
            <label className="block font-semibold">Upazila:</label>
            <select
              name="upazila"
              value={formData.upazila}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
              required
            >
              <option value="">Select Upazila</option>
              {filteredUpazilas.map((upazila) => (
                <option key={upazila} value={upazila}>
                  {upazila}
                </option>
              ))}
            </select>
          </div>

          {/* Password */}
          <div>
            <label className="block font-semibold">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block font-semibold">Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white px-4 py-2 rounded ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
