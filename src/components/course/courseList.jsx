import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container, Alert, Spinner } from 'react-bootstrap';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/getAll', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.data && Array.isArray(response.data.data)) {
          setCourses(response.data.data);
        } else {
          throw new Error('Invalid data format');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

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
      <h1>Danh sách môn học</h1>
      <Link to="/add-course">
        <Button variant="primary" className="mb-3">
          Add Course
        </Button>
      </Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Code</th>
            <th>Credit</th>
            <th>Major</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course._id}>
              <td>{course.name}</td>
              <td>{course.code}</td>
              <td>{course.credit}</td>
              <td>{course.majorId?.name || 'Unknown'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default CourseList;
