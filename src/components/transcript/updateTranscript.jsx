import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { sendPut } from '../../utils/httpUtil'; 

const UpdateTranscript = ({ show, onHide, onSave, transcript }) => {
    const [updatedTranscript, setUpdatedTranscript] = useState({ studentId: '', semesterId: '', gpa: '' });

    useEffect(() => {
        if (transcript) {
            setUpdatedTranscript({
                studentId: transcript.student._id,
                semesterId: transcript.semester._id,
                gpa: transcript.gpa,
            });
        }
    }, [transcript]);

    const handleSave = async () => {
        try {
            await sendPut(`http://localhost:8080/api/transcript/update/${transcript._id}`, updatedTranscript);
            onSave(); // Refresh the transcript list
            onHide(); // Close the modal
        } catch (error) {
            console.error('Error updating transcript:', error.message);
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Sửa Bảng Điểm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Mã Sinh viên</Form.Label>
                        <Form.Control
                            type="text"
                            value={updatedTranscript.studentId}
                            onChange={(e) => setUpdatedTranscript({ ...updatedTranscript, studentId: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Mã Học Kì</Form.Label>
                        <Form.Control
                            type="text"
                            value={updatedTranscript.semesterId}
                            onChange={(e) => setUpdatedTranscript({ ...updatedTranscript, semesterId: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>GPA</Form.Label>
                        <Form.Control
                            type="number"
                            value={updatedTranscript.gpa}
                            onChange={(e) => setUpdatedTranscript({ ...updatedTranscript, gpa: e.target.value })}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Đóng</Button>
                <Button variant="primary" onClick={handleSave}>Lưu</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateTranscript;
