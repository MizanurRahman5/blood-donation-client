import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PendingDonationRequests = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/pending-donation-requests')
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch((error) => console.error('Error fetching requests:', error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Pending Donation Requests</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {requests.map((request) => (
          <div key={request._id} className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-xl font-bold">{request.recipientName}</h3>
            <p>Location: {request.recipientDistrict}, {request.recipientUpazila}</p>
            <p>Blood Group: {request.bloodGroup}</p>
            <p>Date: {request.donationDate}</p>
            <p>Time: {request.donationTime}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => navigate(`/donation-requests/${request._id}`)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingDonationRequests;
