import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios'
import { server } from "../../server";
import toast from "react-hot-toast";
import AuthContext from "../context/AuthContext";



const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isAuthenticated, setIsAuthenticated , setLoader , loader } = useContext(AuthContext);

    const submitHandler = async (e) => {
        try {
            setLoader(true);
            e.preventDefault();

            const { data } = await axios.post(`${server}/users/register`, {
                name, email, password
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })

            toast.success(data.message);
            setIsAuthenticated(true);
            setLoader(false);

        } catch (err) {
            toast.error(err.response.data.message)
            console.log("Error")
            setIsAuthenticated(false);
            setLoader(false);
        }



    };

    if (isAuthenticated) return <Navigate to="/" />



    return (
        <div>
            <div className="flex flex-col h-screen bg-gray-100">
                <div className="grid place-items-center px-2 sm:my-auto">
                    <div
                        className="w-11 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
            px-6 py-10 sm:px-10 sm:py-6 
            bg-white rounded-lg shadow-md lg:shadow-lg"
                    >
                        <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
                            Register
                        </h2>

                        <form className="mt-10" onSubmit={submitHandler}>
                            <label

                                className="block text-xs  font-semibold text-gray-600 uppercase"
                            >
                                Name
                            </label>

                            <input
                                value={name}
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name"
                                className="block w-full py-3 px-1 mt-2  text-gray-800 appearance-none
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                                required
                            />
                            <label

                                className=" mt-4 block text-xs font-semibold text-gray-600 uppercase"
                            >
                                E-mail
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="e-mail address"

                                className="block w-full py-3 px-1 mt-2 
                        text-gray-800 appearance-none 
                        border-b-2 border-gray-100
                        focus:text-gray-500 focus:outline-none focus:border-gray-200"
                                required
                            />

                            <label

                                className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
                            >
                                Password
                            </label>
                            <input

                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="password"
                                className="block w-full py-3 px-1 mt-2 mb-4
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                                required
                            />

                            <button disabled={loader}
                                type="submit"
                                className="w-full py-3 mt-10 bg-gray-800 rounded-sm
                    font-medium text-white uppercase
                    focus:outline-none hover:bg-gray-700 hover:shadow-none"
                            >
                                Register
                            </button>

                            <p className="flex-1 text-gray-500 text-md text-center pb-1 pt-2 mx-4 my-1 sm:my-auto">
                                or
                            </p>

                            <Link className="p-10 px-[11.7rem] font-semibold" to="/login">
                                Login
                            </Link>

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
    );
};

export default Register;
