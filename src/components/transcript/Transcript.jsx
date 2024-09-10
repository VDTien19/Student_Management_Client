import React, { useEffect, useState } from 'react';
import { Table, Button, Collapse } from 'react-bootstrap';
import { sendGet, sendDelete } from '../../utils/httpUtil';
import CreateTranscript from './createTranscript';
import UpdateTranscript from './updateTranscript';

const TranscriptList = () => {
    const [transcripts, setTranscripts] = useState([]);
    const [grades, setGrades] = useState([]);
    const [selectedTranscript, setSelectedTranscript] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [expandedTranscript, setExpandedTranscript] = useState(null); // Track expanded transcript for grades

    useEffect(() => {
        fetchTranscripts();
        fetchGrades();
    }, []);

    const fetchTranscripts = async () => {
        try {
            const response = await sendGet('http://localhost:8080/api/transcript/getAll');
            const parsedResponse = JSON.parse(response);
            const data = parsedResponse.data; // Extract transcript array from response
            if (Array.isArray(data)) {
                setTranscripts(data);
            } else {
                console.error('Unexpected data format:', data);
            }
        } catch (error) {
            console.error('Error fetching transcripts:', error.message);
        }
    };

    const fetchGrades = async () => {
        try {
            const response = await sendGet('http://localhost:8080/api/grade/getAll');
            const parsedResponse = JSON.parse(response);
            const data = parsedResponse.grades;
            setGrades(data);
        } catch (error) {
            console.error('Error fetching grades:', error.message);
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

    // Toggle grades visibility for a transcript
    const toggleGradesVisibility = (transcriptId) => {
        if (expandedTranscript === transcriptId) {
            setExpandedTranscript(null); // Collapse if already expanded
        } else {
            setExpandedTranscript(transcriptId); // Expand the clicked transcript
        }
    };

    // Calculate GPA for a specific student
    const calculateGPA = (studentId) => {
        const studentGrades = grades.filter(grade => grade.student?._id === studentId);
        if (studentGrades.length === 0) return 'N/A';

        const totalScore = studentGrades.reduce((total, grade) => {
            return total + (grade.midScore + grade.finalScore) / 2;
        }, 0);

        return (totalScore / studentGrades.length).toFixed(2);
    };

    // Get grades for a specific student in a transcript
    const getGradesForStudent = (studentId) => {
        return grades.filter(grade => grade.student?._id === studentId);
    };

    return (
        <div className="container mt-5">
            <h2>Bảng Điểm</h2>
            <Button variant="primary" onClick={handleCreate}>Thêm</Button>
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th> Tên Sinh Viên</th>
                        <th>MSV</th>
                        <th>Kì Học</th>
                        <th>GPA</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {transcripts.map(transcript => (
                        <React.Fragment key={transcript?._id}>
                            <tr>
                                <td>{transcript?.student?.fullname || 'N/A'}</td>
                                <td>{transcript?.student?.msv || 'N/A'}</td>
                                <td>{transcript?.semester?.semester || 'N/A'} - {transcript?.semester?.year || 'N/A'}</td>
                                <td>{calculateGPA(transcript?.student?._id)}</td> {/* Calculate GPA from grades */}
                                <td>
                                    <Button variant="info" onClick={() => handleEdit(transcript)}>Sửa</Button>{' '}
                                    <Button variant="danger" onClick={() => handleDelete(transcript?._id)}>Xoá</Button>{' '}
                                    <Button
                                        variant="secondary"
                                        onClick={() => toggleGradesVisibility(transcript?._id)}
                                    >
                                        {expandedTranscript === transcript?._id ? 'Hide Grades' : 'Show Grades'}
                                    </Button>
                                </td>
                            </tr>

                            {/* Grades table for the student in this transcript */}
                            <tr>
                                <td colSpan="6">
                                    <Collapse in={expandedTranscript === transcript?._id}>
                                        <div>
                                            <Table striped bordered>
                                                <thead>
                                                    <tr>
                                                        <th>Môn Học</th>
                                                        <th>Điểm Giữa Kì</th>
                                                        <th>Điểm Cuối Kì</th>
                                                        <th>Điểm Trung Bình</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {getGradesForStudent(transcript?.student?._id).map(grade => (
                                                        <tr key={grade?._id}>
                                                            <td>{grade.course?.name || 'N/A'}</td>
                                                            <td>{grade.midScore || 'N/A'}</td>
                                                            <td>{grade.finalScore || 'N/A'}</td>
                                                            <td>{((grade.midScore + grade.finalScore) / 2).toFixed(2)}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </div>
                                    </Collapse>
                                </td>
                            </tr>
                        </React.Fragment>
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
                transcript={selectedTranscript}
                onSave={fetchTranscripts}
            />
        </div>
    );
};

export default TranscriptList;
