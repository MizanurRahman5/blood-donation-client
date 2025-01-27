import React, { useState, useEffect } from "react";

const VolunteerAllUser = () => {
  const [users, setUsers] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showMenu, setShowMenu] = useState(null); // State to control which menu is open
  const usersPerPage = 5;
  

  useEffect(() => {
    // Fetch users data
    const fetchUsers = async () => {
      const response = await fetch("https://blood-donation-server-site-opal.vercel.app/users");
      const data = await response.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) => statusFilter === "all" || user.status === statusFilter
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleStatusChange = async (userId, currentStatus) => {
    const newStatus = currentStatus === "active" ? "blocked" : "active";

    // Update status locally
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === userId ? { ...user, status: newStatus } : user
      )
    );

    // Send update request to server
    await fetch(`https://blood-donation-server-site-opal.vercel.app/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    });
  };

  const handleRoleChange = async (userId, newRole) => {
    // Update role locally
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === userId ? { ...user, role: newRole } : user
      )
    );

    // Send update request to server
    await fetch(`https://blood-donation-server-site-opal.vercel.app/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role: newRole }),
    });
  };

  const toggleMenu = (userId) => {
    setShowMenu(showMenu === userId ? null : userId); // Toggle the menu for a specific user
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="mb-4 p-2 border"
      >
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="blocked">Blocked</option>
      </select>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Avatar</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user._id}>
              <td className="border p-2">
                <img src={user.avatar} alt="avatar" className="w-8 h-8" />
              </td>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.role}</td>
              <td className="border p-2">{user.status}</td>
              <td className="border p-2">
                <div className="relative">
                  <button
                    className="px-2 py-1 text-sm font-semibold bg-gray-200 text-gray-800 rounded"
                    onClick={() => toggleMenu(user._id)}
                  >
                    ⋮
                  </button>
                  {showMenu === user._id && (
                    <div className="absolute right-0 bg-white shadow-md rounded mt-2 w-40 z-10">
                      <button
                        onClick={() => handleStatusChange(user._id, user.status)}
                        className={`w-full text-left px-4 py-2 text-sm ${
                          user.status === "active" ? "text-red-500" : "text-green-500"
                        }`}
                      >
                        {user.status === "active" ? "Block" : "Unblock"}
                      </button>
                      <button
                        onClick={() => handleRoleChange(user._id, "volunteer")}
                        className="w-full text-left px-4 py-2 text-sm text-blue-500"
                      >
                        Make Volunteer
                      </button>
                      <button
                        onClick={() => handleRoleChange(user._id, "admin")}
                        className="w-full text-left px-4 py-2 text-sm text-yellow-500"
                      >
                        Make Admin
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-4">
        {Array.from(
          { length: Math.ceil(filteredUsers.length / usersPerPage) },
          (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 border ${
                currentPage === index + 1 ? "bg-blue-500 text-white" : ""
              }`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default VolunteerAllUser;
