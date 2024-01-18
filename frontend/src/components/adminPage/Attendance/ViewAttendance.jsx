
import React, { useState } from 'react';
import { Table, Form, Button, Row, Col, Pagination } from 'react-bootstrap';
import { FaEye } from "react-icons/fa";

export const ViewAttendance = () => {
  const [searchByRoll, setSearchByRoll] = useState(true);
  const [searchByDate, setSearchByDate] = useState(false);
  const [rollNumber, setRollNumber] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const handleSearch = () => {

    const sampleData = [
      { rollNumber: 1, name: 'John Doe', date: '2022-01-01', status: 'Present' },
      { rollNumber: 2, name: 'Jane Smith', date: '2022-01-01', status: 'Absent' },
      { rollNumber: 1, name: 'John Doe', date: '2022-01-02', status: 'Present' },
      { rollNumber: 1, name: 'John Doe', date: '2022-01-01', status: 'Present' },
      { rollNumber: 2, name: 'Jane Smith', date: '2022-01-01', status: 'Absent' },
      { rollNumber: 1, name: 'John Doe', date: '2022-01-02', status: 'Present' },
      { rollNumber: 1, name: 'John Doe', date: '2022-01-01', status: 'Present' },
      { rollNumber: 2, name: 'Jane Smith', date: '2022-01-01', status: 'Absent' },
      { rollNumber: 1, name: 'John Doe', date: '2022-01-02', status: 'Present' },
      

      
      { rollNumber: 1, name: 'John Doe', date: '2022-01-01', status: 'Present' },
      { rollNumber: 2, name: 'Jane Smith', date: '2022-01-01', status: 'Absent' },
      { rollNumber: 1, name: 'John Doe', date: '2022-01-02', status: 'Present' },
    ];

    let results = sampleData;

    if (searchByRoll && rollNumber) {
      results = results.filter((entry) => entry.rollNumber.toString() === rollNumber);
    }

    if (searchByDate && selectedDate) {
      results = results.filter((entry) => entry.date === selectedDate);
    }

    setSearchResults(results);
    setCurrentPage(1); 
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentResults = searchResults.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(searchResults.length / itemsPerPage);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h2 className=''><FaEye icon={30}/> &nbsp;View Attendance</h2>
      <br/>

      <Form>
        <Form.Group as={Row} className="mb-3">
          <Col>
            <Form.Check
              type="checkbox"
              label="Search by Roll Number"
              checked={searchByRoll}
              onChange={() => setSearchByRoll(!searchByRoll)}
            />
          </Col>
          <Col>
            <Form.Control
              type="text"
              placeholder="Enter Roll Number"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              disabled={!searchByRoll}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col>
            <Form.Check
              type="checkbox"
              label="Search by Date"
              checked={searchByDate}
              onChange={() => setSearchByDate(!searchByDate)}
            />
          </Col>
          <Col>
            <Form.Control
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              disabled={!searchByDate}
            />
          </Col>
        </Form.Group>

        <Button variant="primary" onClick={handleSearch}>
          Search
        </Button>
      </Form>

      <br/>

      {currentResults.length > 0 && (
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Roll Number</th>
                <th>Name</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentResults.map((result, index) => (
                <tr key={index}>
                  <td>{result.rollNumber}</td>
                  <td>{result.name}</td>
                  <td>{result.date}</td>
                  <td>{result.status}</td>
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
      )}
    </div>
  );
};
