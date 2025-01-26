import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContex } from '../Provider/AuthProvider';

const DashboardHome = () => {
  const { user } = useContext(AuthContex); // Get user data from AuthContext
  const [donationRequests, setDonationRequests] = useState([]);
  const [showRequests, setShowRequests] = useState(false);
  const navigate = useNavigate();
  // Fetch donation requests
  useEffect(() => {
    if (!user || !user.email) return; // If user or user.email is not available, stop execution

    const fetchDonationRequests = async () => {
      try {
        const response = await fetch(`http://localhost:3000/donation-requests?email=${user.email}`);
        const data = await response.json();

        if (response.ok) {
          setDonationRequests(data); // Set donation requests
          setShowRequests(data.length > 0); // Show requests section if there are any
        } else {
          console.error('Failed to fetch donation requests:', data);
        }
      } catch (error) {
        console.error('Error fetching donation requests:', error);
      }
    };

    fetchDonationRequests();
  }, [user]);

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/donation-requests/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the deleted request from the state
        setDonationRequests(donationRequests.filter((request) => request._id !== id));
        alert('Donation request deleted successfully');
      } else {
        console.error('Failed to delete donation request');
      }
    } catch (error) {
      console.error('Error deleting donation request:', error);
    }
  };

  // Handle updating donation status
  const handleStatusChange = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:3000/donation-requests/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        // Update the donation request status in the state
        const updatedRequests = donationRequests.map((request) =>
          request._id === id ? { ...request, status } : request
        );
        setDonationRequests(updatedRequests);
      } else {
        console.error('Failed to update donation request status');
      }
    } catch (error) {
      console.error('Error updating donation request status:', error);
    }
  };

  if (!user) {
    return <div className="text-center mt-12 text-xl">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      {/* Welcome Message */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-semibold text-gray-800">Welcome, {user.name || 'Donor'}</h1>
      </div>

      {/* Display message if no donation requests are made */}
      {!showRequests && (
        <div className="bg-white shadow-md rounded-lg mb-8 p-6 text-center">
          <p className="text-xl text-gray-600">You haven't made any donation requests yet.</p>
        </div>
      )}

      {/* Recent Donation Requests Section */}
      {showRequests && (
        <div className="bg-white shadow-md rounded-lg mb-8 p-6">
          <h2 className="text-xl font-semibold mb-6">Recent Donation Requests</h2>
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-sm text-gray-700">Recipient Name</th>
                <th className="px-6 py-3 text-left text-sm text-gray-700">Location</th>
                <th className="px-6 py-3 text-left text-sm text-gray-700">Donation Date</th>
                <th className="px-6 py-3 text-left text-sm text-gray-700">Blood Group</th>
                <th className="px-6 py-3 text-left text-sm text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-sm text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {donationRequests.map((request) => (
                <tr key={request._id} className="border-t">
                  <td className="px-6 py-4">{request.recipientName}</td>
                  <td className="px-6 py-4">
                    {request.recipientDistrict
                      ? `${request.recipientDistrict}, ${request.recipientUpazila}`
                      : 'Location not available'}
                  </td>
                  <td className="px-6 py-4">{request.donationDate}</td>
                  <td className="px-6 py-4">{request.bloodGroup}</td>
                  <td className="px-6 py-4">{request.status}</td>
                  <td className="px-6 py-4 space-x-3">
                    {/* Show Done and Cancel buttons only if status is 'inprogress' */}
                    {request.status === 'inprogress' && (
                      <>
                        <button
                          onClick={() => handleStatusChange(request._id, 'done')}
                          className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                          Done
                        </button>
                        <button
                          onClick={() => handleStatusChange(request._id, 'canceled')}
                          className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                          Cancel
                        </button>
                      </>
                    )}

                    {/* Edit button */}
                    <button
                      onClick={() => navigate(`/dashboard/edit-donation-request/${request._id}`)}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Edit
                    </button>

                    {/* Delete button */}
                    <button
                      onClick={() => handleDelete(request._id)} // Trigger delete function
                      className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Button to View All Donation Requests */}
      <div className="text-center mt-6">
        <button
          onClick={() => navigate('/dashboard/my-donation-requests')}
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg shadow-md"
        >
          View All My Requests
        </button>
      </div>
    </div>
  );
};

export default DashboardHome;
