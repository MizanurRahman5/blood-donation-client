import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContex } from '../Provider/AuthProvider';


const DashboardHome = () => {
  const { user } = useContext(AuthContex); // Get user data from AuthContext
  const [donationRequests, setDonationRequests] = useState([]);
  const [showRequests, setShowRequests] = useState(false);
  const navigate = useNavigate();
  console.log(user)

  // Add a check to ensure user exists before making an API call
  useEffect(() => {
    if (!user || !user.email) return; // If user or user.email is not available, stop execution

    const fetchDonationRequests = async () => {
      try {
        // API call to get donation requests for the logged-in donor
        const response = await fetch(`http://localhost:3000/donation-requests?donorEmail=${user.email}`);
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
  }, [user]); // Adding user as a dependency to trigger re-fetch when user changes

  if (!user) {
    // Render a loading or error state if user is not available
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      {/* Welcome Message */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">Welcome, {user.name || 'Donor'}</h1>
      </div>

      {/* Display message if no donation requests are made */}
      {!showRequests && (
        <div className="bg-white shadow-md rounded-lg mb-8 p-4 text-center">
          <p className="text-xl">You haven't made any donation requests yet.</p>
        </div>
      )}

      {/* Recent Donation Requests Section */}
      {showRequests && (
        <div className="bg-white shadow-md rounded-lg mb-8 p-4">
          <h2 className="text-xl font-semibold mb-4">Recent Donation Requests</h2>
          {/* Table with donation requests */}
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Recipient Name</th>
                <th className="px-4 py-2 text-left">Location</th>
                <th className="px-4 py-2 text-left">Donation Date</th>
                <th className="px-4 py-2 text-left">Blood Group</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {donationRequests.slice(0, 3).map((request, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{request.recipientName}</td>
                  <td className="border px-4 py-2">{request.recipientLocation.district}, {request.recipientLocation.upazila}</td>
                  <td className="border px-4 py-2">{request.donationDate}</td>
                  <td className="border px-4 py-2">{request.bloodGroup}</td>
                  <td className="border px-4 py-2">{request.donationStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Button to View All Donation Requests */}
      <div className="text-center">
        <button
          onClick={() => navigate('/dashboard/my-donation-requests')}
          className="bg-blue-500 text-white px-6 py-3 rounded"
        >
          View All My Requests
        </button>
      </div>
    </div>
  );
};

export default DashboardHome;
