import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../api"; // Assuming you have an axios instance set up for API calls
import "./Profile.css";

const authToken = localStorage.getItem("access");

const Profile = () => {
  const { username } = useParams(); // Capture the member's username from the URL
  const [member, setMember] = useState(null);
  const [workReports, setWorkReports] = useState([]);
  const [courses, setCourses] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch member's profile and other data based on member's ID
  const fetchMemberData = async () => {
    if (!username) {
      setError("Username is required in the URL.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true); // Start loading
      

      // Fetch the member's profile using username
      const memberResponse = await api.get(`profile/${username}/`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      setMember(memberResponse.data);

      // After fetching the profile, use member's ID to fetch work reports, courses, and projects
      const id = memberResponse.data.user; // Get the member's ID from the response
      const workReportsResponse = await api.get(`/adm-works/${id}/`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setWorkReports(workReportsResponse.data);
      const coursesResponse = await api.get(`/adm-courses/${id}/`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setCourses(coursesResponse.data);

      const projectsResponse = await api.get(`/adm-projects/${id}/`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setProjects(projectsResponse.data);
    } catch (error) {
    
      console.error("Error fetching member data:", error);
      
    } finally {
      setLoading(false); // Stop loading
    }
    
  };

  useEffect(() => {
    if (username) {
      fetchMemberData();
    } else {
      setError("Username is required in the URL.");
      setLoading(false);
    }
  }, [username]); // Re-fetch data when the username changes

  // Render the profile
  return (
    <div className="profile-container">
      {loading && <p>Loading...</p>} {/* Loading state */}
      {error && <p className="error-message">{error}</p>} {/* Error state */}

      {member && !loading && (
        <>
          <h2>{member.name}'s Profile</h2>
          <div className="profile-info">
            <img
              src={member.profile_photo}
              alt="Profile"
              className="profile-img"
            />
            <p><strong>Domain:</strong> {member.domain}</p>
            <p><strong>E-Mail:</strong> {member.mail_id}</p>
            <p><strong>Phone-No:</strong> {member.phone_no}</p>
            <p>
              <strong>LinkedIn:</strong>{" "}
              <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </p>
            <p>
              <strong>GitHub:</strong>{" "}
              <a href={member.github_url} target="_blank" rel="noopener noreferrer">GitHub</a>
            </p>
          </div>

          {/* Work Reports */}
          <div className="section">
            <h3>Work Reports</h3>
            {workReports && workReports.length > 0 ? (
              <ul>
                {workReports.map((workReports) => (
                  <li key={workReports.id}>
                    <strong>{workReports.title}</strong>
                    <p>{workReports.description}</p>
                    {workReports.media && (
                      <img
                        src={workReports.media}
                        alt={workReports.title}
                        style={{ maxWidth: "300px", marginTop: "10px" }}
                      />
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No work reports found</p>
            )}
          </div>

          {/* Courses */}
          <div className="section">
            <h3>Courses Completed</h3>
            {courses.length ? (
              <ul>
                {courses.map((courses) => (
                  <li key={courses.id}>
                  <strong>{courses.course_name}</strong>
                  <p>{courses.platform}</p>
                  {courses.certificate && (
                    <img
                      src={courses.certificate}
                      alt={courses.course_name}
                      style={{ maxWidth: "300px", marginTop: "10px" }}
                    />
                  )}
                </li>
                ))}
              </ul>
            ) : (
              <p>No courses found</p>
            )}
          </div>

          {/* Projects */}
          <div className="section">
            <h3>Projects Completed</h3>
            {projects.length ? (
              <ul>
                {projects.map((projects) => (
                    <li key={projects.id}>
                    <strong>{projects.project_title}</strong>
                    <p>{projects.description}</p>
                    {projects.proof && (
                      <img
                        src={projects.proof}
                        alt={projects.project_title}
                        style={{ maxWidth: "300px", marginTop: "10px" }}
                      />
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No projects found</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
