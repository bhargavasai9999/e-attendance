import { Navigate, Route, Routes } from 'react-router-dom';
import { Login } from './components/adminPage/Authentication/Login';
import { ForgotPassword } from './components/adminPage/Authentication/ForgotPassword';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AdminSidebar } from './components/adminPage/Sidebar/Sidebar';
import { Logout } from './components/adminPage/Authentication/Logout';
import { api } from './apis/axiosConfig';
import toast from 'react-hot-toast';

const App = () => {
  const[isValidUser,setIsValidUser]=useState(false)
  
  const isAuthenticated = () => {
    const token = localStorage.getItem('jwtToken');
    const name = localStorage.getItem('Name');
    const expireTime = localStorage.getItem('ExpiryTime');
    
    if (token && name && expireTime) {
      if (parseInt(expireTime, 10) > Date.now() && parseInt(expireTime, 10) <= Date.now() + 86400 * 1000) {
        setIsValidUser(true);
      } else {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('Name');
        localStorage.removeItem('ExpireTime');
        setIsValidUser(false);
      }
    } else {
      setIsValidUser(false);
    }
  };
  
useEffect(()=>{
  isAuthenticated()
  const CheckServer=async()=>{
    await api.get('/').then((res)=>{
      if(res.status!=200){
        toast.error("server connected ")
      }

    }).catch((err)=>{
      toast.error("Unable to connect server / check  internet connection")
    })
  }
  CheckServer()
},[])
  return (
    <>
      <Routes>
        
        
        {isValidUser ? (
          <>
            <Route path='/*' element={<Navigate to='/dashboard' /> }/>
            <Route path="/Dashboard" element={<AdminSidebar />} />
            <Route path="/addstudent" element={<AdminSidebar />} />
            <Route path="/editstudent" element={<AdminSidebar />} />
            <Route path="/viewanddelete" element={<AdminSidebar />} />
            <Route path="/viewandmodifyattendance" element={<AdminSidebar />} />
            <Route path="/QRCode" element={<AdminSidebar />} />
            <Route path="/Profile" element={<AdminSidebar />} />
            <Route path='/logout' element={<Logout setIsValidUser={setIsValidUser}/>}/>
          </>
        ) : (
          <>
          <Route path='/*' element={<Navigate to='/login' />} />
        <Route path='/login' element={<Login setIsValidUser={setIsValidUser}/>} />
        <Route path='/resetpassword/:token' element={<ForgotPassword />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
