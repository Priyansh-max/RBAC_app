/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { FaExclamation, FaCheckCircle } from 'react-icons/fa';

function InputFieldEmail({ text, inputplaceholder, onChange, error, type ,handleVerifyClick , disbaled , verified }) {

    return (
        <div>
            <h1 className="pb-1 text-sm text-left text-grey font-semibold">{text}</h1>
            <div className="relative pt-1">
                <input
                    type={type}
                    placeholder={inputplaceholder}
                    onChange={onChange}
                    required
                    disabled={verified}
                    className={`rounded border focus:outline-none transition-all duration-200 ease-in-out pl-2 py-1 w-full ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-400'}`}
                />
                <button
                    onClick={handleVerifyClick}
                    disabled={verified}
                    className={`absolute right-7 top-1/2 transform -translate-y-1/2 cursor-pointer ${
                        verified ? 'cursor-default' : ''
                    }`}
                >
                    {verified ? (
                        <FaCheckCircle className="text-green-500" /> 
                    ) : (
                        <FaExclamation className={error ? 'text-gray-400 animate-spin' : ''} /> 
                    )}
                </button>
            </div>
            {error && <p className="italic text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
}

export default InputFieldEmail;
