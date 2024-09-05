import React, { useEffect, useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { sendGet } from '../../utils/httpUtil';

const TranscriptBySemester = () => {
    const [semesters, setSemesters] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState('');
    const [transcripts, setTranscripts] = useState([]);

    useEffect(() => {
        fetchSemesters();
    }, []);

    const fetchSemesters = async () => {
        try {
            const response = await sendGet('http://localhost:8080/api/semester/getAll');
            setSemesters(JSON.parse(response));
        } catch (error) {
            console.error('Error fetching semesters:', error.message);
        }
    };

    const fetchTranscriptsBySemester = async (semesterId) => {
        try {
            const response = await sendGet(`http://localhost:8080/api/transcript/student/${studentId}/semester/${semesterId}`);
            setTranscripts(JSON.parse(response));
        } catch (error) {
            console.error('Error fetching transcripts:', error.message);
        }
    };

    const handleSemesterChange = (e) => {
        const semesterId = e.target.value;
        setSelectedSemester(semesterId);
        fetchTranscriptsBySemester(semesterId);
    };

    return (
        <div className="container mt-5">
            <h2>Transcripts by Semester</h2>
            <Form.Group controlId="semesterSelect">
                <Form.Label>Select Semester</Form.Label>
                <Form.Control as="select" value={selectedSemester} onChange={handleSemesterChange}>
                    <option value="">Select a semester</option>
                    {semesters.map(semester => (
                        <option key={semester._id} value={semester._id}>
                            {semester.name}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>
            
            {transcripts.length > 0 ? (
                <Table striped bordered hover className="mt-3">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Student Name</th>
                            <th>GPA</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transcripts.map(transcript => (
                            <tr key={transcript._id}>
                                <td>{transcript._id}</td>
                                <td>{transcript.student.name}</td>
                                <td>{transcript.gpa}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                selectedSemester && <p>No transcripts found for this semester.</p>
            )}
        </div>
    );
};

export default TranscriptBySemester;
