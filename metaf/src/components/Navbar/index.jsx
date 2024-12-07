import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
  const [isLoggedIn] = useState(); // Add isLoggedIn state

  return (
    <nav className="navbar">
      <a href="/" className="logo">MetaVerse</a>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/attendance">Attendance</Link></li>
        <li><Link to="/workreport">Work Report</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
      <Link to="/logout" className="logout">Logout</Link>
    </nav>
  );
};

export default Navbar;
