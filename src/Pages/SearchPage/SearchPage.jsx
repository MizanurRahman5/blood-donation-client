import React, { useState } from 'react';

const locationData = {
  Dhaka: ['Dhanmondi', 'Uttara', 'Gulshan', 'Mirpur'],
  Chittagong: ['Pahartali', 'Kotwali', 'Halishahar', 'Sitakunda'],
  Sylhet: ['Sylhet Sadar', 'Beanibazar', 'Golapganj'],
  Rajshahi: ['Rajshahi Sadar', 'Puthia', 'Godagari'],
  Khulna: ['Khulna Sadar', 'Dumuria', 'Batiaghata'],
  Barishal: ['Barishal Sadar', 'Banaripara', 'Uzirpur'],
  Rangpur: ['Rangpur Sadar', 'Pirganj', 'Badarganj'],
  Mymensingh: ['Mymensingh Sadar', 'Trishal', 'Fulbaria'],
};

const SearchPage = () => {
  const [formData, setFormData] = useState({
    bloodGroup: '',
    district: '',
    upazila: '',
  });

  const [donors, setDonors] = useState([]);
  const [upazilas, setUpazilas] = useState([]);  // New state to manage upazilas

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // If district is changed, update district and reset upazila
    if (name === 'district') {
      setFormData({ ...formData, [name]: value, upazila: '' }); // Reset upazila when district changes
      setUpazilas(locationData[value] || []);  // Update upazila list based on selected district
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  

  const handleSearch = async (e) => {
    e.preventDefault();
    const { bloodGroup, district, upazila } = formData;
  
    try {
      const response = await fetch('http://localhost:3000/donor');
      const data = await response.json();
  
      // Filtering data based on user inputs
      const filteredDonors = data.filter((donor) => {
        return (
          (bloodGroup ? donor.bloodGroup === bloodGroup : true) &&
          (district ? donor.district === district : true) &&
          (upazila ? donor.upazila === upazila : true)
        );
      });
  
      setDonors(filteredDonors); // Update state with filtered data
    } catch (error) {
      console.error('Error fetching donors:', error);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-5">
      <h1 className="text-3xl font-bold text-gray-800 mb-5">Search for Blood Donors</h1>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg"
        onSubmit={handleSearch}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Blood Group</label>
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleInputChange}
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">District</label>
          <select
            name="district"
            value={formData.district}
            onChange={handleInputChange}
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Select District</option>
            {Object.keys(locationData).map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Upazila</label>
          <select
            name="upazila"
            value={formData.upazila}
            onChange={handleInputChange}
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Select Upazila</option>
            {upazilas.map((upazila, index) => (
              <option key={index} value={upazila}>
                {upazila}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Search
        </button>
      </form>
      <div className="w-full max-w-4xl">
        {donors.length > 0 ? (
          <div>
            <h2 className="text-xl font-bold text-gray-700 mb-3">Donor List</h2>
            <ul>
              {donors.map((donor) => (
                <li key={donor._id} className="p-4 bg-white shadow mb-3 rounded">
                  <p>Name: {donor.name}</p>
                  <p>Blood Group: {donor.bloodGroup}</p>
                  <p>District: {donor.district}</p>
                  <p>Upazila: {donor.upazila}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No donors found. Try searching with different criteria.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
