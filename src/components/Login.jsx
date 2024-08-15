import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
    
  //   // Replace with your API endpoint
  //   const apiUrl = 'http://localhost:8080/api/auth/login';
    
  //   try {
  //     const response = await fetch(apiUrl, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         username,
  //         password,
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Invalid credentials');
  //     }

  //     const data = await response.json();

  //     if (rememberMe) {
  //       // Store tokens in local storage or cookies if needed
  //       localStorage.setItem('accessToken', data.accessToken);
  //       localStorage.setItem('refreshToken', data.refreshToken);
  //     } else {
  //       // Otherwise, just store them in the session storage
  //       sessionStorage.setItem('accessToken', data.accessToken);
  //       sessionStorage.setItem('refreshToken', data.refreshToken);
  //     }

  //     // Trigger any additional actions on successful login
  //     onLogin();
      
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };

  return (
    <div className="col-md-6 login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group remember-me">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            id="rememberMe"
          />
          <label htmlFor="rememberMe">Remember Me</label>
        </div>
        <button type="submit" className="btn btn-primary btn-block">Login</button>
        <div className="login-footer">
          <a href="#" className="forgot-password">Forgot Password?</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
