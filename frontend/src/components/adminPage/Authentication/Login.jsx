import React, { useState } from 'react'
import "./login.css";
import { Form, FormControl, FormLabel, InputGroup} from 'react-bootstrap'
import InputGroupText from 'react-bootstrap/esm/InputGroupText'
import {api} from '../../../apis/axiosConfig.js';
import toast from 'react-hot-toast';
export const Login = () => {
  const host=window.location.host
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
  api.post("/resetpassword",{email:loginDetails.email,hostName:host}).then((response)=>{
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
      <div className="login-card shadow-lg rounded-4 d-flex justify-content-evenly  mx-auto flex-column">
        <h3 className='m-0 mb-4 fw-bold'>Admin login</h3>
        <Form onSubmit={onSubmit} className='w-100 d-flex flex-column' autoComplete='on'>
          <InputGroup className="">
          
          <InputGroupText>📧 </InputGroupText>
          <FormControl type="email" name="email" onChange={onChange} value={loginDetails.email}
           className='shadow-sm rounded-end ' placeholder='Enter your Email' required />
           
           </InputGroup>
           <br/>
       
           <InputGroup >
          <InputGroupText>🔐 </InputGroupText>
          <FormControl type="password" name="password" id="password" onChange={onChange} value={loginDetails.password}
           className='shadow-sm  ' placeholder='Enter your password' style={{borderRight:"none"}} required/> <br/>
                     <InputGroupText style={{background:"inherit",borderLeft:"none",cursor:"pointer"}} onClick={handleshowpassword} >👁️ </InputGroupText>

           </InputGroup>
           
           {/* <h6 className='mt-3 fw-bold d-flex mx-1'> <input type='checkbox'  /> &nbsp; Show password</h6> */}
           <br/>
           <button type="submit" title='login' className=' login-button d-flex rounded-5 px-4 fw-bold shadow-sm py-2 mx-auto ' style={{width:"100px",textAlign:"center"}}>Login</button>
        </Form>
        <a className='fw-bold' onClick={()=>setForgotPassword(true)}>Forgot Password ?</a>
      </div>
      
    </div>) 
    :
   <div className='login-main-card d-flex flex-column justify-content-center'>
    <div className="login-card shadow rounded-4 d-flex justify-content-evenly mx-auto flex-column">
      <h3 className='m-0 mb-4'>Forgot Password..!</h3>
      <Form onSubmit={onForgotPassword} className='w-100 d-flex flex-column justify-content-between' autoComplete='off'>
        
        <FormLabel className='h5 lex'>Enter Email: </FormLabel>
        <InputGroup className="">
        <InputGroupText>📧</InputGroupText>
        <FormControl type="email" name="email" onChange={onChange} value={loginDetails.email}
         className='shadow-sm rounded-end ' placeholder='Enter your Email'  />
         </InputGroup>
         <br/>
         <button type="submit" title='Reset password' className=' login-button d-flex rounded-5 px-4 fw-bold shadow-sm py-2 mx-auto ' style={{width:"auto",textAlign:"center"}}>Reset Password</button>
      </Form>
      <a className='fw-bold' onClick={()=>setForgotPassword(false)}>Login here..!</a>
    </div>
  </div>
      }
    </div>
  )
}
