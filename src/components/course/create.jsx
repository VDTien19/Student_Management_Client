import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { sendPost, sendGet } from '../../utils/httpUtil';

const AddCourse = () => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [credit, setCredit] = useState('');
  const [majorId, setMajorId] = useState('');
  const [majors, setMajors] = useState([]); // To store the list of majors
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Fetch the list of majors when the component mounts
  useEffect(() => {
    const fetchMajors = async () => {
      try {
        const response = await sendGet('http://localhost:8080/api/major/getAll'); // Adjust API URL as needed
        const data = JSON.parse(response);
        setMajors(data.data); // Assuming response data contains an array of majors
      } catch (err) {
        console.error('Failed to fetch majors:', err);
        setError('Failed to fetch majors');
      }
    };

    fetchMajors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await sendPost('http://localhost:8080/api/course/add-course', {
        name,
        code,
        credit,
        majorId,
      });

      setMessage(response.message);
      setName('');
      setCode('');
      setCredit('');
      setMajorId('');
    } catch (err) {
      setError(err.message || 'Failed to add course');
    }
  };

  return (
    <Container className="mt-5">
      <h1>Add Course</h1>
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
          <Form.Label>Major</Form.Label>
          <Form.Control
            as="select" // Changed to a select dropdown
            value={majorId}
            onChange={(e) => setMajorId(e.target.value)}
            required
          >
            <option value="">Select Major</option>
            {majors.map((major) => (
              <option key={major._id} value={major._id}>
                {major.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Course
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

export default AddCourse;
