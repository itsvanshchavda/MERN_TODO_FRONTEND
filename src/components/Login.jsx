import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext';
import { server } from '../../server';
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { isAuthenticated, setIsAuthenticated, setLoader, loader } = useContext(AuthContext);

    const submitHandler = async (e) => {
        try {
            setLoader(true);
            e.preventDefault();

            const { data } = await axios.post(`${server}/users/login`, {
                email, password
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })

            toast.success(data.message);
            setLoader(false);
            setIsAuthenticated(true);

        } catch (err) {
            toast.error(err.response.data.message)
            setLoader(false);
            setIsAuthenticated(false);

        }



    };



    if (isAuthenticated) return <Navigate to="/" />

    return (
        <div>
            <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Login to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 max-w">
                        Or&nbsp;
                        <Link to='/register' className="font-medium text-blue-600 hover:text-blue-500">
                            create an account
                        </Link>
                    </p>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" onSubmit={submitHandler}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input value={email} onChange={(e) => setEmail(e.target.value)} id="email" name="email" type="email" required
                                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Enter your email address" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input value={password} onChange={(e) => setPassword(e.target.value)} id="password" name="password" type="password" required
                                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Enter your password" />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input id="remember_me" name="remember_me" type="checkbox"
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                                    <label  className="ml-2 block text-sm text-gray-900">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <Link to='/forgotpassword' className="font-medium text-blue-600 hover:text-blue-500">
                                        Forgot your password?
                                    </Link>
                                </div>
                            </div>

                            <div>
                                <button type="submit" disabled={loader}
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">

                                   Login
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login