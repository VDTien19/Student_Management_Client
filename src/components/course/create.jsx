import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { sendPost } from '../../utils/httpUtil';

const AddCourse = () => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [credit, setCredit] = useState('');
  const [majorId, setMajorId] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

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
