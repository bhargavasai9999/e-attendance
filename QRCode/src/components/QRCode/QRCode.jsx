// QRcodePage.js
import React, { useState, useEffect } from 'react';
import { Modal, Button, Navbar, Container, Nav } from 'react-bootstrap';
import QRCode from 'qrcode.react';
import { MdQrCode } from 'react-icons/md';
import { api } from '../../apis/axiosConfig.js';
import { token } from '../../apis/token.js';
import toast from 'react-hot-toast';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';

export const QRcodePage = ({ setIsValidUser }) => {
  const [showLogout, setShowLogout] = useState(false);
  let name = localStorage.getItem('Name');
  const [adminName] = useState(name || 'Administrator');
  const [formattedDate, setFormattedDate] = useState('');
  const [qrCodeContent, setQRCodeContent] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerateQRCode = async () => {
    try {
      setLoading(true); // Set loading to true when generating QR code
      await fetchDataAndUpdateState();
      setShowPopup(true);
    } catch (error) {
      console.error('Error generating QR Code:', error);
      toast.error('Error generating QR Code');
    } finally {
      setLoading(false); // Set loading to false after completion (success or error)
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const fetchDataAndUpdateState = async () => {
    try {
      const response = await api.get(`/admin/generateattendancetoken`, token);

      setQRCodeContent(response.data.AttendanceToken);
      console.log(response.data);
      toast.success('QR Code Updated');
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Error generating QR code');
    }
  };

  useEffect(() => {
    const newDate = new Date();
    const newFormattedDate = newDate.toLocaleDateString();
    setFormattedDate(newFormattedDate);

    const intervalId = setInterval(() => {
      fetchDataAndUpdateState().catch((error) => {
        console.error('Error updating QR Code content:', error);
        toast.error('Error updating QR Code content');
      });
    }, 1 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [adminName]);

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('Name');
    localStorage.removeItem('ExpiryTime');
    setIsValidUser(false);
    toast.success('Logout successful');
    navigate('/login');
  };

  const handleAdminPageClick = () => {
    window.open('http://localhost:3000/admin', '_blank');
  };

  return (
    <div className="vh-100 text-center">
      <Navbar bg="light" expand="lg" variant="light">
        <Container>
          <Navbar.Brand className="d-flex align-items-center" style={{ fontSize: '1.5rem', padding: '5px' }}>
            <img src={logo} className="d-inline-block align-top" alt="Logo" height="30" />
            <span className="ms-2">&nbsp;E-Attendance QR Code Page</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={handleAdminPageClick} className='fw-bold text-decoration-underline'>Open Admin Page</Nav.Link>
            </Nav>
            <Nav>
              <Button variant="outline-danger" onClick={handleLogout}>
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="mt-4">
        <h2 className="d-inline">
          <MdQrCode size={30} />
          &nbsp;Generate QR code for Attendance
        </h2>
        <br />
        <br />

        <h2>Today's Date: {formattedDate}</h2>
        <h2>
          Admin Name: <strong className="text-danger">{adminName}</strong>
        </h2>
        <br />

        <div>
          <Button
            variant="primary"
            onClick={handleGenerateQRCode}
            style={{ backgroundColor: '#fe5f01', border: '0px' }}
            disabled={loading} 
          >
            {loading ? 'Generating QR Code...Wait' : 'Generate QR Code'}
          </Button>
          <p className="text-danger mt-2 fw-bold">
            * Until you click on "Generate QR code," we consider it as a
            holiday, and no records are updated in the database.
            <br />
            * Once you click the button, it is considered a working day.
          </p>
        </div>

        <Modal show={showPopup} onHide={handleClosePopup} size="lg">
          <Modal.Header closeButton>
            <Modal.Title className="h4 fw-bold">Scan QR Code for Attendance</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center p-3">
            <QRCode value={qrCodeContent} size={325} />
            <p className="mt-3 fw-bold">
              Scan the QR code using the E-attendance App to mark attendance.
            </p>
            <p>QR Code changes for every 1 minute</p>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};
