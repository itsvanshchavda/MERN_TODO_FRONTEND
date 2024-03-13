import React, { useContext, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import AuthContext from '../context/AuthContext';
import { server } from '../../server';

const ForgotPass = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showModel, setShowModel] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const { isAuthenticated, setLoader, loader } = useContext(AuthContext);

  const emailSender = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const { data } = await axios.post(`${server}/users/forgotpassword`, {
        email
      }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
      toast.success(data.message);
      setShowModel(true);
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      setLoader(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const { data } = await axios.post(`${server}/users/resetpassword`, {
        password, otp
      }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
      toast.success(data.message);
      setShowModel(false);
      setRedirect(true);
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      setLoader(false);
    }
  };

  if (isAuthenticated) return <Navigate to="/" />;

  if (redirect) return <Navigate to="/login" />;

  return (
    <div>
      <main id="content" role="main" className="w-full py-[10rem] max-w-md mx-auto p-6 text-black ">
        <div className="mt-7 bg-white  rounded-xl shadow-lg border-2 border-indigo-300 ">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 ">Forgot password?</h1>
              <p className="mt-2 text-sm text-gray-600 ">
                Remember your password?
                <Link to='/login' className="text-blue-600 decoration-2 px-1 hover:underline font-medium" href="#">
                  Login here
                </Link>
              </p>
            </div>

            <div className="mt-5">
              <form onSubmit={emailSender} >
                <div className="grid gap-y-4">
                  <div>
                    <label className="block text-sm font-bold ml-1 mb-2 ">Email address</label>
                    <div className="relative">
                      <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" className="py-3 text-[17px] px-4 block w-full border-2 border-gray-200 rounded-md  focus:border-blue-500 focus:ring-blue-500 shadow-sm" required aria-describedby="email-error" />
                    </div>
                    <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
                  </div>
                  <button disabled={loader} type="submit" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-indigo-500 text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm ">Reset password</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {showModel && (
          <form onSubmit={handleVerify}>
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center">
              <div className="w-[400px] flex flex-col justify-center items-center bg-white rounded-md shadow-lg">
                <button onClick={() => setShowModel(false)} className="text-gray-700 text-lg font-bold self-end p-2">X</button>

                <div className="p-8 text-center">
                  <input value={otp} type="number" onChange={(e) => setOtp(e.target.value)} className="w-full border rounded-md px-4 py-2 mb-4" placeholder="Enter OTP" />
                  <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="w-full border rounded-md px-4 py-2 mb-4" placeholder="New Password" />

                  <button type="submit" className="w-full bg-indigo-500 text-white rounded-md py-2 hover:bg-indigo-600 transition duration-300">Submit</button>
                </div>
              </div>
            </div>
          </form>
        )}
      </main>
    </div>
  );
};

export default ForgotPass;
