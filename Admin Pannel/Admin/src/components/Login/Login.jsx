import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../../constants";
import './Login.css'

function Login({ setIsAuthenticated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Define valid usernames and passwords for three users
    const validUsers = [
      { username: "munish", password: "123" },
      { username: "sarwesh", password: "123" },
      { username: "alfred", password: "123" },
    ];

    // Check if the entered username and password match any of the valid users
    const user = validUsers.find(user => user.username === username && user.password === password);

    if (user) {
      localStorage.setItem(ACCESS_TOKEN, "your_access_token_here"); // Store token
      setIsAuthenticated(true); // Set authenticated state to true
      navigate("/dashboard"); // Redirect to dashboard
    } else {
      alert("Invalid credentials!"); // Show error if credentials are incorrect
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
