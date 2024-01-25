import React, { useEffect, useState } from 'react';
import { Form, FormControl, FormLabel, InputGroup, Spinner } from 'react-bootstrap';
import InputGroupText from 'react-bootstrap/esm/InputGroupText';
import { api } from '../../apis/axiosConfig.js';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const Login = ({ setIsValidUser }) => {
  const host = window.location.host;
  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [isForgotPassword, setForgotPassword] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/admin/login', loginDetails);
      console.log(response.data);
      localStorage.setItem('jwtToken', response.data.token);
      localStorage.setItem('Name', response.data.name);
      localStorage.setItem('ExpiryTime', Date.now() + 86400 * 1000);
      setLoginDetails({
        email: '',
        password: '',
      });
      toast.success(response.data.message);
      let token = localStorage.getItem('jwtToken');
      if (token) {
        setIsValidUser(true);
        navigate('/dashboard');
      }
    } catch (err) {
      toast.error(err.response.data.message);
      setIsValidUser(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let token = localStorage.getItem('jwtToken');
    if (token) {
      setIsValidUser(true);
      navigate('/dashboard');
    }
  }, []);

  const onForgotPassword = (e) => {
    e.preventDefault();
    setLoading(true);

    api
      .post('/admin/resetpassword', { email: loginDetails.email, hostName: host })
      .then((response) => {
        setLoginDetails({
          email: '',
          password: '',
        });
        toast.success(response.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleShowPassword = () => {
    var x = document.getElementById('password');
    if (x.type === 'password') {
      x.type = 'text';
    } else {
      x.type = 'password';
    }
  };

  return (
    <div>
      {!isForgotPassword ? (
        <div className='login-main-card d-flex flex-column justify-content-center'>
          <div className='login-card shadow-lg rounded-4 d-flex justify-content-evenly mx-auto flex-column'>
            <h3 className='m-0 mb-4 fw-bold'>Admin login</h3>
            <Form onSubmit={onSubmit} className='w-100 d-flex flex-column' autoComplete='on'>
              <InputGroup className=''>
                <InputGroupText>📧 </InputGroupText>
                <FormControl
                  type='email'
                  name='email'
                  onChange={onChange}
                  value={loginDetails.email}
                  className='shadow-sm rounded-end '
                  placeholder='Enter your Email'
                  required
                />
              </InputGroup>
              <br />
              <InputGroup>
                <InputGroupText>🔐 </InputGroupText>
                <FormControl
                  type='password'
                  name='password'
                  id='password'
                  onChange={onChange}
                  value={loginDetails.password}
                  className='shadow-sm '
                  placeholder='Enter your password'
                  style={{ borderRight: 'none' }}
                  required
                />{' '}
                <br />
                <InputGroupText
                  style={{ background: 'inherit', borderLeft: 'none', cursor: 'pointer' }}
                  onClick={handleShowPassword}
                >
                  👁️{' '}
                </InputGroupText>
              </InputGroup>
              <br />
              <button
                type='submit'
                title='login'
                className=' login-button d-flex rounded-5 px-4 fw-bold shadow-sm py-2 mx-auto position-relative'
                style={{ width: '100px', textAlign: 'center' }}
                disabled={loading}
              >
                {loading && (
                  <Spinner
                    animation='border'
                    size='sm'
                    className='position-absolute top-50 start-50 translate-middle'
                  />
                )}
                {!loading && 'Login'}
              </button>
            </Form>
            <a className='fw-bold' onClick={() => setForgotPassword(true)}>
              Forgot Password ?
            </a>
          </div>
        </div>
      ) : (
        <div className='login-main-card d-flex flex-column justify-content-center'>
          <div className='login-card shadow rounded-4 d-flex justify-content-evenly mx-auto flex-column'>
            <h3 className='m-0 mb-4'>Forgot Password..!</h3>
            <Form
              onSubmit={onForgotPassword}
              className='w-100 d-flex flex-column justify-content-between'
              autoComplete='off'
            >
              <FormLabel className='h5 lex'>Enter Email: </FormLabel>
              <InputGroup className=''>
                <InputGroupText>📧</InputGroupText>
                <FormControl
                  type='email'
                  name='email'
                  onChange={onChange}
                  value={loginDetails.email}
                  className='shadow-sm rounded-end '
                  placeholder='Enter your Email'
                />
              </InputGroup>
              <br />
              <button
                type='submit'
                title='Reset password'
                className=' login-button d-flex rounded-5 px-4 fw-bold shadow-sm py-2 mx-auto position-relative'
                style={{ width: 'auto', textAlign: 'center' }}
                disabled={loading}
              >
                {loading && (
                  <Spinner
                    animation='border'
                    size='sm'
                    className='position-absolute top-50 start-50 translate-middle'
                  />
                )}
                {!loading && 'Reset Password'}
              </button>
            </Form>
            <a className='fw-bold' onClick={() => setForgotPassword(false)}>
              Login here..!
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
