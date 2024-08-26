import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [credit, setCredit] = useState('');
  const [majorId, setMajorId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  // Fetch thông tin môn học theo id khi component mount
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        setCourse(response.data.data);
        setName(response.data.data.name);
        setCode(response.data.data.code);
        setCredit(response.data.data.credit);
        setMajorId(response.data.data.majorId?._id || '');
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`/update/${id}`, {
        name,
        code,
        credit,
        majorId
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      setMessage('Course updated successfully!');
      setTimeout(() => {
        navigate('/');
      }, 2000); 
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          <p>Error: {error}</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h1>sửa môn học</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formCourseName">
          <Form.Label>Course Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter course name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formCourseCode">
          <Form.Label>Course Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter course code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formCourseCredit">
          <Form.Label>Credit Hours</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter credit hours"
            value={credit}
            onChange={(e) => setCredit(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formMajorId">
          <Form.Label>Major ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter major ID"
            value={majorId}
            onChange={(e) => setMajorId(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Course
        </Button>
      </Form>

      {message && (
        <Alert variant="success" className="mt-3">
          {message}
        </Alert>
      )}

      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}
    </Container>
  );
};

export default EditCourse;
