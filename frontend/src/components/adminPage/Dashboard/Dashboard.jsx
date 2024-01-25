import React, { useEffect, useState } from 'react';
import { Table, Pagination, Form, Spinner } from 'react-bootstrap';
import { MdDashboard } from 'react-icons/md';
import { api } from '../../../apis/axiosConfig';
import { token } from '../../../apis/token.js';
import toast from 'react-hot-toast';

export const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchRollNumber, setSearchRollNumber] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true); 

  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentStudents = () => {
    const dataToUse = searchRollNumber ? filteredStudents : students;

    if (!Array.isArray(dataToUse) || dataToUse.length === 0) {
      return [];
    }

    const startIndex = Math.max(0, indexOfFirstItem);
    const endIndex = Math.min(dataToUse.length, indexOfLastItem);

    return dataToUse.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(
    (searchRollNumber ? filteredStudents.length : students.length) / itemsPerPage
  );

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toUpperCase();
    setSearchRollNumber(searchTerm);

    const filteredData = students.filter(
      (student) => student.roll_number.toString().includes(searchTerm)
    );
    setCurrentPage(1);
    setFilteredStudents(filteredData);
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const dashboardResponse = await api.get('/admin/dashboard', token);

        setStudents(dashboardResponse.data);
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Error fetching data');
        setLoading(false); 
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div>
      <h1>
        <MdDashboard size={35} />
        &nbsp;Admin Dashboard
      </h1>

      <Form.Group controlId="searchRollNumber" className="d-inline">
        <Form.Label className="fw-bold">Search by Roll Number:</Form.Label> &nbsp;&nbsp;&nbsp;
        <Form.Control
          type="text"
          placeholder="Enter Roll Number"
          value={searchRollNumber}
          onChange={handleSearch}
          style={{ width: '300px' }}
          className="d-inline"
        />
      </Form.Group>

      <br />
      <br />

      {loading ? ( 
        <div className="text-center"> 
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
      ) : currentStudents().length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Roll Number</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Today Attendance status</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents().map((student) => (
              <tr key={student.studentid}>
                <td>{student.roll_number}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.mobile_number}</td>
                <td
                  style={{ color: student.attendance_status === 'Present' ? 'green' : 'red' }}
                  className="fw-bold"
                >
                  {student.attendance_status || 'Unknown'}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <h3 className="text-center">No students found.</h3>
      )}

      <Pagination>
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePagination(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};
