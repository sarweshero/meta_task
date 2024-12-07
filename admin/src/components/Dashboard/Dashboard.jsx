import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api"; // Import API instance
import "./Dashboard.css";

const Dashboard = () => {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

  // Fetch team members
  const fetchMembers = async () => {
    try {
      const response = await api.get("adm-members/");
      setMembers(response.data);
    } catch (error) {
      console.error("Error fetching members:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch statistics
  const fetchStats = async () => {
    try {
      const response = await api.get("adm-statistics/");
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  // Auto-refresh the data every 1 minute
  useEffect(() => {
    // Initial fetch
    fetchMembers();
    fetchStats();

    // Set interval to refresh data every 1 minute (60000 ms)
    const intervalId = setInterval(() => {
      fetchMembers();
      fetchStats();
    }, 60000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  // Navigate to Attendance page
  const navigateToAttendance = () => {
    navigate("/attendance");
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Students Table Section */}
      <div className="students-table-section">
        <h3>Student Details</h3>
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Reg_no</th>
                <th>Profile</th>
                <th>Name</th>
                <th>Domain</th>
                <th>LinkedIn</th>
                <th>GitHub</th>
                <th>Projects Completed</th>
                <th>Courses Completed</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id}>
                  <td>{member.username}</td>
                  <td>
                    <img
                      src={member.profile_picture}
                      alt="Profile"
                      className="profile-img"
                    />
                  </td>
                  <td>{member.name}</td>
                  <td>{member.expertise}</td>
                  <td>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </a>
                  </td>
                  <td>
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                  </td>
                  <td>{member.project_count}</td>
                  <td>{member.courses_completed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stats-card">
          <h3>Total Users</h3>
          <p>{stats?.total_profiles || 0}</p>
        </div>
        <div className="stats-card">
          <h3>Total Projects</h3>
          <p>{stats?.total_projects || 0}</p>
        </div>
        <div className="stats-card">
          <button
            className="navigate-attendance-button"
            onClick={navigateToAttendance}
          >
            View Attendance
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
