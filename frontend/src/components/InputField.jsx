/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

function InputField({ text, inputplaceholder, onChange, error, type}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div>
      <h1 className="pb-1 text-sm text-left text-grey font-semibold">{text}</h1>
      <div className="relative pt-1">
        <input
          onChange={onChange}
          type={type === "password" && isPasswordVisible ? "text" : type} 
          placeholder={inputplaceholder}
          required
          className={`rounded border border-grey focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all duration-200 ease-out-in focus:border-transparent pl-2 py-1 w-full ${error ? "border-red-500" : "border-grey"}`}
        />

        {type === "password" && (
          <div className="absolute right-7 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={togglePasswordVisibility}>
            {isPasswordVisible ? <FaEyeSlash className="text-gray-600" /> : <FaEye className="text-gray-600" />}
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-2 italic">{error}</p>}
    </div>
  );
}

export default InputField;