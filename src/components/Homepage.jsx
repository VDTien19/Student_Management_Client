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
        const response = await sendGet(`http://localhost:8080/api/user/${id}`); // Lấy thông tin người dùng dựa trên ID
        const userData = await response.json();
        setUser(userData.data); // Đảm bảo `userData.data` là đúng
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

  if (!user) {
    return <div>Loading...</div>; // Hiển thị trạng thái loading khi chưa có dữ liệu
  }

  const name = user.fullname || "No name provided";
  const email = user.email || "No email provided";
  const msv = user.msv || "No MSV provided";

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
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
