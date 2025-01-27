import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContex } from "../../Provider/AuthProvider";
import { Helmet } from "react-helmet";

const DonationRequestDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(AuthContex);
  const [requestDetails, setRequestDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          `https://blood-donation-server-site-opal.vercel.app/donation-requests/${id}`
        );
        setRequestDetails(response.data);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };
    fetchDetails();
  }, [id]);

  const handleConfirmDonation = async () => {
    try {
      await axios.put(`https://blood-donation-server-site-opal.vercel.app/donation-requests/${id}`, {
        status: "inprogress",
        donorName: user?.name || "Guest User",
        donorEmail: user?.email || "guest@example.com",
      });
      alert("Donation confirmed successfully!");
      setIsModalOpen(false);
      navigate("/donation-requests");
    } catch (error) {
      console.error("Error confirming donation:", error);
    }
  };

  if (!requestDetails) return <div>Loading...</div>;

  return (
    <div className="max-w-6xl min-h-[600px] mx-auto p-6 bg-red-50">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Details - BloodDonate</title>
      </Helmet>
      <h1 className="text-3xl font-bold text-red-700 mb-6 text-center">
        Donation Request Details
      </h1>

      <div className="bg-red-100 p-6 rounded-lg shadow-md">
        <p className="text-xl text-red-800 mb-2">
          <strong>Recipient Name:</strong> {requestDetails.recipientName}
        </p>
        <p className="text-lg text-red-800 mb-2">
          <strong>Blood Group:</strong> {requestDetails.bloodGroup}
        </p>
        <p className="text-lg text-red-800 mb-2">
          <strong>Location:</strong> {requestDetails.recipientDistrict},{" "}
          {requestDetails.recipientUpazila}
        </p>
        <p className="text-lg text-red-800 mb-2">
          <strong>Hospital:</strong> {requestDetails.hospitalName}
        </p>
        <p className="text-lg text-red-800 mb-2">
          <strong>Address:</strong> {requestDetails.fullAddress}
        </p>
        <p className="text-lg text-red-800 mb-2">
          <strong>Date & Time:</strong> {requestDetails.donationDate} at{" "}
          {requestDetails.donationTime}
        </p>
        <p className="text-lg text-red-800 mb-2">
          <strong>Message:</strong> {requestDetails.requestMessage}
        </p>
      </div>

      <button
        className="mt-6 bg-red-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-700 transition"
        onClick={() => setIsModalOpen(true)}
      >
        Donate Now
      </button>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false); // Close modal on background click
          }}
        >
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold text-red-600 mb-6">
              Confirm Your Donation
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleConfirmDonation();
              }}
            >
              <div className="mb-4">
                <label className="block font-medium text-red-600">
                  Donor Name
                </label>
                <input
                  type="text"
                  value={user?.name || "Guest User"}
                  readOnly
                  className="w-full border p-3 rounded bg-gray-100 text-red-700"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium text-red-600">
                  Donor Email
                </label>
                <input
                  type="email"
                  value={user?.email || "guest@example.com"}
                  readOnly
                  className="w-full border p-3 rounded bg-gray-100 text-red-700"
                />
              </div>
              <button
                type="submit"
                className="bg-red-600 text-white px-6 py-3 rounded-full w-full hover:bg-red-700 transition"
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
