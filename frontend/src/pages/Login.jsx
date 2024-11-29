// eslint-disable-next-line no-unused-vars
import React , { useState }from "react";
import { Link , useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';
import InputField from "../components/InputField";
import Button from "../components/Button";
import axios from "axios"

function Login(){
    const [isLoading, setIsLoading] = useState(false);
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [Error , setError] = useState({});
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(email == "" || password == ""){
            setError({
                email : email === "" ? "Username is required*" : "",
                password : password === "" ? "Password is required*" : "",
            })
        }
        else{
            setError({})
            setIsLoading(true)
            try{
                const response = await axios.post("https://rbac-app-9epa.onrender.com/api/v1/login", {
                    email,
                    password
                }) 
    
                if(response.status == 200){
                    localStorage.setItem("token", response.data.token);
                    setIsLoading(false);
                    if(response.data.user.role == "USER"){
                        navigate("/userdashboard");
                    }
                    else{
                        navigate("/admindashboard")
                    }
                }

    
            }catch(error){
                if (error.response && error.response.data.message) {
                    setError({ message: error.response.data.message });
                } else {
                    setError({ message: "Something went wrong. Please try again" });
                }
            }finally {
                setIsLoading(false);
            }
        }       
    }

    return(
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <Lock className="h-12 w-12 text-blue-600" />
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Login to your account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                Or{' '}
                <Link
                    to="/signup"
                    className="font-medium text-blue-600 hover:text-blue-500"
                >
                    create a new account
                </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <InputField
                            text="Email address"
                            type="email"
                            required
                            error={Error.email}
                            icon={<Mail className="h-5 w-5 text-gray-400" />}
                            inputplaceholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <InputField
                            text="Password"
                            type="password"
                            required
                            error={Error.password}
                            inputplaceholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                checked={true}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label
                                htmlFor="remember-me"
                                className="ml-2 block text-sm text-gray-900"
                                >
                                Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                            <Link 
                                to="/underdevelopment" 
                                className="font-medium text-blue-600 hover:text-blue-500"
                                >
                                Forgot your password?
                                </Link>
                            </div>
                        </div>

                        <Button
                            text={isLoading ? "Logging in..." : "Login"}
                            className="w-full"
                            isLoading={isLoading}
                            onClick={handleSubmit}
                            >
                        </Button>
                        {Error.message && <p className="italic text-center text-red-500 text-xs">{Error.message}</p>}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;