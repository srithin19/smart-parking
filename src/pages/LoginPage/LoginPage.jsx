import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Validate user credentials (implement proper API calls in the backend)
    if (username.trim() && password.trim()) {
      // Redirect to Parking Selection Page
      navigate("/parking-selection");
    } else {
      alert("Please fill in both Username and Password");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <p className="register-prompt">
        New to the platform?{" "}
        <a href="/register" className="register-link">
          Register here
        </a>
      </p>
    </div>
  );
};

export default LoginPage;