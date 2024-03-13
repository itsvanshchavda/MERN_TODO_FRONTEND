import React, { useContext, useEffect } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Profile from './components/Profile'
import Login from './components/Login'
import Register from './components/Register'
import { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { server } from '../server'
import AuthContext from './context/AuthContext'



const App = () => {

  const { setUser, setIsAuthenticated, setLoader } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      try {
        await axios.get(`${server}/users/profile`, {
          withCredentials: true,
        }).then((res) => {
          setUser(res.data.user);
          setIsAuthenticated(true);
          setLoader(false);
        });
      } catch (error) {
        setUser({})
        setIsAuthenticated(false);
        setLoader(false);
      }
    };

    fetchData();

  }, [setUser, setIsAuthenticated]);



  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App