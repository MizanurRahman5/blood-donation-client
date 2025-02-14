import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2
import { AuthContex } from "../Provider/AuthProvider"; // Assuming AuthContext is providing user data

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

const CreateDonationRequest = () => {
  const { user } = useContext(AuthContex); // Get user data from context
  const [formData, setFormData] = useState({
    recipientName: "",
    recipientDistrict: "",
    recipientUpazila: "",
    hospitalName: "",
    fullAddress: "",
    bloodGroup: "",
    donationDate: "",
    donationTime: "",
    requestMessage: "",
  });
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    avatar: '',
    district: '',
    upazila: '',
    bloodGroup: '',
  });
  const [upazilas, setUpazilas] = useState([]);
  const navigate = useNavigate();

  // Check if user is blocked
  const isBlocked = user?.status === "blocked";

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.email) {
        console.error('No email found for the user.');
        return;
      }

      try {
        // API call with email to get data for the logged-in user only
        const response = await fetch(`https://blood-donation-server-site-opal.vercel.app/user?email=${user.email}`);
        const data = await response.json();

        if (response.ok) {
          setProfileData(data); // Set profile data if successful
        } else {
          console.error('Failed to fetch user data:', data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserData(); // Fetch user data if email exists
  }, [user]); // Dependency array, will run whenever `user` changes

  useEffect(() => {
    if (formData.recipientDistrict) {
      setUpazilas(locationData[formData.recipientDistrict] || []);
    } else {
      setUpazilas([]);
    }
  }, [formData.recipientDistrict]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Blocked user check
    if (isBlocked) {
      alert("You are blocked and cannot create donation requests.");
      return;
    }

    // Collect data from formData
    const donationRequest = {
      requesterName: profileData?.name || "Unknown User", // Logged-in user's name
      requesterEmail: profileData?.email || "unknown@example.com", // Logged-in user's email
      recipientName: formData.recipientName,
      recipientDistrict: formData.recipientDistrict,
      recipientUpazila: formData.recipientUpazila,
      hospitalName: formData.hospitalName,
      fullAddress: formData.fullAddress,
      bloodGroup: formData.bloodGroup,
      donationDate: formData.donationDate,
      donationTime: formData.donationTime,
      requestMessage: formData.requestMessage,
      status: "pending", // Default status
    };

    // Check if any field is empty
    for (let key in donationRequest) {
      if (!donationRequest[key]) {
        alert(`Please fill all fields. Missing: ${key}`);
        return;
      }
    }

    // API call
    try {
      const response = await fetch("https://blood-donation-server-site-opal.vercel.app/donation-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donationRequest),
      });

      const result = await response.json();
      if (response.ok) {
        // SweetAlert success
        Swal.fire({
          title: 'Success!',
          text: 'Donation request created successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          navigate("/dashboard"); // Redirecting to dashboard after success
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: result.message || 'Failed to create donation request.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      console.error("Error while creating donation request:", error);
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong, please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Create Donation Request</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        {/* Requester Information */}
        <div className="mb-4">
          <label className="block text-gray-700">Requester Name</label>
          <input
            type="text"
            value={profileData?.name || ""}
            readOnly
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Requester Email</label>
          <input
            type="email"
            value={profileData?.email || ""}
            readOnly
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        {/* Recipient Information */}
        <div className="mb-4">
          <label className="block text-gray-700">Recipient Name</label>
          <input
            type="text"
            name="recipientName"
            value={formData.recipientName}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Recipient District</label>
          <select
            name="recipientDistrict"
            value={formData.recipientDistrict}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded"
          >
            <option value="">Select District</option>
            {Object.keys(locationData).map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Recipient Upazila</label>
          <select
            name="recipientUpazila"
            value={formData.recipientUpazila}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded"
          >
            <option value="">Select Upazila</option>
            {upazilas.map((upazila) => (
              <option key={upazila} value={upazila}>
                {upazila}
              </option>
            ))}
          </select>
        </div>

        {/* Hospital and Address */}
        <div className="mb-4">
          <label className="block text-gray-700">Hospital Name</label>
          <input
            type="text"
            name="hospitalName"
            value={formData.hospitalName}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Full Address Line</label>
          <input
            type="text"
            name="fullAddress"
            value={formData.fullAddress}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        {/* Blood Group */}
        <div className="mb-4">
          <label className="block text-gray-700">Blood Group</label>
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded"
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        {/* Donation Date and Time */}
        <div className="mb-4">
          <label className="block text-gray-700">Donation Date</label>
          <input
            type="date"
            name="donationDate"
            value={formData.donationDate}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Donation Time</label>
          <input
            type="time"
            name="donationTime"
            value={formData.donationTime}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        {/* Request Message */}
        <div className="mb-6">
          <label className="block text-gray-700">Request Message</label>
          <textarea
            name="requestMessage"
            value={formData.requestMessage}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded w-full"
        >
          Create Request
        </button>
      </form>
    </div>
  );
};

export default CreateDonationRequest;
