// eslint-disable-next-line no-unused-vars
import React , { useState }from "react";
import { Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import InputField from "../components/InputField";
import Button from "../components/Button";
import InputFieldEmail from "../components/InputFIeldEmail";
import { FaTimes } from 'react-icons/fa'
import OtpInput from 'react-otp-input';

function Signup(){
    const [isLoading, setIsLoading] = useState(false);
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const [OTP , setOTP] = useState();
    
    const handleSubmit = () => {
        setIsLoading(true);
        setIsLoading(false);
    }

    const handleVerifyClick = () => {
        setIsOverlayVisible(true);
      };
    
      // Close the overlay
      const handleCloseOverlay = () => {
        setIsOverlayVisible(false);
      };

      const handleOtpChange = (otp) => {
        setOTP(otp);
      }

      const handleOtpSubmit = (e) => {
        e.preventDefault();
        // Submit logic, e.g., sending notice data to the backend
        console.log('Notice sent:');
        setIsOverlayVisible(false); // Close the overlay after submission
      };




    return(
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                <UserPlus className="h-12 w-12 text-blue-600" />
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Create your account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                <Link
                    to="/login"
                    className="font-medium text-blue-600 hover:text-blue-500"
                >
                    Sign in
                </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                        <InputField
                            text="First name"
                            type="text"
                            required
                            inputplaceholder="Priyansh"
                        />
                        <InputField
                            text="Last name"
                            type="text"
                            required
                            inputplaceholder="Agarwal"
                        />
                        </div>

                        <InputFieldEmail
                            text="Email address"
                            type="email"
                            required
                            inputplaceholder="user@example.com"
                            handleVerifyClick={handleVerifyClick}
                        />

                        <InputField
                            text="Password"
                            type="password"
                            required
                            inputplaceholder="Create a strong password"
                        />

                        <InputField
                            text="Confirm Password"
                            type="password"
                            required
                            inputplaceholder="Confirm your password"
                        />

                        <div className="flex items-center">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                required
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label
                                htmlFor="terms"
                                className="ml-2 block text-sm text-gray-900"
                            >
                                I agree to the{' '}
                                <a
                                href="#"
                                className="font-medium text-blue-600 hover:text-blue-500"
                                >
                                Terms of Service
                                </a>{' '}
                                and{' '}
                                <a
                                href="#"
                                className="font-medium text-blue-600 hover:text-blue-500"
                                >
                                Privacy Policy
                                </a>
                            </label>
                        </div>

                        <Button
                        text="Submit"
                        className="w-full"
                        isLoading={isLoading}
                        >
                        Create Account
                        </Button>
                    </form>
                </div>
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

                        <h2 className="text-xl font-semibold mb-4">Verify Email</h2>
                        <form onSubmit={handleOtpSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Enter Otp</label>
                                <OtpInput
                                    id="otp-input"
                                    value={OTP}
                                    onChange={handleOtpChange}
                                    numInputs={4}
                                    separator={<span>|</span>}
                                    renderInput={(props) => (
                                    <input
                                        {...props}
                                        className="m-2 h-6 text-center border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                                    />
                                    )}
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
    )
}

export default Signup;