import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { sendGet, sendDelete } from '../../utils/httpUtil';
import CreateTranscript from './createTranscript';
import UpdateTranscript from './updateTranscript';

const TranscriptList = () => {
    const [transcripts, setTranscripts] = useState([]);
    const [selectedTranscript, setSelectedTranscript] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    useEffect(() => {
        fetchTranscripts();
    }, []);

    const fetchTranscripts = async () => {
        try {
            const response = await sendGet('http://localhost:8080/api/transcript/getAll');
            setTranscripts(JSON.parse(response));
        } catch (error) {
            console.error('Error fetching transcripts:', error.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            await sendDelete(`http://localhost:8080/api/transcript/delete/${id}`);
            fetchTranscripts();
        } catch (error) {
            console.error('Error deleting transcript:', error.message);
        }
    };

    const handleCreate = () => {
        setShowCreateModal(true);
    };

    const handleEdit = (transcript) => {
        setSelectedTranscript(transcript);
        setShowUpdateModal(true);
    };

    return (
        <div className="container mt-5">
            <h2>Transcripts</h2>
            <Button variant="primary" onClick={handleCreate}>Add New Transcript</Button>
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Student Name</th>
                        <th>Semester</th>
                        <th>GPA</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {transcripts.map(transcript => (
                        <tr key={transcript._id}>
                            <td>{transcript._id}</td>
                            <td>{transcript.student.name}</td>
                            <td>{transcript.semester.name}</td>
                            <td>{transcript.gpa}</td>
                            <td>
                                <Button variant="info" onClick={() => handleEdit(transcript)}>Edit</Button>{' '}
                                <Button variant="danger" onClick={() => handleDelete(transcript._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <CreateTranscript
                show={showCreateModal}
                onHide={() => setShowCreateModal(false)}
                onSave={fetchTranscripts}
            />

            <UpdateTranscript
                show={showUpdateModal}
                onHide={() => setShowUpdateModal(false)}
                onSave={fetchTranscripts}
                transcript={selectedTranscript}
            />
        </div>
    );
};

export default TranscriptList;
