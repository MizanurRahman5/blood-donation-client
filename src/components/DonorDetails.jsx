import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DonorDetails = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [donationRequest, setDonationRequest] = useState(null);

  // Fetch donation request details
  useEffect(() => {
    const fetchDonationRequest = async () => {
      try {
        const response = await fetch(`http://localhost:3000/donation-requests/${id}`);
        const data = await response.json();

        if (response.ok) {
          setDonationRequest(data);
        } else {
          console.error('Failed to fetch donation request details:', data);
        }
      } catch (error) {
        console.error('Error fetching donation request details:', error);
      }
    };

    fetchDonationRequest();
  }, [id]);

  if (!donationRequest) {
    return <div className="text-center mt-12 text-xl">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Donor Details</h1>
        <p><strong>Recipient Name:</strong> {donationRequest.recipientName}</p>
        <p><strong>Blood Group:</strong> {donationRequest.bloodGroup}</p>
        <p><strong>Location:</strong> {donationRequest.recipientDistrict}, {donationRequest.recipientUpazila}</p>
        <p><strong>Donation Date:</strong> {donationRequest.donationDate}</p>
        <p><strong>Status:</strong> {donationRequest.status}</p>
        <p><strong>Donor Email:</strong> {donationRequest.donorEmail}</p>
        <p><strong>Donor Name:</strong> {donationRequest.donorName}</p>
      </div>
    </div>
  );
};

export default DonorDetails;
