import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaMobile } from 'react-icons/fa';
import { CgProfile } from "react-icons/cg";
import { api } from '../../../apis/axiosConfig';
import { token } from '../../../apis/token';
import toast from 'react-hot-toast';
import { Button, Spinner } from 'react-bootstrap';

export const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    mobileNumber: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true); // Set to true initially to show loading spinner

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  useEffect(() => {
    api.get('/admin/profile', token)
      .then((res) => {
        setUser({
          name: res.data.name,
          email: res.data.email,
          password: res.data.password,
          mobileNumber: res.data.mobile_number,
        });
        toast.success("Fetched successfully");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error in fetching details");
      })
      .finally(() => {
        setLoading(false); 
      });
  }, []);

  return (
    <div style={{ fontSize: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 className="mb-4"><CgProfile size={30} /> &nbsp;User Profile</h2>
      <br />
      <div style={{ textAlign: 'center' }}>
        {loading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <>
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
                  <Button
                    variant="link"
                    size="sm"
                    onClick={handleTogglePassword}
                    className="ms-2"
                  >
                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </Button>
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
