import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContex } from '../../Provider/AuthProvider';

const DonationRequestDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Corrected from `_id` to `id`
  const { user } = useContext(AuthContex);
  const [requestDetails, setRequestDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
console.log(user)
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/donation-requests/${id}`);
        setRequestDetails(response.data);
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };
    fetchDetails();
  }, [id]);

  const handleConfirmDonation = async () => {
    try {
      await axios.patch(`http://localhost:3000/donation-requests/${id}`, { status: 'inprogress' });
      alert('Donation confirmed successfully!');
      setIsModalOpen(false);
      navigate('/donation-requests'); // Redirect to requests page
    } catch (error) {
      console.error('Error confirming donation:', error);
    }
  };

  if (!requestDetails) return <div>Loading...</div>;

  return (
    <div className="container min-h-screen mx-auto p-6">
      <h1 className="text-2xl font-bold">Donation Request Details</h1>
      <div className="mt-4">
        <p><strong>Recipient Name:</strong> {requestDetails.recipientName}</p>
        <p><strong>Blood Group:</strong> {requestDetails.bloodGroup}</p>
        <p><strong>Location:</strong> {requestDetails.location}</p>
        <p><strong>Date & Time:</strong> {requestDetails.date} at {requestDetails.time}</p>
        <p><strong>Message:</strong> {requestDetails.message}</p>
      </div>
      <button
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => setIsModalOpen(true)}
      >
        Donate
      </button>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false); // Close modal on background click
          }}
        >
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Confirm Donation</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleConfirmDonation(); }}>
              <div className="mb-4">
                <label className="block font-medium">Donor Name</label>
                <input
                  type="text"
                  value={user?.name || 'Guest User'}
                  readOnly
                  className="w-full border p-2 rounded bg-gray-100"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium">Donor Email</label>
                <input
                  type="email"
                  value={user?.email || 'guest@example.com'}
                  readOnly
                  className="w-full border p-2 rounded bg-gray-100"
                />
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded w-full"
              >
                Confirm Donation
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationRequestDetails;
