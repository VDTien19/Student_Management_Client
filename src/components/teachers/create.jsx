import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendPost } from '../../utils/httpUtil'
import './AddTeacher.css';

const AddTeacher = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: '',
    mgv: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddTeacher = async (e) => {
    e.preventDefault();
    try {
      await sendPost('http://localhost:8080/api/teacher/create-teacher', formData);
      alert('Teacher added successfully');
      navigate('/teachers');
    } catch (err) {
      alert('Error adding teacher: ' + err.message);
    }
  };

  return (
    <div className="add-teacher-container">
      <h2>Add New Teacher</h2>
      <form onSubmit={handleAddTeacher} className="add-teacher-form">
        <div className="form-group">
          <label htmlFor="fullname">Full Name:</label>
          <input
            id="fullname"
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="mgv">MGV (Teacher ID):</label>
          <input
            id="mgv"
            type="text"
            name="mgv"
            value={formData.mgv}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <button type="submit" className="submit-button">Add Teacher</button>
        </div>
      </form>
    </div>
  );
};

export default AddTeacher;
