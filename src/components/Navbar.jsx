import React, { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { server } from '../../server';
import { FaBars } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";





const Navbar = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const { isAuthenticated, setIsAuthenticated, loader, setLoader } = useContext(AuthContext);


    //Logout handler
    const logoutHandler = async () => {
        setLoader(true);
        try {

            await axios.get(`${server}/users/logout`,
                {
                    withCredentials: true
                })
            toast.success("Logout Success!!");
            
            setLoader(false);   
            setIsAuthenticated(false);
            setShowMobileMenu(false);

        } catch (err) {
            toast.error(err.response.data.message)
            setLoader(false);
            setIsAuthenticated(true);
        }
    };


    const toggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);
    };
    

    return (
        <div>
            <nav className="p-4 bg-zinc-900 text-gray-200 ">
                <div className="flex justify-between items-center">
                    <div className="flex items-center pl-8">
                        <i className="text-2xl fas fa-campground"></i>
                        <h1 className="font-serif tracking-wide font-bold text-xl pl-4">Todo List </h1>
                    </div>

                    {/* MOBILE NAV ICON */}
                    <div className="md:hidden block top-4 right-8 fixed max-sm:absolute max-sm:bottom-1">
                        <button

                            type="button"
                            className="md:hidden text-gray-200 transition duration-300 focus:outline-none focus:text-white hover:text-white"
                            onClick={toggleMobileMenu}
                        >
                            {showMobileMenu ? <IoMdClose className="text-2xl" /> : <FaBars className="text-2xl" />}



                        </button>
                    </div>

                    {/* NAVIGATION - LARGE SCREENS */}
                    <div className="hidden md:flex ">
                        <ul className="hidden md:flex">
                            <li className="text-lg pr-8 ">
                                <Link to='/' className="transition duration-300 focus:outline-none focus:text-indigo-400 focus:underline  hover:text-indigo-400">
                                    Home
                                </Link>
                            </li>
                            <li className="text-lg pr-8">
                                <Link to='/profile' className="transition duration-300 focus:outline-none focus:text-indigo-400 focus:underline  hover:text-indigo-400">
                                    Profile
                                </Link>
                            </li>
                            <li className="text-lg pr-8">
                                <Link to='/' href="#" className="transition duration-300 focus:outline-none focus:text-indigo-400 focus:underline    hover:text-indigo-400">
                                    Github
                                </Link>
                            </li>

                            {isAuthenticated ? (<button disabled={loader} onClick={logoutHandler} className='text-lg float-end relative left-[16em] bg-indigo-500 rounded-sm hover:bg-indigo-600 px-10 py-1 text-center '>Logout</button>) : (<li>
                                <Link className='text-lg float-end relative left-[16em] bg-indigo-500 rounded-sm hover:bg-indigo-600 px-10 py-1 text-center ' to='/login'>Login</Link>
                            </li>)}



                        </ul>

                    </div>



                    <div className="hidden md:flex">
                        {/* <a href="#">
                            <i className="fab fa-facebook text-2xl pr-8 transition duration-300 focus:text-indigo-400 hover:text-indigo-400"></i>
                        </a>
                        <a href="#">
                            <i className="fab fa-linkedin text-2xl pr-8 transition duration-300 focus:text-indigo-400 hover:text-indigo-400"></i>
                        </a>
                        <a href="#">
                            <i className="fab fa-instagram text-2xl pr-8 transition duration-300 focus:text-indigo-400 hover:text-indigo-400"></i>
                        </a>
                        <a href="#">
                            <i className="fab fa-twitter text-2xl pr-8 transition duration-300 focus:text-indigo-400 hover:text-indigo-400"></i>
                        </a> */}
                    </div>
                </div>

                {/* MOBILE MENU */}
                {showMobileMenu && (
                    <div className="w-full mx-auto py-8 text-center ">
                        <div className="flex flex-col justify-center items-center w-full">
                            <ul className="">
                                <li className="text-lg pr-8 ">
                                    <Link to='/' className="transition duration-300 focus:outline-none focus:text-indigo-400 focus:underline  hover:text-indigo-400" onClick={toggleMobileMenu}>
                                        Home
                                    </Link>
                                </li>
                                <li className="text-lg pr-8">
                                    <Link to='/profile' className="transition duration-300 focus:outline-none focus:text-indigo-400 focus:underline  hover:text-indigo-400" onClick={toggleMobileMenu}>
                                        Profile
                                    </Link>
                                </li>
                                <li className="text-lg pr-8">
                                    <Link to='/' href="#" className="transition duration-300 focus:outline-none focus:text-indigo-400 focus:underline   hover:text-indigo-400" onClick={toggleMobileMenu}>
                                        Github
                                    </Link>
                                </li>





                            </ul>

                            <div className='mt-5'>
                                {isAuthenticated ? (
                                    <button disabled={loader} onClick={logoutHandler} className='text-lg float-end bg-indigo-500 rounded-sm hover:bg-indigo-600 px-10 py-1 text-center'>Logout</button>
                                ) : (
                                    <Link className='bg-indigo-500 rounded-sm hover:bg-indigo-600 px-10 py-1 text-center' to='/login' onClick={() => { toggleMobileMenu();}}>Login</Link>
                                )}
                            </div>


                        </div>

                    </div>
                )}
            </nav>
        </div>
    );
};

export default Navbar;
