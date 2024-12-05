import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Attendance.css';
import { useNavigate } from 'react-router-dom';
import Navbar from "../Navbar/index.jsx"; 

const Attendance = () => {
  const [dateTime, setDateTime] = useState('');
  const [location, setLocation] = useState({ latitude: '', longitude: '' });
  const [showDetails, setShowDetails] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Get current date and time
  const getCurrentDateTime = () => {
    const current = new Date();
    const formattedDateTime = current.toLocaleString();
    setDateTime(formattedDateTime);
  };

  // Get user's live location
  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation not supported');
    }
  };

  // Post attendance data to the backend
  const postAttendance = async () => {
    try {
      const attendanceData = {
        username: 'sarwesh', // Replace with the actual username
        date: new Date().toISOString().split('T')[0], // ISO format date
        time_in: new Date().toLocaleTimeString('en-GB', { hour12: false }), // 24-hour format time
        status: 'present', // Example status
        note: 'Marked attendance from React app', // Optional field
      };

      const response = await axios.post('http://localhost:8000/api/attendance/', attendanceData);
      setMessage('Attendance marked successfully!');
      console.log('Response:', response.data);

      // Redirect to the home page after 3 seconds
      setTimeout(() => {
        navigate('/profile');
      }, 3000);

    } catch (error) {
      console.error('Error posting attendance:', error.response?.data || error.message);
      setMessage('Failed to mark attendance. Please try again.');
    }
  };

  // Fetch location and date when button is clicked
  const handleAttendanceClick = () => {
    getCurrentDateTime();
    fetchLocation();
    setShowDetails(true); // Show details only after click

    // Wait for location to be updated before posting data
    setTimeout(() => {
      postAttendance();
    }, 1000);
  };

  return (
    
    <div className="attendance-page">
      <Navbar />
      
      <div className="attendance-card">
        <h1>Attendance</h1>
        <button onClick={handleAttendanceClick}>Mark Attendance</button>

        {showDetails && (
          <>
            <div className="date-time">
              <p>Date & Time: {dateTime}</p>
            </div>
            <div className="location">
              <p>Location:</p>
              <p>Latitude: {location.latitude}</p>
              <p>Longitude: {location.longitude}</p>
            </div>
          </>
        )}

        {message && <div className="message">{message}</div>}
      </div>
    </div>
  );
};

export default Attendance;
