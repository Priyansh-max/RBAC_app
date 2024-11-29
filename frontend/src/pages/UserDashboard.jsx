/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Topbar from '../components/Topbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserDashboard(){
    const [notices, setNotices] = useState([]);
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    navigate("/login");
                    return;
                }

                const noticesResponse = await axios.get("http://localhost:3000/api/v1/users/notices", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const userResponse = await axios.get("http://localhost:3000/api/v1/users/userdata", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setNotices(noticesResponse.data.notices);
                setUserData(userResponse.data.user);

                console.log(userResponse.data.user);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error.response?.data?.error || "Failed to fetch data.");
                setIsLoading(false);
            }
        };

        fetchData();
    }, [navigate]); 

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50">
        <Topbar userdata={userData} Role="USER"/>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h1 className="text-2xl font-semibold text-gray-900">Welcome back, {userData.firstname}  {userData.lastname}</h1>
            <p className="mt-2 text-gray-600">All the notices from the admin will be displayed here.</p>
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