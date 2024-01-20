import React, { useEffect, useState } from 'react';
import { Table, Pagination, Form } from 'react-bootstrap';
import { MdDashboard } from 'react-icons/md';
import { api } from '../../../apis/axiosConfig';
import { token } from '../../../apis/token.js';
import toast from 'react-hot-toast';

export const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchRollNumber, setSearchRollNumber] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);

  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStudents = (searchRollNumber ? filteredStudents : students).slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(
    (searchRollNumber ? filteredStudents.length : students.length) / itemsPerPage
  );

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
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
        const [dashboardResponse, attendanceResponse] = await Promise.all([
          api.get('/admin/dashboard', token),
          api.get('/admin/attendance', token),
        ]);

        const mergedData = dashboardResponse.data.map((student) => {
          const attendanceInfo = attendanceResponse.data.find(
            (attendance) => attendance.studentid === student.studentid
          );

          return {
            ...student,
            attendanceStatus: attendanceInfo?.attendance_status || 'Unknown',
          };
        });

        setStudents(mergedData);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Error fetching data');
      }
    };

    fetchDashboardData();
    
  },[]);

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

      {currentStudents.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Roll Number</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Today's Attendance Status</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.map((student) => (
              <tr key={student.studentid}>
                <td>{student.roll_number}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.mobile_number}</td>
                <td
                  style={{ color: student.attendanceStatus === 'Present' ? 'green' : 'red' }}
                  className="fw-bold"
                >
                  {student.attendanceStatus}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <h3 className='text-center'>No students found on search.</h3>
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
