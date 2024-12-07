import React, { useEffect, useState } from "react";
import api from "../../api"; // Assuming `api` is set up for axios or fetch requests

function Attendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUsername, setSelectedUsername] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");

  // Fetch attendance data on component mount
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await api.get("adm-attendance/"); // Ensure the correct endpoint
        setAttendanceData(response.data);
        setFilteredData(response.data); // Set both data and filteredData initially
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch attendance data");
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  // Handle dropdown change to filter by username
  const handleUsernameSelection = (event) => {
    const username = event.target.value;
    setSelectedUsername(username);
    applyFilters(username, selectedStartDate, selectedEndDate);
  };

  // Handle start date change to filter by start date
  const handleStartDateChange = (event) => {
    const startDate = event.target.value;
    setSelectedStartDate(startDate);
    applyFilters(selectedUsername, startDate, selectedEndDate);
  };

  // Handle end date change to filter by end date
  const handleEndDateChange = (event) => {
    const endDate = event.target.value;
    setSelectedEndDate(endDate);
    applyFilters(selectedUsername, selectedStartDate, endDate);
  };

  // Apply filters for username and date range
  const applyFilters = (username, startDate, endDate) => {
    let filtered = attendanceData;

    // Filter by username
    if (username) {
      filtered = filtered.filter((item) => item.username === username);
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

    setFilteredData(filtered);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Extract unique usernames for the dropdown menu
  const uniqueUsernames = [
    ...new Set(attendanceData.map((item) => item.username)),
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Attendance Details</h1>
      {/* Filters Section */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "20px" }}>
        {/* Username Filter */}
        <div>
          <label htmlFor="username-dropdown" style={{ marginRight: "10px" }}>
            Select Username:
          </label>
          <select
            id="username-dropdown"
            value={selectedUsername}
            onChange={handleUsernameSelection}
            style={{
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              width: "200px",
            }}
          >
            <option value="">All Users</option>
            {uniqueUsernames.map((username, index) => (
              <option key={index} value={username}>
                {username || "N/A"}
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
      </div>

      {/* Attendance Table */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Username</th>
            <th style={tableHeaderStyle}>Latitude</th>
            <th style={tableHeaderStyle}>Longitude</th>
            <th style={tableHeaderStyle}>Time</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((attendance, index) => (
              <tr key={index}>
                <td style={tableCellStyle}>{attendance.username || "N/A"}</td>
                <td style={tableCellStyle}>{attendance.latitude}</td>
                <td style={tableCellStyle}>{attendance.longitude}</td>
                <td style={tableCellStyle}>
                  {new Date(attendance.time).toLocaleString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", padding: "10px" }}>
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const tableHeaderStyle = {
  backgroundColor: "#000",
  color: "#fff",
  fontWeight: "bold",
  textAlign: "left",
  border: "1px solid #ddd",
  padding: "8px",
};

const tableCellStyle = {
  border: "1px solid #ddd",
  padding: "8px",
};

export default Attendance;
