import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'; // SweetAlert2 ইনপোর্ট করো

const EditDonationRequestForm = () => {
  const [donationRequest, setDonationRequest] = useState({
    recipientName: '',
    recipientDistrict: '',
    recipientUpazila: '',
    donationDate: '',
    donationTime: '',
    bloodGroup: '',
    status: '',
  });
  const { id } = useParams(); // Get the donation request ID from the URL
  const navigate = useNavigate();

  const fetchDonationRequest = async () => {
    try {
      const response = await fetch(`https://blood-donation-server-site-opal.vercel.app/donation-requests/${id}`);
      const data = await response.json();
      console.log(data); // Check the response data
      if (response.ok) {
        setDonationRequest(data);  // Set fetched data as default values
      } else {
        console.error('Failed to fetch donation request:', data);
      }
    } catch (error) {
      console.error('Error fetching donation request:', error);
    }
  };

  useEffect(() => {
    fetchDonationRequest();
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonationRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://blood-donation-server-site-opal.vercel.app/donation-requests/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donationRequest),
      });
  
      const data = await response.json();
      console.log(data);  // Log the response to see if it contains updated data
  
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Donation Request Updated',
          text: 'The donation request has been updated successfully.',
        });
        navigate('/dashboard'); // Redirect to dashboard after successful update
      } else {
        console.error('Failed to update donation request');
      }
    } catch (error) {
      console.error('Error updating donation request:', error);
    }
  };

  // Handle donation request deletion
  const handleDelete = async () => {
    try {
      const response = await fetch(`https://blood-donation-server-site-opal.vercel.app/donation-requests/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Donation Request Deleted',
          text: 'The donation request has been deleted successfully.',
        });
        navigate('/dashboard'); // Redirect to dashboard after successful delete
      } else {
        console.error('Failed to delete donation request');
      }
    } catch (error) {
      console.error('Error deleting donation request:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center mb-6">Edit Donation Request</h2>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label htmlFor="recipientName" className="block text-sm font-semibold text-gray-700">Recipient Name</label>
          <input
            type="text"
            id="recipientName"
            name="recipientName"
            value={donationRequest.recipientName}  // Default value
            onChange={handleChange}
            className="w-full mt-2 p-3 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="recipientDistrict" className="block text-sm font-semibold text-gray-700">Recipient District</label>
          <input
            type="text"
            id="recipientDistrict"
            name="recipientDistrict"
            value={donationRequest.recipientDistrict}  // Default value
            onChange={handleChange}
            className="w-full mt-2 p-3 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="recipientUpazila" className="block text-sm font-semibold text-gray-700">Recipient Upazila</label>
          <input
            type="text"
            id="recipientUpazila"
            name="recipientUpazila"
            value={donationRequest.recipientUpazila}  // Default value
            onChange={handleChange}
            className="w-full mt-2 p-3 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="donationDate" className="block text-sm font-semibold text-gray-700">Donation Date</label>
          <input
            type="date"
            id="donationDate"
            name="donationDate"
            value={donationRequest.donationDate}  // Default value
            onChange={handleChange}
            className="w-full mt-2 p-3 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="donationTime" className="block text-sm font-semibold text-gray-700">Donation Time</label>
          <input
            type="time"
            id="donationTime"
            name="donationTime"
            value={donationRequest.donationTime}  // Default value
            onChange={handleChange}
            className="w-full mt-2 p-3 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="bloodGroup" className="block text-sm font-semibold text-gray-700">Blood Group</label>
          <select
            id="bloodGroup"
            name="bloodGroup"
            value={donationRequest.bloodGroup}  // Default value
            onChange={handleChange}
            className="w-full mt-2 p-3 border border-gray-300 rounded"
          >
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

        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-semibold text-gray-700">Status</label>
          <select
            id="status"
            name="status"
            value={donationRequest.status}  // Default value
            onChange={handleChange}
            className="w-full mt-2 p-3 border border-gray-300 rounded"
          >
            <option value="pending">Pending</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>

        <div className="text-center">
          <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md mr-4">
            Update Request
          </button>
          <button type="button" onClick={handleDelete} className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md">
            Delete Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDonationRequestForm;
