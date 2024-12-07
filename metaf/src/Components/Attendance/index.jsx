import React, { useState, useEffect } from "react";
import api from "../../api"; // Import the configured api instance
import "./Attendance.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/index.jsx";

const Attendance = () => {
  const [location, setLocation] = useState({ latitude: "", longitude: "" });
  const [showDetails, setShowDetails] = useState(false);
  const [message, setMessage] = useState("");
  const [dateTime, setDateTime] = useState("");  // State for storing the date-time
  const navigate = useNavigate();

  // Get current date and time in the correct format (YYYY-MM-DD HH:MM:SS)
  const getCurrentDateTime = () => {
    const current = new Date();
    
    // Get the date-time in the correct local format (YYYY-MM-DD HH:MM:SS)
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false, // 24-hour format
    };

    // Get local date-time with 'toLocaleString()' with options
    const formattedDateTime = current.toLocaleString('en-GB', options).replace(",", "").replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1");

    return formattedDateTime;
  };

  // Update dateTime every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(getCurrentDateTime()); // Update the date-time state
    }, 1000); // Update every second

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  // Get user's live location
  const fetchLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const locationData = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            setLocation(locationData);
            resolve(locationData);
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject(new Error("Geolocation is not supported by your browser."));
      }
    });
  };

  const handleAttendanceClick = async () => {
    try {
      const locationData = await fetchLocation(); // Wait for location to resolve

      const attendanceData = {
        username: localStorage.getItem("username"),
        latitude: locationData.latitude,
        longitude: locationData.longitude,
        time: dateTime,  // Use the current local date-time
      };

      // Post attendance data
      const response = await api.post("attendance/", attendanceData);
      setMessage("Attendance marked successfully!");
      setShowDetails(true);
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error posting attendance:", error.message);
      setMessage(error.message || "Failed to mark attendance.");
    }
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
