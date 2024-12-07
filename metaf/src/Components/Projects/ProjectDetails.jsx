import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar/index";
import api from "../../api"; // Axios instance with token handling
import { format } from "date-fns";
import "./Project.css";

const ProjectDetails = () => {
  const { id } = useParams(); // Get the report ID from the URL
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch the specific report by ID
  const fetchReport = async () => {
    setLoading(true);
    try {
      const response = await api.get(`project/${id}/`);
      setReport(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch the report.");
      console.error("Error fetching report:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="report-details-container">
      <Navbar />
      {report ? (
        <div className="project-card">
          <h2 className="project-title">Project Title: {report.project_title}</h2>
          <p className="description-label"><u>Description</u></p>
          <p className="description-text">{report.description}</p>
          {report.proof && (
            <div className="card-proof">
              <img src={report.proof} alt="proof" className="proof-image" />
            </div>
          )}
          <p className="submission-date">
            Submitted on: {format(new Date(report.created_at), "PPP p")}
          </p>
        </div>
      ) : (
        <p>No details available for this Project.</p>
      )}
    </div>
  );
};

export default ProjectDetails;
