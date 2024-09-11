import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Header = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear tokens from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    // Call onLogout from props to update login state
    onLogout();
    // Redirect to login page
    navigate('/login');
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
      <Container>
        <Navbar.Brand href="#home" className="mx-auto" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
          Quản Lý SV
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Navbar.Text className="text-light" style={{ fontSize: '1.2rem', fontWeight: '500' }}>
            Admin
          </Navbar.Text>
          <Button variant="outline-light" className="ms-3" onClick={handleLogout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
