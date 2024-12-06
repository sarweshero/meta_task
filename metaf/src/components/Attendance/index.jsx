import React, { useState } from "react";
import api from "../../api"; // Import the configured api instance
import "./Attendance.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/index.jsx";

const Attendance = () => {
  const [dateTime, setDateTime] = useState("");
  const [location, setLocation] = useState({ latitude: "", longitude: "" });
  const [showDetails, setShowDetails] = useState(false);
  const [message, setMessage] = useState("");
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
          console.error("Error getting location:", error);
          setMessage("Failed to fetch location.");
        }
      );
    } else {
      setMessage("Geolocation is not supported by your browser.");
    }
  };

  // Post attendance data to the backend
  const handleAttendanceClick = async () => {
    getCurrentDateTime();
    fetchLocation();
  
    // Wait for location to be updated before posting data
    setTimeout(async () => {
      try {
        const attendanceData = {
          username: localStorage.getItem("username"),
          latitude: location.latitude,
          longitude: location.longitude,
        };
  
        const response = await api.post("attendance/", attendanceData);
        setMessage("Attendance marked successfully!");
        setShowDetails(true); // Show details when attendance is successfully marked
        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error posting attendance:", error.response?.data || error.message);
        setMessage(error.response?.data?.error || "Failed to mark attendance.");
      }
    }, 1000);
  };

  return (
    <div className="attendance-page">
      <Navbar />
      <div className="attendance-card">
        <h1>Mark Your Attendance</h1>
        <button onClick={handleAttendanceClick}>Mark Attendance</button>

        {showDetails && (
          <>
            <div className="date-time">
              <p><b>Date & Time:</b> {dateTime}</p>
            </div>
            <div className="location">
              <p><u>Location</u></p>
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
