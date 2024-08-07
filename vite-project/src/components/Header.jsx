import React from 'react';
import { Navbar } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar bg="primary" variant="dark" >
      <Navbar.Brand href="#home" style={{ textAlign: "center" }}>Quản Lý SV</Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>Admin</Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;