import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container, Alert, Spinner, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/getAll', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setCourses(response.data.data || []); // Đảm bảo rằng courses là mảng
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await axios.delete(`/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        setDeleteMessage('Course deleted successfully!');
        fetchCourses();
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      }
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
      <h1>Course List</h1>
      <Link to="/add-course">
        <Button variant="primary" className="mb-3">
          Add Course
        </Button>
      </Link>
      {deleteMessage && (
        <Alert variant="success" className="mt-3">
          {deleteMessage}
        </Alert>
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Code</th>
            <th>Credit</th>
            <th>Major</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.length > 0 ? (
            courses.map((course) => (
              <tr key={course._id}>
                <td>{course.name}</td>
                <td>{course.code}</td>
                <td>{course.credit}</td>
                <td>{course.majorId?.name || 'Unknown'}</td>
                <td>
                  <Link to={`/edit-course/${course._id}`}>
                    <Button variant="warning" className="mr-2">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(course._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No courses available
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default CourseList;