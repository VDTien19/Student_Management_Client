import React, { useState } from 'react';
import { sendPost } from '../../utils/httpUtil';

const CreateDiligence = ({ onSuccess, onClose }) => {
  const [studentId, setStudentId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { courseId, date, notes };
    try {
      await sendPost(`http://localhost:8080/api/diligency/create/${studentId}`, data);
      onSuccess();
      alert('Diligence record created successfully');
    } catch (error) {
      console.error(error.message);
      alert('Error creating diligence record');
    }
  };

  return (
    <div>
      <h2>Create Diligence</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} placeholder="Student ID" required />
        <input type="text" value={courseId} onChange={(e) => setCourseId(e.target.value)} placeholder="Course ID" required />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes"></textarea>
        <button type="submit">Create</button>
      </form>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default CreateDiligence;
