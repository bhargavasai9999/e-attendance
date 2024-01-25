import React from 'react'
import "./login.css";

import { useState } from 'react'
import {Form,FormControl,InputGroup} from 'react-bootstrap'
import InputGroupText from 'react-bootstrap/esm/InputGroupText'
import { useParams } from 'react-router-dom'
import { api } from '../../apis/axiosConfig.js'
import toast from 'react-hot-toast'

 export const ForgotPassword = () => {
  const {user,token}=useParams()
    const [newPassword,setnewPassword]=useState({
        password:"",
        confirmPassword:""
    })
    const onChange=(e)=>{
      setnewPassword({...newPassword,[e.target.name]:e.target.value})
    }
    const onSubmit=(e)=>{
        e.preventDefault();
        if(newPassword.password===newPassword.confirmPassword){
          api.put(`/${user}/updatepassword`,{token:token,new_Password:newPassword.password}).then((response)=>{
            console.log(response.data.message);
            toast.success(response.data.message)
          }).catch((error)=>{
            toast.error(error.response.data.message)
            console.log(error)
          })
        }
        else{
          toast.error("Password not matched")
          return
        }
        
        
    }
  return (
    <div className='login-main-card d-flex flex-column justify-content-center'>
      <div className="login-card shadow rounded-4 d-flex justify-content-evenly mx-auto flex-column">
        <h3 className='m-0 mb-4'>Reset Password</h3>
        <Form onSubmit={onSubmit} className='w-100 d-flex flex-column justify-content-between' autoComplete='off'>
          <InputGroup className="">
          
          <InputGroupText>🔐 </InputGroupText>
          <FormControl type="password" name="password" onChange={onChange} value={newPassword.password}
           className='shadow-sm rounded-end ' placeholder='New Password' required />
           
           </InputGroup>
           <br/>
       
           <InputGroup >
          <InputGroupText>🔐 </InputGroupText>
          <FormControl type="text" name="confirmPassword"  onChange={onChange} value={newPassword.confirmPassword}
           className='shadow-sm rounded-end ' placeholder='Confirm new password' required/> <br/>
           
           </InputGroup>
           <br/>

           <button type="submit" title='Update Password' className=' login-button d-flex rounded-5 px-4 fw-bold shadow-sm py-2 mx-auto ' style={{width:"auto",textAlign:"center"}}>Update Password</button>
        </Form>
      </div>
      
    </div>
  )
}
