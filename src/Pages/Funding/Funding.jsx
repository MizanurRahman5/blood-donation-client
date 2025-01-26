// FundingPage.js (Private Page)

import React from 'react';

const FundingPage = () => {
  return (
    <div className="container min-h-[450px] mx-auto p-6 flex items-center justify-center">
      {/* Beautiful Blood-Themed Animation Message */}
      <div className="relative p-6 bg-red-100 text-red-700 rounded-md overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700 opacity-40 animate-pulse"></div>
        <p className="font-medium text-lg z-10 relative">
          You are now on the funding page. Here you can contribute funds to support our organization. 
          Thank you! 💉
        </p>
      </div>
    </div>
  );
};

export default FundingPage;
