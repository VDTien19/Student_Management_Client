import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfileUpdate = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    gender: '',
    dob: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    axios.get(`/api/user/${localStorage.getItem('userId')}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    .then((res) => setFormData(res.data.data))
    .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/user/updateProfile/${localStorage.getItem('userId')}`, formData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    .then((res) => alert('Profile updated successfully!'))
    .catch((err) => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} placeholder="Full Name" />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <input type="date" name="dob" value={formData.dob} onChange={handleChange} placeholder="Date of Birth" />
      <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
      <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
      <select name="gender" value={formData.gender} onChange={handleChange}>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default UserProfileUpdate;
