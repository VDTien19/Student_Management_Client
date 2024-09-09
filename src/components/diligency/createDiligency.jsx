import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { sendPost, sendGet } from '../../utils/httpUtil'; // Adjust the import path as needed

const DiligencyCreate = () => {
  const [studentId, setStudentId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Fetch students and courses for dropdowns
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const studentsResponse = await sendGet('http://localhost:8080/api/user/getAll'); // Adjust the endpoint as needed
        const studentsJson = JSON.parse(studentsResponse);
        if (studentsJson.data) {
          setStudents(studentsJson.data);
        } else {
          setError('Error fetching students');
        }

        const coursesResponse = await sendGet('http://localhost:8080/api/course/getAll'); // Adjust the endpoint as needed
        const coursesJson = JSON.parse(coursesResponse);
        if (coursesJson.data) {
          setCourses(coursesJson.data);
        } else {
          setError('Error fetching courses');
        }
      } catch (err) {
        setError(err.message || 'Error fetching options');
      }
    };

    fetchOptions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestData = { courseId, date, notes };

    try {
      const response = await sendPost(`http://localhost:8080/api/diligency/create/${studentId}`, requestData);
      const jsonResponse = JSON.parse(response);

      if (jsonResponse.message === 'Diligency record created successfully') {
        setMessage('Diligency record added successfully!');
        setStudentId('');
        setCourseId('');
        setDate('');
        setNotes('');
      } else {
        setError('Error creating diligence record');
      }
    } catch (err) {
      setError(err.message || 'Error creating diligence record');
    }
  };

  return (
    <Container className="my-4">
      <h3>Add New Diligency Record</h3>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="studentId">
          <Form.Label>Student</Form.Label>
          <Form.Control
            as="select"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          >
            <option value="">Select a student</option>
            {students.map((student) => (
              <option key={student._id} value={student._id}>
                {student.fullname}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="courseId">
          <Form.Label>Course</Form.Label>
          <Form.Control
            as="select"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            required
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="date">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="notes">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Record
        </Button>
      </Form>
    </Container>
  );
};

export default DiligencyCreate;
