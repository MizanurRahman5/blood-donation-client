import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const PendingDonationRequests = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/pending-donation-requests")
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch((error) => console.error("Error fetching requests:", error));
  }, []);

  return (
    <div className="max-w-6xl min-h-[500px] mx-auto p-6">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Blood Request - BloodDonate</title>
      </Helmet>
      <h2 className="text-3xl font-semibold text-white text-center mb-6">
        Pending Donation Requests
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {requests.map((request) => (
          <div
            key={request._id}
            className="bg-white shadow-lg rounded-xl p-6 transition-transform transform hover:scale-105 hover:shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-red-600">
              {request.recipientName}
            </h3>
            <p className="text-lg text-gray-700 mt-2">
              <strong>Location:</strong> {request.recipientDistrict},{" "}
              {request.recipientUpazila}
            </p>
            <p className="text-lg text-gray-700">
              <strong>Blood Group:</strong> {request.bloodGroup}
            </p>
            <p className="text-lg text-gray-700">
              <strong>Date:</strong> {request.donationDate}
            </p>
            <p className="text-lg text-gray-700">
              <strong>Time:</strong> {request.donationTime}
            </p>
            <button
              className="mt-4 w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
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
