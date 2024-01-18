import { Navigate, Route, Routes } from 'react-router-dom';
import { Login } from './components/adminPage/Authentication/Login';
import { ForgotPassword } from './components/adminPage/Authentication/ForgotPassword';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AdminSidebar } from './components/adminPage/Sidebar/Sidebar';
import { Logout } from './components/adminPage/Authentication/Logout';

const App = () => {
  const[isValidUser,setIsValidUser]=useState(false)
  
   const isAuthenticated=()=>{
    let token=localStorage.getItem('jwtToken')
    let name=localStorage.getItem('Name')
    if(token && name){
        setIsValidUser(true)
    }
    else{
        setIsValidUser(false)
    }
}
useEffect(()=>{
  isAuthenticated()
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
