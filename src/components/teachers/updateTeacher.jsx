import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { sendGet, sendPut } from '../../utils/httpUtil'; // Adjust the path as necessary

const UpdateTeacher = ({ id }) => {
  const [teacher, setTeacher] = useState({ fullname: '', password: '', isGV: true, isAdmin: false, classrooms: [] });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('UpdateTeacher id:', id); // Check the value of id
    const fetchTeacher = async () => {
      try {
        const response = await sendGet(`http://localhost:8080/api/teacher/${id}`);
        const teacherData = response.data;
        
        if (teacherData) {
          setTeacher(teacherData.data);
        } else {
          setError('Teacher not found');
        }
      } catch (err) {
        setError('Error fetching teacher: ' + err.message);
      }
    };
  
    fetchTeacher();
  }, [id]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacher((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
  
    try {
      const response = await sendPut(`http://localhost:8080/api/teacher/update/${id}`, teacher);
      setSuccess('Teacher updated successfully!');
      setTeacher(response.data.data); // Assuming response contains the updated teacher data
    } catch (err) {
      setError('Failed to update teacher: ' + err.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Container>
      <h2 className="mt-4">Update Teacher</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="fullname">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="fullname"
            value={teacher.fullname || ''} // Ensure value is a string
            onChange={handleChange}
            placeholder="Enter full name"
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Teacher'}
        </Button>
      </Form>
    </Container>
  );
};

export default UpdateTeacher;
