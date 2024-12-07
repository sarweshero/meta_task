import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";  // Assuming you have a Dashboard component
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound";

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          <Login />

        } 
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
            <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
