// eslint-disable-next-line no-unused-vars
import React , { useEffect, useState }from "react";
import { Link , useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import InputField from "../components/InputField";
import Button from "../components/Button";
import InputFieldEmail from "../components/InputFIeldEmail";
import { FaTimes } from 'react-icons/fa'
import OtpInput from 'react-otp-input';
import axios from "axios"

function Signup(){
    const [isLoading, setIsLoading] = useState(false);
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const [OTP , setOTP] = useState('');
    const [Email , setEmail] = useState("");
    const [Error , setError] = useState({});
    const [isVerified , setIsVerified] = useState(false);
    const [isChecked , setIsChecked] = useState(false);
    const [isDisabled , setIsDisabled] = useState(false);

    const [firstname , setFirstname] = useState("");
    const [lastname , setLastname] = useState("");
    const [password , setPassword] = useState("");
    const [confirmpassword , setConfirmPassword] = useState("")
    const navigate = useNavigate();

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isVerified || password !== confirmpassword || !isChecked) {
            const errorMessages = {
                checked: !isChecked ? "Please agree to the terms and condition*" : "",
                verified: !isVerified ? "Please verify your email*" : "",
                mismatch: password !== confirmpassword ? "Password and confirm password must be same*" : "",
            };
    
            setError(errorMessages);
            return;
        }
    
        setError({});
        setIsLoading(true);
    
        try {
            const response = await axios.post("http://localhost:3000/api/v1/signup", {
                email: Email,
                password,
                firstname,
                lastname,
            });
    
            if (response.status === 201) {
                localStorage.setItem("token", response.data.token);
                setIsLoading(false);
                navigate("/userdashboard");
            }
        } catch (error) {
            const apiError = error.response?.data?.message || "Something went wrong. Please try again.";
            setError({ fault : apiError });
            console.log("API error: ", apiError);
        } finally {
            setIsLoading(false); 
        }
    };

    const handleVerifyClick = async () => {
        setOTP('')
        if(Email == "" || validateEmail(Email) == false){
            setError({OTP : "Please enter a valid email"})
        }
        else{
            setIsOverlayVisible(true)
            setError({})
            try{
                const response = await axios.post("http://localhost:3000/api/v1//send-verification-email" , {
                    email : Email
                })

                setIsLoading(true);

                if(response.status == 200){
                    setIsLoading(false);

                }

            }catch(error){
                if (error.response && error.response.data.message) {
                    setError({ message: error.response.data.message });
                } else {
                    setError({ message: "Something went wrong. Please try again later." });
                }

            }
        } 
      };
    
      const handleCloseOverlay = () => {
        setIsOverlayVisible(false);
      };

      const handleOtpSubmit = async (e) => {
        e.preventDefault();
        console.log(OTP);
        
        // Check if OTP is empty
        if (OTP === "") {
            setError({ message : "Enter an OTP" });
            return; // Exit early if OTP is not provided
        }
        
        setError({}); 
        
        try {
            console.log(Email);
            console.log(OTP);
            const response = await axios.post("http://localhost:3000/api/v1/verify-code", {
                email: Email,
                code: OTP,
            });
    
            if (response.status === 200) {
                setIsVerified(true);
                setIsDisabled(true);
                setIsOverlayVisible(false);
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError({ message: error.response.data.message });
            } else {
                setError({ message: "Something went wrong. Please try again later." });
            }
        } finally {
            setIsLoading(false);  // Reset loading state after the request finishes
        }
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
                            onChange={(e) => setFirstname(e.target.value)}
                            required
                            inputplaceholder="Priyansh"
                        />
                        <InputField
                            text="Last name"
                            type="text"
                            onChange={(e) => setLastname(e.target.value)}
                            required
                            inputplaceholder="Agarwal"
                        />
                        </div>

                        <InputFieldEmail
                            text="Email address"
                            type="email"
                            disbaled={isDisabled}
                            verified={isVerified}
                            error={Error.OTP}
                            required
                            inputplaceholder="user@example.com"
                            onChange={(e) => {setEmail(e.target.value)}}
                            handleVerifyClick={handleVerifyClick}
                        />

                        <InputField
                            text="Password"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            error={Error.mismatch}
                            required
                            inputplaceholder="Create a strong password"
                        />

                        <InputField
                            text="Confirm Password"
                            type="password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            error={Error.mismatch}
                            required
                            inputplaceholder="Confirm your password"
                        />

                        <div className="flex items-center">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                checked={isChecked}
                                onChange={(e) => setIsChecked(e.target.checked)}
                                required
                                className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
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
                        {Error.checked && <p className="italic text-red-500 text-xs">{Error.checked}</p>}

                        <Button
                        text="Submit"
                        onClick={handleSubmit}
                        className="w-full"
                        isLoading={isLoading}
                        >
                        </Button>
                        {Error.verified && <p className="italic text-center text-red-500 text-xs mt-1">{Error.verified}</p>}
                        {Error.fault && <p className="italic text-center text-red-500 text-xs mt-1">{Error.fault}</p>}
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
                        <h2 className="text-sm mb-4">An email at <span className="text-red-500">{Email}</span> with an otp has been sent to you</h2>
                        <form onSubmit={handleOtpSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Enter Otp</label>
                                <OtpInput
                                    id="otp-input"
                                    value={OTP}
                                    onChange={setOTP}
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
                                onClick={handleOtpSubmit}
                                className="w-full px-4 py-2 bg-blue-500 text-white rounded"
                            >
                                Submit
                            </button>
                            {Error.OTP && <p className="italic text-center text-red-500 text-xs mt-1">{Error.OTP}</p>}
                        </form>
                    </div>
                </div>
            )}


        </div>
    )
}

export default Signup;