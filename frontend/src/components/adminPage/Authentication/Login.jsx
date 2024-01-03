import React, { useState } from 'react'
import "./login.css";
import { Form, FormControl, InputGroup} from 'react-bootstrap'
import InputGroupText from 'react-bootstrap/esm/InputGroupText'
import {api} from '../../../apis/axiosConfig.js';
import toast, { Toaster } from 'react-hot-toast';
export const Login = () => {
const [loginDetails,setloginDetails]=useState({
  email:"",
  password:""
})
const [isForgotPassword,setForgotPassword]=useState(false);
const onChange=(e)=>{
  setloginDetails({...loginDetails,[e.target.name]:e.target.value})
}
const onSubmit=(e)=>{
  e.preventDefault();
  api.post("/login",loginDetails).then((response)=>{
    console.log(response.data);
    localStorage.setItem('jwtToken',response.data.token)
    setloginDetails({
      email:"",
      password:""

    })
    toast.success(response.data.message,)
  }).catch((err)=>{
    toast.error(err.response.data.message)
  })
}

const onForgotPassword=(e)=>{
  e.preventDefault();
  api.post("/resetpassword",{email:loginDetails.email}).then((response)=>{
    setloginDetails({
      email:"",
      password:""

    })
    toast.success(response.data.message,)
  }).catch((err)=>{
    toast.error(err.response.data.message)
  })
}
const handleshowpassword = () => {
  var x = document.getElementById('password');
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
};


  return (
    <div>
      {!isForgotPassword ?
      (<div className='login-main-card d-flex flex-column justify-content-center'>
      <div className="login-card shadow rounded-4 d-flex justify-content-evenly mx-auto flex-column">
        <h3 className='m-0 mb-4 text-white'>Admin login</h3>
        <Form onSubmit={onSubmit} className='w-100 d-flex flex-column justify-content-between' autoComplete='off'>
          <InputGroup className="">
          
          <InputGroupText>📧 </InputGroupText>
          <FormControl type="email" name="email" onChange={onChange} value={loginDetails.email}
           className='shadow-sm rounded-end ' placeholder='Enter your Email'  />
           
           </InputGroup>
           <br/>
       
           <InputGroup >
          <InputGroupText>🔐 </InputGroupText>
          <FormControl type="password" name="password" id="password" onChange={onChange} value={loginDetails.password}
           className='shadow-sm rounded-end ' placeholder='Enter your password'/> <br/>
           
           </InputGroup>
           
           <h6 className='mt-3 text-white'> <input type='checkbox' onClick={handleshowpassword}  /> &nbsp; Show password</h6>
           <br/>
           <button type="submit" title='login' className=' login-button d-flex rounded-5 px-4 fw-bold shadow-sm py-2 mx-auto ' style={{width:"100px",textAlign:"center"}}>Login</button>
        </Form>
        <a className='text-white fw-bold' onClick={()=>setForgotPassword(true)}>Forgot Password ?</a>
      </div>
      
    </div>) 
    :
   <div className='login-main-card d-flex flex-column justify-content-center'>
    <div className="login-card shadow rounded-4 d-flex justify-content-evenly mx-auto flex-column">
      <h3 className='m-0 mb-4 text-white'>Forgot Password..!</h3>
      <Form onSubmit={onForgotPassword} className='w-100 d-flex flex-column justify-content-between' autoComplete='off'>
        <InputGroup className="">
        <InputGroupText>📧</InputGroupText>
        <FormControl type="email" name="email" onChange={onChange} value={loginDetails.email}
         className='shadow-sm rounded-end ' placeholder='Enter your Email'  />
         </InputGroup>
         <br/>
         <button type="submit" title='Reset password' className=' login-button d-flex rounded-5 px-4 fw-bold shadow-sm py-2 mx-auto ' style={{width:"auto",textAlign:"center"}}>Reset Password</button>
      </Form>
      <a className='text-white fw-bold' onClick={()=>setForgotPassword(false)}>Login here..!</a>
    </div>
  </div>
      }
    </div>
  )
}
