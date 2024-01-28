import React, { useEffect, useState } from 'react';
import { Table, Pagination, Form, Spinner, Dropdown, DropdownButton } from 'react-bootstrap';
import { MdDashboard } from 'react-icons/md';
import { api } from '../../../apis/axiosConfig';
import { token } from '../../../apis/token.js';
import toast from 'react-hot-toast';
import { FaFileExcel, FaFilePdf } from 'react-icons/fa';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Exportexcel } from '../../../utils/Exportexcel.js';

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

  const handleExport = (type) => {
    const date=new Date()
    if (type === 'excel') {
      Exportexcel(students, `Students-${date.toLocaleDateString() || ''}`);
    } else if (type === 'pdf') {
      exportToPdf(date);
    }
  };

  const exportToPdf = (date) => {
    if (currentStudents().length > 0) {
      const pdf = new jsPDF();
      pdf.autoTable({
        head: [['Roll Number', 'Name', 'Email', 'Mobile', 'Attendance Status']],
        body: students.map(({ roll_number, name, email, mobile_number, attendance_status }) => [
          roll_number,
          name,
          email,
          mobile_number,
          attendance_status || 'Unknown',
        ])
    })
         const blob = pdf.output('blob');
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `Students-${date.toLocaleDateString() || ''}`;
      a.click();

      URL.revokeObjectURL(url);
    } else {
      toast.error('No data to export to PDF.');
    }
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
        <DropdownButton variant="secondary" title="Export" className=' d-inline mx-4'>
            <Dropdown.Item onClick={() => handleExport('excel')}>
              <FaFileExcel /> Export to Excel
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleExport('pdf')}>
              <FaFilePdf /> Export to PDF
            </Dropdown.Item>
          </DropdownButton>
      </Form.Group>

      <br />
      <br/>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : currentStudents().length > 0 ? (
        <div>
          

          <Table striped bordered hover id="dashboardTable">
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
                    style={{
                      color: student.attendance_status === 'Present' ? 'green' : 'red',
                    }}
                    className="fw-bold"
                  >
                    {student.attendance_status || 'Unknown'}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

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
      ) : (
        <h3 className="text-center">No students found.</h3>
      )}
    </div>
  );
};
