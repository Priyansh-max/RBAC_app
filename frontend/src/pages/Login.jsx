// eslint-disable-next-line no-unused-vars
import React , { useState }from "react";
import { Link } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';
import InputField from "../components/InputField";
import Button from "../components/Button";


function Login(){
    const [isLoading, setIsLoading] = useState(false);
    
    const handleSubmit = () => {
        setIsLoading(true);
        setIsLoading(false);
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
                            icon={<Mail className="h-5 w-5 text-gray-400" />}
                            inputplaceholder="Enter your email"
                        />

                        <InputField
                            text="Password"
                            type="password"
                            required
                            inputplaceholder="Enter your password"
                        />

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
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
                                <a
                                href="#"
                                className="font-medium text-blue-600 hover:text-blue-500"
                                >
                                Forgot your password?
                                </a>
                            </div>
                        </div>

                        <Button
                            text="Submit"
                            className="w-full"
                            isLoading={isLoading}
                            >
                            Sign in
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;