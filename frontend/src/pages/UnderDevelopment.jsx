/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Construction } from 'lucide-react';

const UnderDevelopment = ({ pageName }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-md w-full">
        <Construction 
          className="mx-auto mb-6 text-yellow-500" 
          size={80} 
          strokeWidth={1.5}
        />
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {pageName || 'This Page'} is Under Development
        </h1>
        <p className="text-gray-600 mb-6">
          We&apos;re working hard to bring you this exciting new feature. 
          Check back soon or stay tuned for updates!
        </p>
        <div className="flex justify-center space-x-4">
          <button 
            onClick={() => window.history.back()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnderDevelopment;