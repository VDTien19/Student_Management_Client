import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { sendPut, sendGet } from '../../utils/httpUtil'; // Adjust the import path as needed
import { useParams, useNavigate } from 'react-router-dom';

const DiligencyUpdate = () => {
  const { id } = useParams(); // Get the id from the URL params
  const navigate = useNavigate();
  
  const [diligency, setDiligency] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiligency = async () => {
      try {
        const response = await sendGet(`http://localhost:8080/api/diligency/${id}`); // Adjust the endpoint as needed
        const jsonResponse = JSON.parse(response);
        if (jsonResponse.data) {
          setDiligency(jsonResponse.data);
          setLoading(false);
        } else {
          setError('Error fetching diligence record');
          setLoading(false);
        }
      } catch (err) {
        setError(err.message || 'Error fetching diligence record');
        setLoading(false);
      }
    };

    fetchDiligency();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDiligency((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendPut(`http://localhost:8080/api/diligency/update/${id}`, diligency); // Adjust the endpoint as needed
      const jsonResponse = JSON.parse(response);
      if (jsonResponse.message === 'Diligency record updated successfully') {
        setSuccess('Diligency record updated successfully');
        setTimeout(() => navigate('/diligency'), 2000); // Redirect after success
      } else {
        setError('Error updating diligence record');
      }
    } catch (err) {
      setError(err.message || 'Error updating diligence record');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Container className="my-4">
      <h3>Update Diligency Record</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formStudentId">
          <Form.Label>Student ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Student ID"
            name="studentId"
            value={diligency.studentId || ''}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formCourseId">
          <Form.Label>Course ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Course ID"
            name="courseId"
            value={diligency.courseId || ''}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDate">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={diligency.date ? new Date(diligency.date).toISOString().substr(0, 10) : ''}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formNotes">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="notes"
            value={diligency.notes || ''}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Record
        </Button>
      </Form>
    </Container>
  );
};

export default DiligencyUpdate;
