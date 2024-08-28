import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';

const StudentForm = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    msv: '',
    year: '',
    gvcn: '',
    gender: '',
    className: '',
    email: '',
    majorIds: []
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/user/create-user', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      setSuccess('Student added successfully!');
      setError('');
      setFormData({
        fullname: '',
        msv: '',
        year: '',
        gvcn: '',
        gender: '',
        className: '',
        email: '',
        majorIds: []
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add student');
      setSuccess('');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Student</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="fullname">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter full name"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="msv">
          <Form.Label>MSV</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter MSV"
            name="msv"
            value={formData.msv}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="year">
          <Form.Label>Year</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="gvcn">
          <Form.Label>Teacher ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter teacher ID"
            name="gvcn"
            value={formData.gvcn}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="gender">
          <Form.Label>Gender</Form.Label>
          <Form.Control
            as="select"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="className">
          <Form.Label>Class Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter class name"
            name="className"
            value={formData.className}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="majorIds">
          <Form.Label>Major IDs (comma separated)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter major IDs"
            name="majorIds"
            value={formData.majorIds}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Student
        </Button>
      </Form>
    </div>
  );
};

export default StudentForm;
