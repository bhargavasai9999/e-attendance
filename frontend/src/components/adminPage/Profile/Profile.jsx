import React, { useState,useEffect } from 'react';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaMobile } from 'react-icons/fa';
import { CgProfile } from "react-icons/cg";
import { api } from '../../../apis/axiosConfig';
import { token } from '../../../apis/token';
import toast from 'react-hot-toast';
export const Profile = () => {
  const [user,setuser]=useState(
    {
      name:'',
      email: '',
      password: '',
      mobileNumber: '', 
    }
  )

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  useEffect( ()=>{
    api.get('/admin/profile',token).then((res)=>{
      setuser({
        name:res.data.name,
        email: res.data.email,
        password: res.data.password,
        mobileNumber: res.data.mobile_number, 
      })
      toast.success("fetched successfully")
   
    }).catch((err)=>{
      console.log(err)
      toast.error("Error in fetching details")
    })
  },[])

  return (
    <div  style={{ fontSize: '20px' }}>
      <h2 className="mb-4"><CgProfile size={30}/> &nbsp;User Profile</h2>
      <br/>
    <div style={{textAlign:'center'}}>
    <div className="d-flex align-items-center mb-3">
        <FaUser size={20} className="me-2" />
        <div>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
        </div>
      </div>

      <div className="d-flex align-items-center mb-3">
        <FaEnvelope size={20} className="me-2" />
        <div>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      </div>

      <div className="d-flex align-items-center mb-3">
        <FaMobile size={20} className="me-2" />
        <div>
          <p>
            <strong>Mobile Number:</strong> {user.mobileNumber}
          </p>
        </div>
      </div>

      <div className="d-flex align-items-center mb-3">
        <FaLock size={20} className="me-2" />
        <div>
          <p className="d-flex align-items-center">
            <strong>Password:</strong>{' '}
            {showPassword ? user.password : '*'.repeat(user.password.length)}
            <button
              onClick={handleTogglePassword}
              className="btn btn-link btn-sm ms-2"
            >
              {showPassword ? <FaEyeSlash size={20}/> : <FaEye size={20} />}
            </button>
          </p>
        </div>
      </div>
      </div>
      
    </div>
  );
};
