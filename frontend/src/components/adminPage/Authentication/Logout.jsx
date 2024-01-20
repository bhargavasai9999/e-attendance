import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
export const Logout = ({setIsValidUser}) => {
    const navigate=useNavigate()
    useEffect(()=>{
        localStorage.removeItem('jwtToken')
        localStorage.removeItem('Name')
        localStorage.removeItem('ExpiryTime')
        setIsValidUser(false)
        toast.success("Logout successful")
        navigate('/login')
    },[])

  return (
    <div>Logout Successful</div>
  )
}
