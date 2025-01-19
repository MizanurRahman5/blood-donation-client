import React, { useContext, useEffect, useState } from "react";
import { AuthContex } from "../Provider/AuthProvider";

const MyDonationRequests = () => {
  const { user } = useContext(AuthContex);
  console.log(user);

  const [donationRequests, setDonationRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const requestsPerPage = 5; // Pagination: Number of requests per page

  // Fetch data
  useEffect(() => {
    if (!user || !user.email) {
      console.log("No user logged in");
      return; // If no user is logged in, exit the function
    }

    const fetchDonationRequests = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/donation-requests?email=${user.email}` // Use user's email dynamically
        );
        const data = await response.json();
        setDonationRequests(data);
        setFilteredRequests(data);
      } catch (error) {
        console.error("Error fetching donation requests:", error);
      }
    };

    fetchDonationRequests();
  }, [user]); // Add 'user' as a dependency

  // Handle Filter Change
  const handleFilterChange = (e) => {
    const selectedStatus = e.target.value;
    setStatusFilter(selectedStatus);

    if (selectedStatus === "all") {
      setFilteredRequests(donationRequests);
    } else {
      const filtered = donationRequests.filter(
        (request) => request.status === selectedStatus
      );
      setFilteredRequests(filtered);
    }

    setCurrentPage(1); // Reset to first page
  };

  // Pagination Logic
  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = filteredRequests.slice(
    indexOfFirstRequest,
    indexOfLastRequest
  );

  const totalPages = Math.ceil(filteredRequests.length / requestsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">My Donation Requests</h1>

      {/* Filter Section */}
      <div className="mb-4">
        <label className="mr-2 text-gray-700 font-medium">Filter by Status:</label>
        <select
          value={statusFilter}
          onChange={handleFilterChange}
          className="px-4 py-2 border rounded"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {/* Donation Requests Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b">Recipient Name</th>
              <th className="px-6 py-3 border-b">District</th>
              <th className="px-6 py-3 border-b">Blood Group</th>
              <th className="px-6 py-3 border-b">Date</th>
              <th className="px-6 py-3 border-b">Time</th>
              <th className="px-6 py-3 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentRequests.map((request, index) => (
              <tr key={index}>
                <td className="px-6 py-3 border-b">{request.recipientName}</td>
                <td className="px-6 py-3 border-b">{request.recipientDistrict}</td>
                <td className="px-6 py-3 border-b">{request.bloodGroup}</td>
                <td className="px-6 py-3 border-b">{request.donationDate}</td>
                <td className="px-6 py-3 border-b">{request.donationTime}</td>
                <td className="px-6 py-3 border-b">{request.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`px-4 py-2 border rounded ${
              currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-white"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MyDonationRequests;
