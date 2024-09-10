import React, { useState, useEffect } from 'react';
import { sendGet, sendPut } from '../../utils/httpUtil'; // Sử dụng tiện ích HTTP đã được chia sẻ trước đó

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
    const fetchUserProfile = async () => {
      try {
        const response = await sendGet(`http://localhost:8080/api/user/${localStorage.getItem('userId')}`);
        const userData = JSON.parse(response);
        setFormData(userData.data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendPut(`http://localhost:8080/api/user/updateProfile/${localStorage.getItem('userId')}`, formData);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile: ', err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} placeholder="Full Name" />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <input type="date" name="dob" value={formData.dob} onChange={handleChange} placeholder="Date of Birth" />
      <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
      <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
      <select name="gender" value={formData.gender} onChange={handleChange}>
        <option value="male">Nam</option>
        <option value="female">Nữ</option>
      </select>
      <button type="submit">Sửa</button>
    </form>
  );
};

export default UserProfileUpdate;
