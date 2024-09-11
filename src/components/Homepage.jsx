import React, { useEffect, useState } from 'react';
import { sendGet } from '../utils/httpUtil'; // Import sendGet from your API utility
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom'; // To get ID from URL
import HomePageImage from './source/Homepage.jpg'; // Ensure the image path is correct
import { width } from '@fortawesome/free-solid-svg-icons/fa0';

const HomePage = () => {
  // const { id } = useParams(); // Get ID from URL
  // const [user, setUser] = useState(null);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const response = await sendGet(`http://localhost:8080/api/user/${id}`); // Fetch user info based on ID
  //       const userData = await response.json();
  //       setUser(userData.data); // Ensure `userData.data` is correct
  //     } catch (error) {
  //       setError(error.message);
  //       console.error('Error fetching user data:', error.message);
  //     }
  //   };

  //   if (id) {
  //     fetchUser();
  //   }
  // }, [id]); // Re-run when ID changes

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  // if (!user) {
  //   return <div>Loading...</div>; // Show loading state if needed
  // }

  // const name = user.fullname || "No name provided";
  // const email = user.email || "No email provided";
  // const msv = user.msv || "No MSV provided";

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <img src={HomePageImage} alt="Homepage" style={{ width: '700px', height: 'auto' }} /> {/* Ensure the image path and alt text */}
          {/* <Card className="mt-3">
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Text>Email: {email}</Card.Text>
              <Card.Text>MSV: {msv}</Card.Text>
            </Card.Body>
          </Card> */}
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
