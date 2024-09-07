import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { sendGet, sendDelete } from '../../utils/httpUtil';
import DiligencyCreate from './createDiligency'; 

const DiligencyList = () => {
  const [diligencies, setDiligencies] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchDiligencies = async () => {
      try {
        const response = await sendGet('http://localhost:8080/api/diligency/getAll');
        const jsonResponse = JSON.parse(response);
        if (jsonResponse.data) {
          setDiligencies(jsonResponse.data);
        } else {
          setError('Error fetching diligence records');
        }
      } catch (err) {
        setError(err.message || 'Error fetching diligence records');
      }
    };

    fetchDiligencies();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        const response = await sendDelete(`http://localhost:8080/api/diligency/delete/${id}`);
        const jsonResponse = JSON.parse(response);
        if (jsonResponse.message === 'Diligency record deleted successfully') {
          setSuccess('Diligency record deleted successfully');
          setDiligencies(diligencies.filter((item) => item._id !== id));
        } else {
          setError('Error deleting diligence record');
        }
      } catch (err) {
        setError(err.message || 'Error deleting diligence record');
      }
    }
  };

  return (
    <Container className="my-4">
      <h3>Diligency Records</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Button
        variant="primary"
        onClick={() => setShowCreateForm(!showCreateForm)}
        className="mb-3"
      >
        {showCreateForm ? 'Cancel' : 'Add New Diligency Record'}
      </Button>

      {showCreateForm && <DiligencyCreate />}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Student</th>
            <th>Course</th>
            <th>Date</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {diligencies.map((diligency) => (
            <tr key={diligency._id}>
              <td>{diligency.studentId.fullname}</td>
              <td>{diligency.courseId.courseName}</td>
              <td>{new Date(diligency.date).toDateString()}</td>
              <td>{diligency.notes}</td>
              <td>
                <Link to={`/diligency/update/${diligency._id}`}>
                    <Button variant="warning" size="sm" className="me-2">Edit</Button>
                </Link>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(diligency._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default DiligencyList;
