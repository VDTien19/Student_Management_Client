import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendPost } from '../../utils/httpUtil';
import './AddMajor.css';

const AddMajor = ({ onAddMajor }) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddMajor = async (e) => {
    e.preventDefault();
    try {
      const response = await sendPost('http://localhost:8080/api/major/create', formData);
      const responseData = JSON.parse(response);
      if (responseData && responseData.data) {
        onAddMajor(responseData.data);
        setFormData({
          name: '',
          code: '',
        });
        alert('Major added successfully');
      } else {
        throw new Error(response);
      }
    } catch (err) {
      alert('Error adding major: ' + err.message);
    }
  };

  return (
    <div className="add-Major-container">
      <h2>Add New Major</h2>
      <form onSubmit={handleAddMajor} className="add-Major-form">
        <div className="form-group">
          <label htmlFor="name">Major Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="code">Major Code:</label>
          <input
            id="code"
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <button type="submit" className="submit-button">Add Major</button>
        </div>
      </form>
    </div>
  );
};

export default AddMajor;
