import React, { useState } from 'react';
import { Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import { IoIosPersonAdd } from 'react-icons/io';
import { api } from '../../../apis/axiosConfig.js';
import { token } from '../../../apis/token.js';
import toast from 'react-hot-toast';

export const AddStudent = () => {
  const generatePassword = () => {
    // Generate an 8-digit random password
    return Math.floor(10000000 + Math.random() * 90000000).toString();
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    password: generatePassword(),
  });

  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValidated(true);

    const requiredFields = ['name', 'email', 'mobileNumber'];
    const hasEmptyField = requiredFields.some((field) => !formData[field]);

    if (hasEmptyField) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true); 

      await api.post(`/admin/addstudent`, {
        name: formData.name,
        email: formData.email,
        mobile_number: formData.mobileNumber,
        password: formData.password,
      }, token).then((response) => {
        toast.success(response.data.message + " roll Number is " + response.data.data);
        toast.success("Student login credentials are sent to their email");
      }).catch((err) => {
        toast.error(err.response.data.message);
      });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setFormData({
        name: '',
        email: '',
        mobileNumber: '',
        password: generatePassword(),
      })
      setLoading(false); 
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h2 className='fw-bold'><IoIosPersonAdd icon={25} />&nbsp; Add Student</h2>
      <br />
      <div>
        <p className='text-danger mt-2 fw-bold'>
          ** Roll Number is !! Auto Generated !! at the server and the rollNumber sent to Student email along with his/her password
        </p>
        <Form noValidate validated={validated} onSubmit={handleSubmit} action='/' className='fw-bold align-items-center'>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" xs="12" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid name.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="12" xs="12" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email address.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="12" xs="12" controlId="mobileNumber">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter Mobile Number"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                minLength="10"
                maxLength="10"
                pattern="[0-9]+"
                required
              />
              <Form.Control.Feedback type="invalid">
                Mobile number must be 10 digits.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="12" xs="12" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid password.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Button type="submit" style={{ background: '#fe5f01' }} disabled={loading}>
            {loading ? (
              <Spinner animation="border" size="sm" role="status" className="me-2">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : null}
            Add Student
          </Button>
        </Form>
      </div>
    </div>
  );
};
