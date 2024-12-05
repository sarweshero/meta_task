import React, { useState } from "react";
import "./WorkReport.css"; // Import the CSS file

const WorkReport = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState(null);
  const [reportsList, setReportsList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      const report = { title, description, media };
      setReportsList((prev) => [...prev, report]);
      setTitle(""); // Clear the title field
      setDescription(""); // Clear the description field
      setMedia(null); // Clear the media file
    }
  };

  const handleMediaChange = (e) => {
    setMedia(e.target.files[0]);
  };

  return (
    <div className="workreport-container">
      <h2>Work Report</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Enter Report Description (up to 250 characters)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={250} // Limit the input to 250 characters
          required
        />
        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleMediaChange}
          required
        />
        <button type="submit">Submit Report</button>
      </form>

      <h3>Submitted Reports</h3>
      <ul>
        {reportsList.length > 0 ? (
          reportsList.map((report, index) => (
            <li key={index}>
              <h4>{report.title}</h4>
              <p>{report.description}</p>
              {report.media && (
                <div>
                  {report.media.type.startsWith("image") ? (
                    <img src={URL.createObjectURL(report.media)} alt="media" />
                  ) : (
                    <video controls>
                      <source src={URL.createObjectURL(report.media)} />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              )}
            </li>
          ))
        ) : (
          <li>No reports submitted yet.</li>
        )}
      </ul>
    </div>
  );
};

export default WorkReport;
