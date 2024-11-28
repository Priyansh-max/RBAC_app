/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Topbar from '../components/Topbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserDashboard(){
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50">
        <Topbar />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h1 className="text-2xl font-semibold text-gray-900">Welcome back, Priyansh!</h1>
            <p className="mt-2 text-gray-600">This is your dashboard content.</p>
          </div>
          <div className="mt-6 bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900">
                    Notices
                </h2>
                {notices.length > 0 ? (
                    <ul className="mt-4 space-y-4">
                        {notices.map((notice) => (
                            <li
                                key={notice.id}
                                className="p-4 bg-gray-100 rounded-md shadow"
                            >
                                <h3 className="text-lg font-bold text-gray-800">
                                    {notice.title}
                                </h3>
                                <p className="mt-2 text-gray-700">
                                    {notice.content}
                                </p>
                                <p className="mt-2 text-sm text-gray-500">
                                    Created At: {new Date(notice.createdAt).toLocaleString()}
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="mt-4 text-gray-500">No notices available.</p>
                )}
            </div>
        </main>
      </div>

    )
}

export default UserDashboard;