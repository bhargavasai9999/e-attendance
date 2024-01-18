import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Row, Col, Pagination } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { api } from '../../../apis/axiosConfig.js';
import { token } from '../../../apis/token.js';
import toast from 'react-hot-toast';

export const ModifyAttendance = () => {
  const [searchByRoll, setSearchByRoll] = useState(false);
  const [searchByDate, setSearchByDate] = useState(true);
  const [rollNumber, setRollNumber] = useState('');
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  const [searchResults, setSearchResults] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedStatus, setEditedStatus] = useState('Present');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    handleSearch();
  }, []);

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  }

  const handleSearch = async () => {
    try {
      if (!searchByRoll && !searchByDate) {
        toast.error("Select at least one search option");
        return;
      }
      setSearchResults([])

      await api.post(`/admin/getattendance`, {
        rollNumber: searchByRoll ? rollNumber.toUpperCase() : null,
        date: searchByDate ? selectedDate : null,
      }, token).then((res) => {
        setSearchResults(res.data);
        toast.success("Fetched details on selected date or Roll Number");
        setEditingIndex(null);
        setCurrentPage(1);
      }).catch((err) => {
        toast.error(err.response.data.message);
      });

    } catch (error) {
      toast.error('Failed to fetch attendance data');
      console.error('Error fetching attendance data:', error);
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedStatus(searchResults[index].attendance_status);
  };

  const handleSave = async () => {
    try {
      const res = await api.put(
        "/admin/updateattendance",
        {
          status: editedStatus,
          attendance_id: searchResults[editingIndex].attendance_id,
          student_id: searchResults[editingIndex].student_id,
        },
        token
      );

      console.log(res.data);
      toast.success(res.data.message);
      const updatedData = [...searchResults];
      updatedData[editingIndex].attendance_status = editedStatus;
      setEditingIndex(null);
      setSearchResults(updatedData);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.message || 'Failed to Update');
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditedStatus('Present');
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
      <h2 className=''><FaEdit icon={30} />&nbsp;View & Modify Attendance</h2>
      <br />

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

      <br />

      {searchResults.length > 0 ? (
        <div>
          <Table hover>
            <thead>
              <tr>
                <th>Roll Number</th>
                <th>Name</th>
                <th>Date</th>
                <th>Status</th>
                <th>Checkin</th>
                <th>Checkout</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentResults.map(({ attendance_id, roll_number, name, created_at, attendance_status, checkin_time, checkout_time }, index) => (
                <tr key={attendance_id}>
                  <td>{roll_number}</td>
                  <td>{name}</td>
                  <td>{new Date(created_at).toLocaleDateString()}</td>
                  <td style={{ color: editedStatus === 'Present' ? 'green' : 'red', fontWeight: 'bold' }}>
                    {index === editingIndex ? (
                      <Form.Control
                        as="select"
                        value={editedStatus}
                        onChange={(e) => setEditedStatus(e.target.value)}
                      >
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                      </Form.Control>
                    ) : (
                      attendance_status
                    )}
                  </td>
                  <td>{checkin_time}</td>
                  <td>{checkout_time}</td>
                  <td>
                    {index === editingIndex ? (
                      <div>
                        <Button variant="success" onClick={handleSave}>
                          Save
                        </Button>{' '}
                        <Button variant="secondary" onClick={handleCancel}>
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <Button variant="warning" onClick={() => handleEdit(index)}>
                        Edit
                      </Button>
                    )}
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
        <h3 className='text-center'> <br />No students found on search.</h3>
      )}
    </div>
  );
}
