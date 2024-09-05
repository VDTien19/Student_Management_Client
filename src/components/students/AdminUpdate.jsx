import React, { useState, useEffect } from 'react';
import { sendGet, sendPut } from '../../utils/httpUtil';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await sendGet(`http://localhost:8080/api/user/${userId}`);
        setFormData(JSON.parse(userResponse).data);

        const majorsResponse = await sendGet(`http://localhost:8080/api/major/${majorId}`);
        setMajors(JSON.parse(majorsResponse));

        const teachersResponse = await sendGet(`http://localhost:8080/api/teacher/${teacherId}`);
        setTeachers(JSON.parse(teachersResponse));
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value, type, selectedOptions } = e.target;

    if (type === 'select-multiple') {
      const values = Array.from(selectedOptions, (option) => option.value);
      setFormData({ ...formData, [name]: values });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendPut(`http://localhost:8080/api/user/updateByAdmin/${userId}`, formData);
      alert('User updated successfully!');
      console.log(response);
    } catch (err) {
      console.error('Failed to update user', err);
      alert('Failed to update user');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="fullname"
        value={formData.fullname}
        onChange={handleChange}
        placeholder="Full Name"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <select name="gender" value={formData.gender} onChange={handleChange}>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <input
        type="text"
        name="className"
        value={formData.className}
        onChange={handleChange}
        placeholder="Class"
      />
      <select name="gvcn" value={formData.gvcn} onChange={handleChange}>
        {teachers.map((teacher) => (
          <option key={teacher._id} value={teacher._id}>{teacher.fullname}</option>
        ))}
      </select>
      <select
        multiple
        name="majorIds"
        value={formData.majorIds}
        onChange={handleChange}
      >
        {majors.map((major) => (
          <option key={major._id} value={major._id}>{major.name}</option>
        ))}
      </select>
      <button type="submit">Update User</button>
    </form>
  );
};

export default AdminUpdateUser;
