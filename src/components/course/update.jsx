import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';
import { sendGet, sendPut } from '../../utils/httpUtil'; // Adjust the import path as needed

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [credit, setCredit] = useState('');
  const [majorId, setMajorId] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await sendGet(`http://localhost:8080/api/course/${id}`);
        
        setCourse(response.data);
        setName(response.data.name);
        setCode(response.data.code);
        setCredit(response.data.credit);
        setMajorId(response.data.majorId?._id || '');
      } catch (err) {
        setError(err.message || 'Failed to fetch course details');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await sendPut(`http://localhost:8080/api/course/update/${id}`, {
        name,
        code,
        credit,
        majorId
      });

      setMessage('Course updated successfully!');
      setTimeout(() => {
        navigate('/');
      }, 2000); 
    } catch (err) {
      setError(err.message || 'Failed to update course');
    }
  };


  return (
    <Container className="mt-5">
      <h1>Edit Course</h1>
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
