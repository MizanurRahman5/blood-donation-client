import React from 'react';

const Banner = () => {
  return (
    <div className="bg-red-100 min-h-screen">
      {/* Banner Section */}
      <div className="relative bg-red-50 py-20">
        <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay" style={{ backgroundImage: "url('https://via.placeholder.com/1920x1080/ff7f7f/ffffff')" }}></div>
        <div className="max-w-6xl mx-auto  text-gray relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold drop-shadow-xl mb-4">SMS-based platform to connect blood searchers with donors</h1>
          <p className="text-lg md:text-xl drop-shadow-xl mb-6">
            Rokto is a real-time free platform to help blood searchers connect voluntary blood donors around Bangladesh.
          </p>
          <div className="space-x-4">
            <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-lg shadow-lg">Join as a Donor</button>
            <button className="bg-white hover:bg-gray-200 text-red-600 py-2 px-6 rounded-lg shadow-lg">Search Donors</button>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="relative bg-white py-20">
        <div className="wave-top absolute top-0 left-0 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="text-red-100 fill-current"
          >
            <path
              fillOpacity="1"
              d="M0,288L48,272C96,256,192,224,288,218.7C384,213,480,235,576,240C672,245,768,235,864,208C960,181,1056,139,1152,122.7C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>

        <div className="max-w-6xl mx-auto  relative z-10">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Section */}
            <div>
              <h2 className="text-3xl font-bold mb-4">What is Rokto?</h2>
              <p className="text-lg text-gray-700 mb-4">
                Rokto is an automated blood service that connects blood searchers with voluntary donors in a moment through SMS. Rokto is always a free service for all.
              </p>
            </div>

            {/* Right Section */}
            <div>
              <h2 className="text-3xl font-bold mb-4">Why is Rokto?</h2>
              <ul className="text-lg text-gray-700 list-disc list-inside">
                <li>100% Automated</li>
                <li>Always free</li>
                <li>24×7 service</li>
                <li>All data is secured</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center">
            <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-lg shadow-lg">Learn More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
