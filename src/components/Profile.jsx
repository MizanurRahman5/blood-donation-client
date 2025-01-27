import React, { useState, useContext, useEffect } from 'react';
import { AuthContex } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';

const ProfilePage = () => {
  const { user } = useContext(AuthContex); // Fetching user from AuthContext
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    avatar: '',
    district: '',
    upazila: '',
    bloodGroup: '',
  });
  const [isEditing, setIsEditing] = useState(false); // To track whether the form is in edit mode

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.email) {
        console.error('No email found for the user.');
        return;
      }

      try {
        // API call with email to get data for the logged-in user only
        const response = await fetch(`https://blood-donation-server-site-opal.vercel.app/user?email=${user.email}`);
        const data = await response.json();

        if (response.ok) {
          setProfileData(data); // Set profile data if successful
        } else {
          console.error('Failed to fetch user data:', data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserData(); // Fetch user data if email exists
  }, [user]); // Dependency array, will run whenever `user` changes

  const handleEditClick = () => {
    setIsEditing(true); // Enable editing mode
  };

  const handleSaveClick = async (e) => {
    e.preventDefault(); // Prevent form submission (page reload)

    try {
      const response = await fetch(`https://blood-donation-server-site-opal.vercel.app/user?email=${user.email}`, {
        method: 'PUT', // HTTP PUT request for updating data
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData), // Sending updated data in the request body
      });

      const data = await response.json();
      if (response.ok) {
        setIsEditing(false); // Disable editing mode after saving

        // SweetAlert show after successful save
        Swal.fire({
          title: 'Profile Updated!',
          text: 'Your profile information has been successfully updated.',
          icon: 'success',
          confirmButtonText: 'Okay'
        });
      } else {
        console.error('Failed to save user data:', data);
      }
    } catch (error) {
      console.error('Error:', error);
      // SweetAlert for error case
      Swal.fire({
        title: 'Error!',
        text: 'There was an issue saving your profile. Please try again.',
        icon: 'error',
        confirmButtonText: 'Okay'
      });
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-5 border rounded shadow-md bg-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Profile</h2>
        {!isEditing && (
          <button
            onClick={handleEditClick}
            className="text-blue-500 hover:underline"
          >
            Edit
          </button>
        )}
      </div>
      <form onSubmit={handleSaveClick}> {/* Use form's onSubmit instead of onClick */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={profileData.avatar}
            alt="Avatar"
            className="w-24 h-24 rounded-full mb-4"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            value={profileData.name}
            disabled={!isEditing}
            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
            className="w-full px-3 py-2 border rounded bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            value={profileData.email}
            disabled
            className="w-full px-3 py-2 border rounded bg-gray-100 cursor-not-allowed"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">District</label>
          <input
            type="text"
            value={profileData.district}
            disabled={!isEditing}
            onChange={(e) => setProfileData({ ...profileData, district: e.target.value })}
            className="w-full px-3 py-2 border rounded bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Upazila</label>
          <input
            type="text"
            value={profileData.upazila}
            disabled={!isEditing}
            onChange={(e) => setProfileData({ ...profileData, upazila: e.target.value })}
            className="w-full px-3 py-2 border rounded bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Blood Group</label>
          <input
            type="text"
            value={profileData.bloodGroup}
            disabled={!isEditing}
            onChange={(e) => setProfileData({ ...profileData, bloodGroup: e.target.value })}
            className="w-full px-3 py-2 border rounded bg-gray-100"
          />
        </div>
        {isEditing && (
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
          >
            Save
          </button>
        )}
      </form>
    </div>
  );
};

export default ProfilePage;
