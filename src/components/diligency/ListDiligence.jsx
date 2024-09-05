import React, { useState, useEffect } from 'react';
import { sendGet, sendDelete } from '../../utils/httpUtil';
import Modal from '../modal/Modal';
import CreateDiligence from './CreateDiligence';
import UpdateDiligence from './UpdateDiligence';

const ListDiligence = () => {
    const [diligences, setDiligences] = useState([]);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [selectedDiligence, setSelectedDiligence] = useState(null); // Ensure it's an object or null
    const [updateId, setUpdateId] = useState('');

    useEffect(() => {
        const fetchDiligences = async () => {
            try {
                const response = await sendGet('http://localhost:8080/api/diligency/getAll');
                const data = JSON.parse(response);
                setDiligences(data.data);
            } catch (error) {
                console.error(error.message);
                alert('Error fetching diligence records');
            }
        };
        fetchDiligences();
    }, []);

    const handleDelete = async (id) => {
        try {
            await sendDelete(`http://localhost:8080/api/diligency/delete/${id}`);
            setDiligences(diligences.filter(d => d._id !== id));
            alert('Diligence record deleted successfully');
        } catch (error) {
            console.error(error.message);
            alert('Error deleting diligence record');
        }
    };

    const openUpdateModal = (id) => {
        setUpdateId(id);
        setIsUpdateOpen(true);
    };

    const openDetailModal = (diligence) => {
        setSelectedDiligence(diligence);
    };

    return (
        <div>
            <button onClick={() => setIsCreateOpen(true)}>Create New Diligence</button>
            <ul>
                {diligences.map(d => {
                    const student = d.studentId || {};
                    return (
                        <li key={d._id}>
                            <span>{student.fullname || 'Unknown'} - {d.date ? new Date(d.date).toLocaleDateString() : 'Unknown'} - {d.status}</span>
                            <button onClick={() => openUpdateModal(d._id)}>Update</button>
                            <button onClick={() => openDetailModal(d)}>View</button>
                            <button onClick={() => handleDelete(d._id)}>Delete</button>
                        </li>
                    );
                })}
            </ul>

            <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)}>
                <CreateDiligence onSuccess={() => {
                    setIsCreateOpen(false);
                    // Refresh list
                    sendGet('http://localhost:8080/api/diligency/getAll').then(response => setDiligences(JSON.parse(response).data));
                }} onClose={() => setIsCreateOpen(false)} />
            </Modal>

            <Modal isOpen={isUpdateOpen} onClose={() => setIsUpdateOpen(false)}>
                <UpdateDiligence id={updateId} onSuccess={() => {
                    setIsUpdateOpen(false);
                    // Refresh list
                    sendGet('http://localhost:8080/api/diligency/getAll').then(response => setDiligences(JSON.parse(response).data));
                }} onClose={() => setIsUpdateOpen(false)} />
            </Modal>

            {selectedDiligence && (
                <Modal isOpen={Boolean(selectedDiligence)} onClose={() => setSelectedDiligence(null)}>
                    <div>
                        <h2>Diligence Details for Student: {selectedDiligence.studentId?.fullname || 'Unknown'}</h2>
                        <p>Total Absences: {selectedDiligence.totalAbsences}</p>
                        <p>Status: {selectedDiligence.status}</p>
                        <ul>
                            {selectedDiligence.records && selectedDiligence.records.map(record => (
                                <li key={record._id}>
                                    <span>{new Date(record.date).toLocaleDateString()} - {record.courseId} - {record.notes}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default ListDiligence;
