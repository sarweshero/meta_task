import React, { useEffect, useState } from "react";
import api from "../../api"; // Assuming `api` is set up for axios or fetch requests

function Attendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedName, setSelectedName] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [selectedSession, setSelectedSession] = useState(""); // New state for session filtering

  // Fetch attendance data on component mount
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await api.get("adm-attendance/");
        const dataWithSession = response.data.map((item) => {
          const session = getSessionFromTime(item.time); // Assign session based on time
          return { ...item, session }; // Add session to each attendance item
        });
        setAttendanceData(dataWithSession);
        setFilteredData(dataWithSession); // Set both data and filteredData initially
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch attendance data");
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  // Function to determine session based on the time
  const getSessionFromTime = (time) => {
    const date = new Date(time);
    const hours = date.getHours();

    if (hours >= 6 && hours < 12) return "Morning"; // Morning session (6 AM to 12 PM)
    if (hours >= 12 && hours < 18) return "Afternoon"; // Afternoon session (12 PM to 6 PM)
    return "Evening"; // Evening session (6 PM to 12 AM)
  };

  // Handle dropdown change to filter by name
  const handleNameSelection = (event) => {
    const name = event.target.value;
    setSelectedName(name);
    applyFilters(name, selectedStartDate, selectedEndDate, selectedSession);
  };

  // Handle start date change to filter by start date
  const handleStartDateChange = (event) => {
    const startDate = event.target.value;
    setSelectedStartDate(startDate);
    applyFilters(selectedName, startDate, selectedEndDate, selectedSession);
  };

  // Handle end date change to filter by end date
  const handleEndDateChange = (event) => {
    const endDate = event.target.value;
    setSelectedEndDate(endDate);
    applyFilters(selectedName, selectedStartDate, endDate, selectedSession);
  };

  // Handle session filter change
  const handleSessionSelection = (event) => {
    const session = event.target.value;
    setSelectedSession(session);
    applyFilters(selectedName, selectedStartDate, selectedEndDate, session);
  };

  // Apply filters for name, date range, and session type
  const applyFilters = (name, startDate, endDate, session) => {
    let filtered = attendanceData;

    // Filter by name
    if (name) {
      filtered = filtered.filter((item) => item.name === name);
    }

    // Filter by date range
    if (startDate) {
      filtered = filtered.filter((item) => {
        const recordDate = new Date(item.time).toISOString().split("T")[0]; // Extract date in YYYY-MM-DD format
        return recordDate >= startDate;
      });
    }

    if (endDate) {
      filtered = filtered.filter((item) => {
        const recordDate = new Date(item.time).toISOString().split("T")[0]; // Extract date in YYYY-MM-DD format
        return recordDate <= endDate;
      });
    }

    // Filter by session
    if (session) {
      filtered = filtered.filter((item) => item.session === session);
    }

    setFilteredData(filtered);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Extract unique names and sessions for the dropdown menus
  const uniqueNames = [...new Set(attendanceData.map((item) => item.name))];
  const uniqueSessions = [...new Set(attendanceData.map((item) => item.session))]; // Assuming "session" field exists

  // Function to determine row color based on session
  const getRowColor = (session) => {
    if (!session) return "#ffffff"; // Default white for no session value

    if (session === "Morning") return "#00c3ff"; // Light blue for Morning
    if (session === "Afternoon") return "#e41414"; // Light red for Afternoon

    return "#ffffff"; // Default to white if session is unrecognized
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Attendance Details</h1>
      {/* Filters Section */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "20px" }}>
        {/* Name Filter */}
        <div>
          <label htmlFor="name-dropdown" style={{ marginRight: "10px" }}>
            Select Name:
          </label>
          <select
            id="name-dropdown"
            value={selectedName}
            onChange={handleNameSelection}
            style={{
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              width: "200px",
            }}
          >
            <option value="">All Users</option>
            {uniqueNames.map((name, index) => (
              <option key={index} value={name}>
                {name || "N/A"}
              </option>
            ))}
          </select>
        </div>

        {/* Start Date Filter */}
        <div>
          <label htmlFor="start-date-filter" style={{ marginRight: "10px" }}>
            Start Date:
          </label>
          <input
            type="date"
            id="start-date-filter"
            value={selectedStartDate}
            onChange={handleStartDateChange}
            style={{
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
        </div>

        {/* End Date Filter */}
        <div>
          <label htmlFor="end-date-filter" style={{ marginRight: "10px" }}>
            End Date:
          </label>
          <input
            type="date"
            id="end-date-filter"
            value={selectedEndDate}
            onChange={handleEndDateChange}
            style={{
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
        </div>

        {/* Session Filter */}
        <div>
          <label htmlFor="session-dropdown" style={{ marginRight: "10px" }}>
            Select Session:
          </label>
          <select
            id="session-dropdown"
            value={selectedSession}
            onChange={handleSessionSelection}
            style={{
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              width: "200px",
            }}
          >
            <option value="">All Sessions</option>
            {uniqueSessions.map((session, index) => (
              <option key={index} value={session}>
                {session || "N/A"}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Attendance Table */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Name</th>
            <th style={tableHeaderStyle}>Latitude</th>
            <th style={tableHeaderStyle}>Longitude</th>
            <th style={tableHeaderStyle}>Time</th>
            <th style={tableHeaderStyle}>Session</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((attendance, index) => (
              <tr key={index} style={{ backgroundColor: getRowColor(attendance.session) }}>
                <td style={tableCellStyle}><strong>{attendance.name}</strong></td>
                <td style={tableCellStyle}><strong>{attendance.latitude}</strong></td>
                <td style={tableCellStyle}><strong>{attendance.longitude}</strong></td>
                <td style={tableCellStyle}><strong>{new Date(attendance.time).toLocaleString()}</strong></td>
                <td style={tableCellStyle}><strong>{attendance.session}</strong></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={tableCellStyle}>No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const tableHeaderStyle = {
  padding: "10px",
  backgroundColor: "#000",
  textAlign: "left",
  borderBottom: "1px solid #333",
};

const tableCellStyle = {
  color: "#000",
  padding: "8px",
  border: "1px solid #333",
};

export default Attendance;
