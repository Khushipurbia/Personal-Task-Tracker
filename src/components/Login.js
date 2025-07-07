import React, { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      localStorage.setItem("username", username.trim());
      onLogin(username.trim());
    }
  };

  return (
    <div className="login-container">
      <h2>Welcome! Please Login</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          className="input-container"
          type="text"
          placeholder="Enter username here..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className="login-btn" type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
