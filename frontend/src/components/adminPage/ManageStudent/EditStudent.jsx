import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container, Alert, Spinner } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { api } from '../../../apis/axiosConfig';
import { token } from '../../../apis/token';
import toast from 'react-hot-toast';

export const EditStudent = () => {
  const [formData, setFormData] = useState({
    rollNumber: '',
    name: '',
    email: '',
    mobileNumber: '',
    password: '',
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm.trim() !== '') {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await api.get(`/admin/student/${searchTerm}`, token);

      setFormData({
        rollNumber: response.data.data.roll_number || '',
        name: response.data.data.name || '',
        email: response.data.data.email || '',
        mobileNumber: response.data.data.mobile_number || '',
        password: response.data.data.password || '',
      });

      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Error fetching student details');
    } finally {
      setLoading(false);
    }
  };

  const updateData = async () => {
    try {
      setLoading(true);

      await api.put('/admin/editstudent', formData, token);

      toast.success('Student details updated');
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to update student details');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateData();
    setFormData({
      rollNumber: '',
      name: '',
      email: '',
      mobileNumber: '',
      password: '',
    });
    setSearchTerm('');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <Container className='overflow-y-scroll'>
      <h2 className='fw-bold'><FaEdit size={30} />&nbsp;Edit Student</h2>

      <Form className='fw-bold text-center' onSubmit={handleSubmit} autoComplete='on'>
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
              required
            />
          </Col>
          <Col sm="2">
            <Button variant="primary" type="submit" className='m-2' style={{ background: '#fe5f01' }}>
              {loading ? <Spinner animation="border" size="sm" /> : 'Search'}
            </Button>
          </Col>
        </Form.Group>
      </Form>

      <Form>
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
          {loading ? <Spinner animation="border" size="sm" /> : 'Update Student'}
        </Button>
      </Form>
    </Container>
  );
};
