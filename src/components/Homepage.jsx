import React, { useEffect, useState } from 'react';
import { sendGet } from '../utils/httpUtil'; // Import sendGet từ file API đã viết
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom'; // Để lấy ID từ URL

const HomePage = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await sendGet(`http://localhost:8080/api/user/profile`);  // Gọi API lấy thông tin người dùng
        const userData = JSON.parse(response);
        setUser(userData);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching user data:', error.message);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]); // Chạy lại khi ID thay đổi

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Nếu không có user, không hiển thị gì
  if (!user) {
    return null;
  }

  // Default values if profilePicture is missing
  const profilePicture = user.profilePicture || "https://via.placeholder.com/150";
  const name = user.name || "No name provided";
  const email = user.email || "No email provided";
  const msv = user.msv || "No MSV provided";

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Img
              variant="top"
              src={profilePicture}
              alt="Profile Picture"
            />
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Text>Email: {email}</Card.Text>
              <Card.Text>MSV: {msv}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
