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
            console.log("Error")
            setIsAuthenticated(false);

        }



    };

    if (isAuthenticated) return <Navigate to="/" />

    return (
        <div>

            <div className="flex flex-col h-screen bg-gray-100">
                <div className="grid place-items-center px-2 sm:my-auto">
                    <div className="flex">

                    </div>


                    <div className="w-11 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
            px-6 py-10 sm:px-10 sm:py-6 
            bg-white rounded-lg shadow-md lg:shadow-lg">

                        <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
                            Login
                        </h2>

                        <form className="mt-10" onSubmit={submitHandler}>
                            <label className="block text-xs font-semibold text-gray-600 uppercase">E-mail</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} id="email" type="email" name="email" placeholder="e-mail address"
                                className="block w-full py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                                required />

                            <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Password</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} id="password" type="password" name="password" placeholder="password"
                                className="block w-full py-3 px-1 mt-2 mb-4
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                                required />

                            <button type="submit" disabled={loader}
                                className="w-full py-3 disabled:bg-gray-600 mt-10 bg-gray-800 rounded-sm
                    font-medium text-white uppercase
                    focus:outline-none hover:bg-gray-700 hover:shadow-none">
                                Login
                            </button>

                            <p className="flex-1 text-gray-500 text-md text-center pb-1 pt-2 mx-4 my-1 sm:my-auto">
                                or
                            </p>

                            <Link className='px-[11.5em] p-10 underline' to="/register">Register</Link>

                            <div className="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
                                {/* <a href="#" className="flex-2 underline">
                        Forgot password?
                    </a> */}


                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login