import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const AddTeacher = () => {
  const history = useHistory();
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
      await axios.post('/api/teachers/create-teacher', formData);
      alert('Teacher added successfully');
      history.push('/teachers');
    } catch (err) {
      alert('Error adding teacher: ' + err.message);
    }
  };

  return (
    <div>
      <h2>Add New Teacher</h2>
      <form onSubmit={handleAddTeacher}>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>MGV (Teacher ID):</label>
          <input
            type="text"
            name="mgv"
            value={formData.mgv}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">Add Teacher</button>
        </div>
      </form>
    </div>
  );
};

export default AddTeacher;
