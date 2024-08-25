import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminUpdateUser = ({ userId }) => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    gender: '',
    className: '',
    gvcn: '',
    majorIds: [],
  });

  const [majors, setMajors] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    axios.get(`/api/user/${userId}`).then((res) => {
      setFormData(res.data.data);
    });

    axios.get('/api/majors').then((res) => setMajors(res.data));
    axios.get('/api/teachers').then((res) => setTeachers(res.data));
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/user/updateByAdmin/${userId}`, formData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    .then((res) => alert('User updated successfully!'))
    .catch((err) => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} placeholder="Full Name" />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <select name="gender" value={formData.gender} onChange={handleChange}>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <input type="text" name="className" value={formData.className} onChange={handleChange} placeholder="Class" />
      <select name="gvcn" value={formData.gvcn} onChange={handleChange}>
        {teachers.map((teacher) => (
          <option key={teacher._id} value={teacher._id}>{teacher.fullname}</option>
        ))}
      </select>
      <select multiple name="majorIds" value={formData.majorIds} onChange={handleChange}>
        {majors.map((major) => (
          <option key={major._id} value={major._id}>{major.name}</option>
        ))}
      </select>
      <button type="submit">Update User</button>
    </form>
  );
};

export default AdminUpdateUser;
