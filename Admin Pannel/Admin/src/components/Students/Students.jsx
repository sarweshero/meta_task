import React from "react";

function Students() {
  const students = [
    { id: 1, name: "John Doe", linkedin: "https://linkedin.com", projects: 5, courses: 3 },
    { id: 2, name: "Jane Smith", linkedin: "https://linkedin.com", projects: 4, courses: 2 },
    // Add 30 students data here
  ];

  return (
    <div className="students-container">
      <h1>Students List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Photo</th>
            <th>Name</th>
            <th>LinkedIn</th>
            <th>No. of Projects</th>
            <th>No. of Courses</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td><img src="https://via.placeholder.com/50" alt="student" /></td>
              <td>{student.name}</td>
              <td><a href={student.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></td>
              <td>{student.projects}</td>
              <td>{student.courses}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Students;
