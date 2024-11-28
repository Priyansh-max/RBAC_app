/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';  // Import Sidebar component
import Topbar from '../components/Topbar';
import { FaTimes } from 'react-icons/fa'

function AdminDashboard() {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null); // State for selected content

  const handleContentChange = (content) => {
    setSelectedContent(content);  // Update selected content based on button clicked
  };

  const handleSendNoticeClick = () => {
    setIsOverlayVisible(true);
  };

  // Close the overlay
  const handleCloseOverlay = () => {
    setIsOverlayVisible(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic, e.g., sending notice data to the backend
    console.log('Notice sent:', { title, body });
    setIsOverlayVisible(false); // Close the overlay after submission
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Pass setSidebarExpanded and handleContentChange functions to Sidebar */}
      <Sidebar 
        setSidebarExpanded={setIsSidebarExpanded} 
        onContentChange={handleContentChange} 
        
      />

      {/* Main content will shift based on the sidebar state */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarExpanded ? 'ml-64' : 'ml-16'
        }`}
      >
        <Topbar 
            handleSendNoticeClick={handleSendNoticeClick}
        />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg p-6">
          <div>
              <h1 className="text-2xl font-semibold text-gray-900">Welcome Admin, John!</h1>
              <p className="mt-2 text-gray-600">This is your dashboard content.</p>
            </div>

            {/* Content div that changes dynamically */}
            <div className="mt-6">
              {selectedContent === 'notices' && (
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-xl font-semibold">Your Notices</h2>
                  <p>Here are the latest notices for the admin.</p>
                  {/* You can replace this with dynamic data later */}
                </div>
              )}

              {selectedContent === 'users' && (
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-xl font-semibold">User Data</h2>
                  <p>List of users will appear here.</p>
                  {/* Replace this with the actual user data */}
                </div>
              )}

              {/* Add more sections as needed */}
            </div>
          </div>
        </main>
        </div>

      {isOverlayVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          onClick={handleCloseOverlay}
        >
          {/* Prevent closing when clicking inside the form */}
          <div
            className="bg-white p-6 rounded-lg w-96 shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseOverlay}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              <FaTimes size={20} />
            </button>

            <h2 className="text-xl font-semibold mb-4">Send a Notice</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Body</label>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-500 text-white rounded"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
