import React, { useState } from 'react';
import { Form, Button, Table, Container, Row, Col } from 'react-bootstrap';
import { MdDelete } from 'react-icons/md';
import { api } from '../../../apis/axiosConfig.js';
import { token } from '../../../apis/token.js';
import toast from 'react-hot-toast'
export const DeleteStudent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [studentDetails, setStudentDetails] = useState(null);

  const sampleData = {
    rollNumber: '123456',
    name: 'John Doe',
    email: 'john.doe@example.com',
    mobileNumber: '1234567890',
    password: 'samplepassword',
  };

  const fetchData = async() => {
    await api.get(`/admin/student/${searchTerm}`,token).then((res)=>{
      console.log(res.data.data)
      setStudentDetails({
        rollNumber: res.data.data.roll_number || " ",
        name: res.data.data.name || " ",
        email: res.data.data.email || " ",
        mobileNumber: res.data.data.mobile_number || " ",
        password: res.data.data.password || " ",
      });
      toast.success(res.data.message)

    }).catch((err)=>{
      console.log(err)
      toast.error(err.response.data.message)
    })
    
  };

  const handleDelete = async() => {
    await api.delete(`/admin/deletestudent/${searchTerm}`,token).then((res)=>{
      console.log(res)
      toast.success("deleted successfully")
    }).catch((err)=>{
      console.log(err)
    })
    console.log('Deleting student with details:', studentDetails);
    setSearchTerm('');
    setStudentDetails(null);
  };

  return (
    <Container>
      <h2 className='fw-bold '><MdDelete size={30} />&nbsp;View & Delete Student</h2>
      <br/>

      <Form className='fw-bold'>
        <Row className="mb-3">
          <Form.Label column sm="2">
            Search by Roll Number
          </Form.Label>
          <Col sm="8">
            <Form.Control
              type="text"
              placeholder="Enter Roll Number"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col sm="2">
            <Button variant="primary" onClick={fetchData} style={{background:'#fe5f01'}}>
              Search
            </Button>
          </Col>
        </Row>
      </Form>

      {studentDetails && (
        <Table striped bordered hover>
          <tbody>
            <tr>
              <td>Roll Number</td>
              <td>{studentDetails.rollNumber}</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>{studentDetails.name}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{studentDetails.email}</td>
            </tr>
            <tr>
              <td>Mobile Number</td>
              <td>{studentDetails.mobileNumber}</td>
            </tr>
            <tr>
              <td>Password</td>
              <td>{studentDetails.password}</td>
            </tr>
          </tbody>
        </Table>
      )}

      {studentDetails && (
        <Button variant="danger" onClick={handleDelete}>
          Delete Student
        </Button>
      )}
    </Container>
  );
};
