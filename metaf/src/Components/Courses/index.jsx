import React, { useState } from "react";
import "./Course.css"; // Import the CSS file

const Course = () => {
  const [course, setCourse] = useState("");
  const [coursesList, setCoursesList] = useState([]);
  const [certificate, setCertificate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (course.trim() !== "" && certificate) {
      const newCourse = { name: course.trim(), certificate };
      setCoursesList((prev) => [...prev, newCourse]);
      setCourse(""); // Clear the course name input
      setCertificate(null); // Clear the certificate input
    }
  };

  const handleFileChange = (e) => {
    setCertificate(e.target.files[0]); // Store the selected file
  };

  return (
    <div className="course-container">
      <h2>Certificate</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter certificate Name"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          required
        />
        <input
          type="file"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          onChange={handleFileChange}
          required
        />
        <button type="submit">Add Cerficate</button>
      </form>

      <h3>Available Certificate</h3>
      <ul>
        {coursesList.length > 0 ? (
          coursesList.map((item, index) => (
            <li key={index}>
              {item.name} - 
              <a href={URL.createObjectURL(item.certificate)} target="_blank" rel="noopener noreferrer">
                View Certificate
              </a>
            </li>
          ))
        ) : (
          <li>No certificate added yet.</li>
        )}
      </ul>
    </div>
  );
};

export default Course;
