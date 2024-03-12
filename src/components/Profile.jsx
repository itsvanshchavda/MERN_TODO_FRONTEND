import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import Loader from './Loader';

const Profile = () => {
  const { isAuthenticated, loader, user } = useContext(AuthContext);
  


  return <>
    {loader && <Loader />}
    {isAuthenticated ? (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Welcome {user?.name}</h1>
          <h2 className="text-2xl font-bold mb-4">Your Email: {user?.email}</h2>
        </div>
      </div>
    ) : (
      <h1 className="text-3xl font-bold mb-4">Please Login to view your profile</h1>
    )}
  </>

}

export default Profile