import React, { useEffect, useState } from "react";

const AllDonationRequest = () => {
  const [donationRequests, setDonationRequests] = useState([]);
  const [loading, setLoading] = useState(true);
console.log(donationRequests)
  useEffect(() => {
    // Fetch all blood donation requests for the admin
    const fetchDonationRequests = async () => {
      try {
        const response = await fetch('http://localhost:3000/all-donation-requests');
        const data = await response.json();
        setDonationRequests(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch donation requests:", error);
        setLoading(false);
      }
    };

    fetchDonationRequests();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Blood Donation Requests</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {donationRequests.length > 0 ? (
            donationRequests.map((request) => (
              <div key={request._id} className="p-4 bg-white rounded shadow">
                <h2 className="text-lg font-medium">{request.requesterName}</h2>
                <p className="text-sm">{request.requestMessage}</p>
                <p className="text-sm">Blood Group: {request.bloodGroup}</p>
                <p className="text-sm">Location: {request.recipientDistrict}, {request.recipientUpazila}</p>
                <p className="text-sm">Hospital: {request.hospitalName}</p>
                {/* Add manage buttons for admin */}
                <button className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">Manage</button>
              </div>
            ))
          ) : (
            <p>No donation requests found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AllDonationRequest;
