import React, { useState } from 'react';
import { Form, Button, Table, Container, Row, Col, Spinner } from 'react-bootstrap';
import { MdDelete } from 'react-icons/md';
import { api } from '../../../apis/axiosConfig.js';
import { token } from '../../../apis/token.js';
import toast from 'react-hot-toast';

export const DeleteStudent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [studentDetails, setStudentDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/admin/student/${searchTerm}`, token);
      setStudentDetails({
        rollNumber: response.data.data.roll_number || " ",
        name: response.data.data.name || " ",
        email: response.data.data.email || " ",
        mobileNumber: response.data.data.mobile_number || " ",
        password: response.data.data.password || " ",
      });
      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await api.delete(`/admin/deletestudent/${searchTerm}`, token);
      console.log(response);
      toast.success("Deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Error deleting student');
    } finally {
      setSearchTerm('');
      setStudentDetails(null);
      setLoading(false);
    }
  };

  return (
    <Container>
      <h2 className='fw-bold '><MdDelete size={30} />&nbsp;View & Delete Student</h2>
      <br />

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
            <Button
              variant="primary"
              onClick={fetchData}
              style={{ background: '#fe5f01' }}
              disabled={loading}
            >
              {loading ? (
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              ) : (
                'Search'
              )}
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
        <Button
          variant="danger"
          onClick={handleDelete}
          disabled={loading}
        >
          {loading ? (
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
          ) : (
            'Delete Student'
          )}
        </Button>
      )}
    </Container>
  );
};
