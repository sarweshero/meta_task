import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar/index";
import api from "../../api"; // Axios instance with token handling
import { format } from 'date-fns';
import "./WorkReport.css";

const ReportDetails = () => {
  const { id } = useParams(); // Get the report ID from the URL
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch the specific report by ID
  const fetchReport = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/work-reports/${id}/`);
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
        <>
          <h2><center className="det">Title: {report.title}</center></h2> <br />
          <p><u className="det">Description:</u> <br /><br /><b className="det_p"> <tt >{report.description}</tt></b></p><br />
          {report.media && (
            <div className="card-media">
              <img src={report.media} alt="media" />
            </div>
          )} <br />
          <p className="det">
            Submitted on: {format(new Date(report.created_at), "PPP p")}
          </p>
        </>
      ) : (
        <p>No details available for this report.</p>
      )}
    </div>
  );
};

export default ReportDetails;
