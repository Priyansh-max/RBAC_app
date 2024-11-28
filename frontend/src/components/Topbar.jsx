/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Search, ChevronDown, LogOut, Settings } from 'lucide-react';
import { MdOutlineSecurity } from "react-icons/md"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from "axios"

function Topbar( {handleSendNoticeClick } ) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [Role, setRole] = useState("ADMIN");
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login'); 
    };

    return (
        <div className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/dashboard" className="flex items-center">
                            <MdOutlineSecurity className="h-8 w-8 text-blue-600" />
                            <span className="ml-2 text-xl font-bold text-gray-900">NoticeBoard</span>
                        </Link>
                    </div>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-lg mx-8">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Search..."
                            />
                        </div>
                    </div>

                    {/* Conditionally render button if Role is ADMIN */}
                    {Role === "ADMIN" && (
                        <button onClick={handleSendNoticeClick} className="bg-orange-500 text-white font-semibold text-sm rounded h-[35px] py-1 hover:bg-orange-700 transition-all duration-300 ease-out-in px-4">
                            Send Notice
                        </button>
                    )}

                    {/* User Menu */}
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center space-x-3 focus:outline-none"
                        >
                            <img
                                className="h-8 w-8 rounded-full object-cover"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt="User avatar"
                            />
                            <div className="flex items-center">
                                <span className="text-sm font-medium text-gray-700">Hello</span>
                                <ChevronDown className="ml-2 h-4 w-4 text-gray-400" />
                            </div>
                        </button>

                        {isDropdownOpen && (
                            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {Role === "USER" && (
                                    <>
                                        <Link
                                            to="/profile"
                                            className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 items-center"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            <Settings className="mr-3 h-4 w-4" />
                                            Edit Profile
                                        </Link>
                                    </>
                                )}
                                {Role === "ADMIN" && (
                                    <>
                                        <Link
                                            to="/edit-moderators"
                                            className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 items-center"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            <Settings className="mr-3 h-4 w-4" />
                                            Edit Moderators
                                        </Link>
                                    </>
                                )}
                                <button
                                    onClick={() => {
                                        setIsDropdownOpen(false);
                                        // Add logout logic here
                                    }}
                                    className="flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 items-center"
                                >
                                    <LogOut className="mr-3 h-4 w-4" />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Topbar;
