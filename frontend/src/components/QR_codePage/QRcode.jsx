import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import QRCode from 'qrcode.react';
import { MdQrCode } from 'react-icons/md';
import { api } from '../../apis/axiosConfig';
import { token } from '../../apis/token';
import toast from 'react-hot-toast';

const QRcodePage = () => {
  let name=localStorage.getItem('Name')
  const [adminName] = useState(name ||'Administrator');
  const [formattedDate, setFormattedDate] = useState('');
  const [qrCodeContent, setQRCodeContent] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleGenerateQRCode = async () => {
    try {
      await fetchDataAndUpdateState();
      setShowPopup(true);
    } catch (error) {
      console.error('Error generating QR Code:', error);
      toast.error('Error generating QR Code');
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
    }, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [adminName]);

  return (
    <div>
      <h2 className='d-inline text-center'>
        <MdQrCode size={30} />
        &nbsp;Generate QR code for Attendance
      </h2>
      <div className='text-center'>
        <br />
        <h2>Today's Date: {formattedDate}</h2>
        <h2>
          Admin Name: <strong className='text-danger'>{adminName}</strong>
        </h2>
        <br />

        <div>
          <Button
            variant='primary'
            onClick={handleGenerateQRCode}
            style={{ backgroundColor: '#fe5f01', border: '0px' }}
          >
            Generate QR Code
          </Button>
          <p className='text-danger mt-2'>
            * Until you click on "Generate QR code," we consider it as a holiday, and no records are updated in the database.
            <br/>
            * Once you click the button, it is considered a working day.
          </p>
        </div>

        <Modal show={showPopup} onHide={handleClosePopup} size='lg'>
          <Modal.Header closeButton>
            <Modal.Title>Scan QR Code for Attendance</Modal.Title>
          </Modal.Header>
          <Modal.Body className='text-center p-3'>
            <QRCode value={qrCodeContent} size={325} />
            <p className='mt-3 fw-bold'>
              Scan the QR code using the E-attendance App to mark attendance.
            </p>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default QRcodePage;
