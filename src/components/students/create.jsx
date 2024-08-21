import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const AddUser = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    fullname: '',
    msv: '',
    year: '',
    gvcn: '',
    gender: 'Male',
    className: '',
    email: '',
    majorIds: [],
  });

  const [majors, setMajors] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectMajor = (e) => {
    const selectedMajors = Array.from(e.target.selectedOptions, option => option.value);
    setFormData({ ...formData, majorIds: selectedMajors });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/users/create-user', formData);
      alert('User added successfully');
      history.push('/users');
    } catch (err) {
      alert('Error adding user: ' + err.message);
    }
  };

  useEffect(() => {
    const fetchMajorsAndTeachers = async () => {
      try {
        const majorResponse = await axios.get('/api/majors');
        const teacherResponse = await axios.get('/api/teachers');
        setMajors(majorResponse.data.data);
        setTeachers(teacherResponse.data.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchMajorsAndTeachers();
  }, []);

  return (
    <div>
      <h2>Add New User</h2>
      <form onSubmit={handleAddUser}>
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
          <label>MSV (Student ID):</label>
          <input
            type="text"
            name="msv"
            value={formData.msv}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Year:</label>
          <input
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Class:</label>
          <input
            type="text"
            name="className"
            value={formData.className}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label>Teacher (GVCN):</label>
          <select
            name="gvcn"
            value={formData.gvcn}
            onChange={handleChange}
          >
            <option value="">Select a teacher</option>
            {teachers.map(teacher => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Majors:</label>
          <select
            name="majorIds"
            multiple
            value={formData.majorIds}
            onChange={handleSelectMajor}
          >
            {majors.map(major => (
              <option key={major._id} value={major._id}>
                {major.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button type="submit">Add User</button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
