import React, { useState } from "react";
import "./Course.css"; // Make sure to add this CSS file

const UploadForm = ({ onSubmit, loading }) => {
  const [course, setCourse] = useState("");
  const [platform, setPlatform] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to an array
    setMediaFiles(files);

    const newPreviews = files.map((file) => {
      const fileType = file.type.split("/")[0];
      if (fileType === "image") {
        return URL.createObjectURL(file); // Preview image
      } else if (fileType === "audio") {
        return URL.createObjectURL(file); // Preview audio
      } else if (fileType === "video") {
        return URL.createObjectURL(file); // Preview video
      } else if (file.type === "application/pdf") {
        return "pdf"; // Mark as PDF type
      }
      return null;
    });
    setPreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", localStorage.getItem("username"));
    formData.append("course_name", course);
    formData.append("platform", platform);
    mediaFiles.forEach((file) => formData.append("certificate", file));

    await onSubmit(formData);
  };

  return (
    <div className="upload-form">
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <input
            type="text"
            placeholder="Course Name"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <input
            type="text"
            placeholder="Platform"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <input
            type="file"
            placeholder="Certificate"
            accept="image/*,video/*,audio/*,application/pdf"
            onChange={handleMediaChange}
          />
        </div>

        <div className="preview-container">
          {previews.map((preview, index) => (
            <div className="preview-item" key={index}>
              {preview === "pdf" ? (
                <div className="pdf-preview">
                  <span role="img" aria-label="pdf-icon">📄</span>
                  <p>PDF file uploaded</p>
                </div>
              ) : preview && <img src={preview} alt="preview" width="100" />}
            </div>
          ))}
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
