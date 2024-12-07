import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";  // Assuming you have a Dashboard component
import { ACCESS_TOKEN } from "./constants";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem(ACCESS_TOKEN) ? true : false
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Login setIsAuthenticated={setIsAuthenticated} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
