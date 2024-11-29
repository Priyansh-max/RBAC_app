/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

const NoticesList = ({ notices }) => {
  return (
    <div className="notices-container">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">Notices</h1>
      {notices.length === 0 ? (
        <p className="text-gray-500">No notices available.</p>
      ) : (
        notices.map((notice) => (
          <div key={notice.id} className="notice-item border-b py-4">
            <h2 className="text-xl font-semibold text-gray-800">{notice.title}</h2>
            <p className="text-sm text-gray-600">{new Date(notice.createdAt).toLocaleString()}</p>
            <p className="text-gray-700 mt-2">{notice.content}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default NoticesList;
