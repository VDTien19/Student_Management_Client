// src/components/transcript/TranscriptByStudent.jsx

import React, { useState, useEffect } from 'react';
import { Form, Button, Table, Alert, Spinner } from 'react-bootstrap';
import { sendGet } from '../../utils/httpUtil';

const TranscriptByStudent = () => {
    const [students, setStudents] = useState([]);
    const [studentId, setStudentId] = useState('');
    const [transcripts, setTranscripts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await sendGet('http://localhost:8080/api/user/getAll');
            const data = JSON.parse(response);
            setStudents(data);
        } catch (err) {
            setError('Failed to fetch students.');
            console.error('Error fetching students:', err.message);
        }
    };

    const handleFetchTranscripts = async (e) => {
        e.preventDefault();
        if (!studentId) {
            setError('Please select a Student.');
            return;
        }

        setLoading(true);
        setError('');
        setTranscripts([]);

        try {
            const response = await sendGet(`http://localhost:8080/api/transcript/student/${studentId}`);
            const data = JSON.parse(response);
            setTranscripts(data);
        } catch (err) {
            setError('Failed to fetch transcripts. Please check the Student selection and try again.');
            console.error('Error fetching transcripts:', err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <h2>View Transcripts by Student</h2>
            <Form onSubmit={handleFetchTranscripts} className="mb-4">
                <Form.Group controlId="studentId">
                    <Form.Label>Select Student</Form.Label>
                    <Form.Control
                        as="select"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                    >
                        <option value="">-- Select Student --</option>
                        {students.map((student) => (
                            <option key={student._id} value={student._id}>
                                {student.name} (ID: {student._id})
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Fetch Transcripts'}
                </Button>
            </Form>

            {error && <Alert variant="danger">{error}</Alert>}

            {transcripts.length > 0 && (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Semester</th>
                            <th>GPA</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transcripts.map((transcript) => (
                            <tr key={transcript._id}>
                                <td>{transcript._id}</td>
                                <td>{transcript.semester.name}</td>
                                <td>{transcript.gpa}</td>
                                <td>
                                    {/* Add any additional actions here, such as viewing details */}
                                    {/* Example: <Button variant="info">View</Button> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            {!loading && transcripts.length === 0 && !error && (
                <p>No transcripts to display. Please select a Student and fetch transcripts.</p>
            )}
        </div>
    );
};

export default TranscriptByStudent;
