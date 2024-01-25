import { Navigate, Route, Routes } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Login} from './components/Authentication/Login.jsx'
import {QRcodePage} from './components/QRCode/QRCode.jsx'
import {ForgotPassword} from './components/Authentication/ForgotPassword.jsx'
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
            <Route path='/*' element={<Navigate to='/QRCode' /> }/>
            
            <Route path="/QRCode" element={<QRcodePage setIsValidUser={setIsValidUser} />} />
          </>
        ) : (
          <>
          <Route path='/*' element={<Navigate to='/login' />} />
        <Route path='/login' element={<Login setIsValidUser={setIsValidUser}/>} />
        <Route path='/updatepassword/:user/:token' element={<ForgotPassword/>}/>

          </>
        )}
      </Routes>
    </>
  );
};

export default App;
