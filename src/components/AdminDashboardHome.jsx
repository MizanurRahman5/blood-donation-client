import React, { useEffect, useState } from "react";

const AdminDashboardHome = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalFunds, setTotalFunds] = useState(0);
  const [totalBloodRequests, setTotalBloodRequests] = useState(0);

  useEffect(() => {
    // Fetch total users from backend API
    const fetchTotalUsers = async () => {
      const response = await fetch("https://blood-donation-server-site-opal.vercel.app/users",  {
        headers:{
          authorization :`Bearer ${localStorage.getItem('access-token')}`
        }
      }); // API endpoint to get users
      const data = await response.json();
      setTotalUsers(data.length); // Assuming you want to show the total number of users
    };

    // Fetch total funds from backend API (this could be dynamic)
    const fetchTotalFunds = async () => {
      const response = await fetch("https://blood-donation-server-site-opal.vercel.app/donation-requests"); // API endpoint to get donations
      const data = await response.json();
      const totalFunds = data.reduce((sum, donation) => sum + donation.amount, 0); // Assuming donation amount is present in the response
      setTotalFunds(totalFunds);
    };

    // Fetch total blood requests
    const fetchTotalBloodRequests = async () => {
      const response = await fetch("https://blood-donation-server-site-opal.vercel.app/all-donation-requests",  {
        headers:{
          authorization :`Bearer ${localStorage.getItem('access-token')}`
        }
      });
      const data = await response.json();
      setTotalBloodRequests(data.length); // Count total blood requests
    };

    fetchTotalUsers();
    fetchTotalFunds();
    fetchTotalBloodRequests();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome to Admin Dashboard</h1>
      <div className="grid  grid-cols-1 sm:grid-cols-1 gap-4">
        <div className="p-4 bg-blue-100 rounded shadow">
          <h2 className="text-lg font-medium">Total Users</h2>
          <p className="text-3xl font-bold">{totalUsers}</p>
        </div>
        <div className="p-4 bg-green-100 rounded shadow">
          <h2 className="text-lg font-medium">Total Funds</h2>
          <p className="text-3xl font-bold">${totalFunds}</p>
        </div>
        <div className="p-4 bg-red-100 rounded shadow">
          <h2 className="text-lg font-medium">Total Blood Requests</h2>
          <p className="text-3xl font-bold">{totalBloodRequests}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
