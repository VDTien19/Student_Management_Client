// import React, { useState } from 'react';
// import axios from 'axios';
// import { Form, Button, Alert } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

// const Login = ({ onLogin }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:8080/api/auth/login', { username, password });
//       setSuccess('Đăng nhập thành công!');
//       setError('');
      
//       // Lưu token vào localStorage hoặc state management
//       localStorage.setItem('accessToken', response.data.tokens.accessToken);
//       localStorage.setItem('refreshToken', response.data.tokens.refreshToken);
//       // Gọi onLogin từ props để cập nhật trạng thái đăng nhập
//       onLogin();
//       // Chuyển hướng đến trang chính
//       navigate('/dashboard');
//     } catch (err) {
//       setSuccess('');
//       setError(err.response?.data?.message || 'Đăng nhập thất bại!');
//     }
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100">
//       <Form onSubmit={handleLogin} className="p-4 border rounded">
//         <h3 className="text-center mb-3">Login</h3>
//         {error && <Alert variant="danger">{error}</Alert>}
//         {success && <Alert variant="success">{success}</Alert>}
//         <Form.Group className="mb-3" controlId="formBasicUsername">
//           <Form.Label>Username</Form.Label>
//           <Form.Control 
//             type="text" 
//             placeholder="Enter username" 
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="formBasicPassword">
//           <Form.Label>Password</Form.Label>
//           <Form.Control 
//             type="password" 
//             placeholder="Enter password" 
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </Form.Group>

//         <Button variant="primary" type="submit" className="w-100">
//           Login
//         </Button>
//       </Form>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', { username, password });
      setSuccess('Đăng nhập thành công!');
      setError('');

      localStorage.setItem('accessToken', response.data.tokens.accessToken);
      localStorage.setItem('refreshToken', response.data.tokens.refreshToken);
      
      onLogin();
      navigate('/dashboard');
    } catch (err) {
      setSuccess('');
      setError(err.response?.data?.message || 'Đăng nhập thất bại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Form onSubmit={handleLogin} className="p-4 border rounded">
        <h3 className="text-center mb-3">Login</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Enter password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Login'}
        </Button>
      </Form>
    </div>
  );
};

export default Login;
