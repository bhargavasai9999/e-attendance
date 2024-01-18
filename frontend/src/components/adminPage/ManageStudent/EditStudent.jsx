import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container, Alert } from 'react-bootstrap';
import { FaEdit } from "react-icons/fa";
import { api } from '../../../apis/axiosConfig';
import { token } from '../../../apis/token';
import toast from 'react-hot-toast'
export const EditStudent = () => {
  const [formData, setFormData] = useState({
    rollNumber: '',
    name: '',
    email: '',
    mobileNumber: '',
    password: '',
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      await api.get(`/admin/student/${searchTerm}`,token).then((res)=>{
        setFormData({
          rollNumber: res.data.data.roll_number || '',
          name: res.data.data.name || '',
          email: res.data.data.email || '',
          mobileNumber: res.data.data.mobile_number || '',
          password: res.data.data.password || '',
        })
        toast.success(res.data.message)
      }).catch((err)=>{
        console.log(err)
        toast.error(err.response.data.message)
      })
      
    } catch (error) {
      console.log(error)
toast.error("Check network connection")  
  }
  };

  const updateData = async () => {
    try {
      await api.put("/admin/editstudent", formData,token).then((res)=>{
        toast.success(res.data.message)
      });
      console.log('Student details updated:', formData);
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  };

  const handleSubmit = async (event) => {
    setFormData({
      rollNumber: '',
      name: '',
      email: '',
      mobileNumber: '',
      password: '',
    })
    event.preventDefault();
    fetchData();

  };

  const handleUpdate = (e) => {
    e.preventDefault()
    updateData(); 
    setFormData({
      rollNumber: '',
      name: '',
      email: '',
      mobileNumber: '',
      password: '',
    })
    setSearchTerm('')
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Container className='overflow-y-scroll'>
      <h2 className='fw-bold'><FaEdit size={30} />&nbsp;Edit Student</h2>

      <Form className='fw-bold text-center' onSubmit={handleSubmit} autoComplete='off'>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2" className='fw-bold'>
            Search by Roll Number
          </Form.Label>
          <Col md="6">
            <Form.Control
              type="text"
              placeholder="Enter Roll Number"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            
            required/>
          </Col>
          <Col sm="2">
            <Button variant="primary" type="submit" className='m-2' style={{ background: '#fe5f01' }}>
              Search
            </Button>
          </Col>
        </Form.Group>
      </Form>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form >
        <Form.Group className="mb-3">
          
          <Form.Label>Roll Number:</Form.Label>
          <Form.Control
            type="text"
            name="rollNumber"
            value={formData.rollNumber}
            readOnly
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mobile Number:</Form.Label>
          <Form.Control
            type="tel"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="text"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" style={{ background: '#fe5f01' }} onClick={handleUpdate}>
          Update Student
        </Button>
      </Form>
    </Container>
  );
};
