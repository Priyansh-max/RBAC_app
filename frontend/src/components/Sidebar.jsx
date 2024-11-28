/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Bell, Users, ChevronRight } from 'lucide-react';
import {  useLocation } from 'react-router-dom';

function Sidebar(props) {
  const { setSidebarExpanded, onContentChange } = props;  // Get functions passed as props
  const [isExpanded, setIsExpanded] = useState(false);

  const location = useLocation();

  const menuItems = [
    { icon: Bell, label: 'Your Notices', path: '/dashboard/notices', content: 'notices' },
    { icon: Users, label: 'User Data', path: '/dashboard/users', content: 'users' },
  ];

  const handleMouseEnter = () => {
    setIsExpanded(true);
    setSidebarExpanded(true);  // Notify parent to expand the sidebar
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
    setSidebarExpanded(false);  // Notify parent to collapse the sidebar
  };

  const handleClick = (content) => {
    onContentChange(content);  // Notify parent to change the content
  };

  return (
    <div
      className={`fixed left-0 h-screen bg-white border-r border-gray-200 shadow-lg transition-all duration-300 ease-in-out ${
        isExpanded ? 'w-64' : 'w-16'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-full">
        <div
          className={`absolute right-0 top-3 transition-opacity duration-300 ${
            isExpanded ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </div>

        <nav className="mt-8 px-2">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <button
                  key={item.path}
                  onClick={() => handleClick(item.content)} 
                  className={`flex items-center px-3 py-3 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon
                    className={`h-6 w-6 ${isActive ? 'text-blue-700' : 'text-gray-400'}`}
                  />
                  <span
                    className={`ml-3 whitespace-nowrap transition-opacity duration-300 ${
                      isExpanded ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
