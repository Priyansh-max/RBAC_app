/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

const UsersList = ({ users }) => {
  return (
    <div className="users-container">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">Users List</h1>
      {users.length === 0 ? (
        <p className="text-gray-500">No users available.</p>
      ) : (
        <div className="overflow-auto max-h-fit border rounded-lg shadow-md">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-left text-gray-700">ID</th>
                <th className="px-4 py-2 border-b text-left text-gray-700">First Name</th>
                <th className="px-4 py-2 border-b text-left text-gray-700">Last Name</th>
                <th className="px-4 py-2 border-b text-left text-gray-700">Email</th>
                <th className="px-4 py-2 border-b text-left text-gray-700">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="even:bg-gray-100">
                  <td className="px-4 py-2 border-b">{user.id}</td>
                  <td className="px-4 py-2 border-b">{user.firstname}</td>
                  <td className="px-4 py-2 border-b">{user.lastname}</td>
                  <td className="px-4 py-2 border-b">{user.email}</td>
                  <td className="px-4 py-2 border-b">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UsersList;
