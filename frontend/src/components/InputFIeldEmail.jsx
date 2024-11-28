/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { FaExclamation, FaCheckCircle } from 'react-icons/fa';

function InputFieldEmail({ text, inputplaceholder, onChange, error, type ,handleVerifyClick}) {
    const [isVerified, setIsVerified] = useState(false); // State to track verification
    const [isVerifying, setIsVerifying] = useState(false); // State to track ongoing verification

    return (
        <div>
            <h1 className="pb-1 text-sm text-left text-grey font-semibold">{text}</h1>
            <div className="relative pt-1">
                <input
                    type={type}
                    placeholder={inputplaceholder}
                    required
                    className="rounded border border-grey focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all duration-200 ease-out-in focus:border-transparent pl-2 py-1 w-full"
                />
                <button
                    onClick={handleVerifyClick}
                    className={`absolute right-7 top-1/2 transform -translate-y-1/2 cursor-pointer ${
                        isVerified ? 'cursor-default' : ''
                    }`}
                    disabled={isVerified} // Disable the button if verified
                >
                    {isVerified ? (
                        <FaCheckCircle className="text-green-500" /> // Verified icon
                    ) : (
                        <FaExclamation className={isVerifying ? 'text-gray-400 animate-spin' : ''} /> // Unverified icon (spins if verifying)
                    )}
                </button>
            </div>
        </div>
    );
}

export default InputFieldEmail;
