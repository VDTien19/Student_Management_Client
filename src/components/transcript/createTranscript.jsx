import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { sendPost } from '../../utils/httpUtil';

const CreateTranscript = ({ show, onHide, onSave }) => {
    const [newTranscript, setNewTranscript] = useState({ studentId: '', semesterId: '', gpa: '' });

    const handleSave = async () => {
        try {
            await sendPost('http://localhost:8080/api/transcript/create', newTranscript);
            onSave();
            onHide();
        } catch (error) {
            console.error('Error creating transcript:', error.message);
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Transcript</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Student ID</Form.Label>
                        <Form.Control
                            type="text"
                            value={newTranscript.studentId}
                            onChange={(e) => setNewTranscript({ ...newTranscript, studentId: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Semester ID</Form.Label>
                        <Form.Control
                            type="text"
                            value={newTranscript.semesterId}
                            onChange={(e) => setNewTranscript({ ...newTranscript, semesterId: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>GPA</Form.Label>
                        <Form.Control
                            type="number"
                            value={newTranscript.gpa}
                            onChange={(e) => setNewTranscript({ ...newTranscript, gpa: e.target.value })}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
                <Button variant="primary" onClick={handleSave}>Create Transcript</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateTranscript;
