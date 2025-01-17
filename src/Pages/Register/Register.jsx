import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
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

  const [avatarUploadProgress, setAvatarUploadProgress] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        setAvatarUploadProgress('Uploading...');
        const response = await axios.post(
          'https://api.imgbb.com/1/upload?key=YOUR_IMAGEBB_API_KEY',
          formData
        );
        setFormData({ ...formData, avatar: response.data.data.url });
        setAvatarUploadProgress('Upload Successful');
      } catch (error) {
        console.error('Error uploading avatar:', error);
        setAvatarUploadProgress('Upload Failed');
      }
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const newUser = {
      ...formData,
      role: 'donor',
      status: 'active',
    };

    // Send newUser to the server (API integration)
    console.log('User Registered:', newUser);
    alert('Registration successful!');
    // Reset the form
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
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded">
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
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        {/* Upazila */}
        <div>
          <label className="block font-semibold">Upazila:</label>
          <input
            type="text"
            name="upazila"
            value={formData.upazila}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
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
            className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
