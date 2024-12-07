import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import './Dashboard.css';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();  // Hook for navigation

  // Sample user data
  useEffect(() => {
    const fetchedUsers = [
      {
        id: 1,
        name: "Muneeswaran",
        email: "munishwaran933@gamil.com",
        profilePic: "https://media-hosting.imagekit.io//4c26ccfd8fbf4645/munish.jpg?Expires=1733734614&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=uT2b~NVMV-695Iz5Hlc90Wlzld6lttMoIssSjm6Y4u7TaG9rSGyOHaSXX0ue1wUH-RuLViuWCERAxkJvS~zPU3Wresgo6Ioc89B86QuZylgGhon-VQaqBZ9QIOmQu2WLW0eDIXqgG8OwD3bpFHgOmmPj8x6AwIo1SEpeehCFmbC1bely~U4qRt~4QARvmdsn-waBK-8YPJiOgXJhwbqdaUgL5f0fE8Ku4vPJHzbSk6rc8~QW7tWrnWsk-CTB1588RweXXq9rAEV5~pgEZz3ShwQhfr8WKjGn~N21NGPVvUIj8s5JiBJeKhEgrvDdt0uadOz5n4U2aLvc8XRPbQcdSA__",
        linkedin: "linkedin.com/in/munees-waran-9990ba2b4/",
        github: "https://github.com/Munish0204", 
        domain: "FullStack", 
        projects: 2,
        completedCourses: 3,
      },
      {
        id: 2,
        name: "Sarweshwar",
        email: "sarweshwardeivasihamani@gmail.com",
        profilePic: "https://media-hosting.imagekit.io//cc6d49ba13564173/Sharwesh.jpg?Expires=1733734955&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=lksom~rPo0kcZ5YUK0K4l0sPGY4Wer8mcK-2aE-u6XHQ5As8r075jf4A0xzY0K6ghPOJAC6~gnBNNBYnfZbxNaONpKlEKNsKZJsss~UEYYxxUUuUO243dPlr~Y-jlaCfVnk9X5pHNGidmjjc4YZo28s9vSZK9FzifXMM8KmOShdaqoS5EKfZ3T9Jxpl3gDvqgVZO-saW3rTdfeXnOwUDG6UwzpZqAgn657kev1h8MmZpKmpctb4NKKECCkj3NhL~Wvjdx7bQXPoJTF~YUKDc1iewXW7TXVYUnhKqvLBtesmhqnkreqaXNHSHMoF7GOYJV0vYAhoo~kIXUv1yAbxElw__",
        linkedin: "https://www.linkedin.com/in/sarweshwardeivasihamani/",
        github: "https://github.com/arunsarwesh", 
        domain: "FullStack", 
        projects: 3,
        completedCourses: 2,
      },
      {
        id: 3,
        name: "SenthamilSelvan",
        email: "senthamil.r25@gmail.com",
        profilePic: "https://media-hosting.imagekit.io//8f5ac99e76f04d8e/tamil.jpg?Expires=1733735374&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=jykyfkfsR5fX6lgSD79RfYjCn3sPU0zxTh-XdDIuoCo23jpvRAoPr5HpBylOlz~ZuWoi9W5E90wdGHfAdEl6a9VZynj5SoyukomoldB~hMzViWeakUAYqoqEgurMpmXwjE6BaILgwyH1BG8CBs5e8VnxmYsbJj2Yt70eOA8JmkcKqps9Ic5FiR8-w28~GJieGiyjoVAcvSC-O2yONuKzUfBouAbrdR0rX2AkypEMRIAoVMFUeixt17GEsgVeXeDOIIoiGfO3OnScNVpTat9-G1Ya0GHVu8wQGiFUCtvy~FtPL4okxDJMHpjdiSu7VnuCywCV3FKTAYYNTZ-rLH-FpA__",
        linkedin: "https://www.linkedin.com/in/senthamil-r/",
        github: "https://github.com/senthamil18", 
        domain: "CyberSecurity", 
        projects: 2,
        completedCourses: 1,
      },
    ];

    setTimeout(() => {
      setUsers(fetchedUsers);
      setLoading(false);
    }, 1000); // Simulate loading delay
  }, []);

  // Logout function
  const handleLogout = () => {
    // Clear user-related state (e.g., authentication tokens, user data)
    setUsers([]); // Clear the users state
    setLoading(true); // Reset loading state
    // Optionally, clear localStorage/sessionStorage if you're using it
    localStorage.removeItem("authToken"); // Example for token removal
    // Navigate to the login page
    navigate("/");  // Redirect to login page (use the appropriate path)
    alert("Logged out successfully!");
  };

  return (
    <div className="dashboard-container">
      {/* Header with Logout Button */}
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          {/* Student Details Table */}
          <div className="students-table-section">
            <h3>Student Details</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
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
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>
                      <img
                        src={user.profilePic}
                        alt={`${user.name}'s Profile`}
                        className="profile-img"  // Add a class for styling images
                      />
                    </td>
                    <td>{user.name}</td>
                    <td>{user.domain}</td>
                    <td>
                      <a
                        href={user.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        LinkedIn
                      </a>
                    </td>
                    <td>
                      <a
                        href={user.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitHub
                      </a>
                    </td>
                    <td>{user.projects}</td>
                    <td>{user.completedCourses}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Stats Section */}
          <div className="stats-section">
            <div className="stats-card">
              <h3>Total Users</h3>
              <p>{users.length}</p>
            </div>
            <div className="stats-card">
              <h3>Total Projects</h3>
              <p>{users.reduce((acc, user) => acc + user.projects, 0)}</p>
            </div>
            <div className="stats-card">
              <h3>Total Courses Completed</h3>
              <p>{users.reduce((acc, user) => acc + user.completedCourses, 0)}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
