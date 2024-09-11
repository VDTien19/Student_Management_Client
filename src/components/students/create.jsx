import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './addUser.css';
import { sendPost, sendGet } from '../../utils/httpUtil';

const AddUser = () => {
  const navigate = useNavigate();
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
      await sendPost('http://localhost:8080/api/user/create-user', formData);
      alert('User added successfully');
      navigate('/users');
    } catch (err) {
      alert('Error adding user: ' + err.message);
    }
  };

  useEffect(() => {
    const fetchMajorsAndTeachers = async () => {
      try {
        const majorResponse = await sendGet('http://localhost:8080/api/major/getAll');
        const teacherResponse = await sendGet('http://localhost:8080/api/teacher/getAll');
        const dataMajor = JSON.parse(majorResponse);
        const dataTeacher = JSON.parse(teacherResponse);
        setMajors(dataMajor.data || []);
        setTeachers(dataTeacher.data || []);
      } catch (err) {
        console.error('Error fetching data:', err.message);
      }
    };
    fetchMajorsAndTeachers();
  }, []);

  return (
    <div className="add-user">
      <form onSubmit={handleAddUser}>
      <div className="form-group">
          <label>Họ và Tên:</label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>MSV:</label>
          <input
            type="text"
            name="msv"
            value={formData.msv}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Năm Học:</label>
          <input
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Lớp:</label>
          <input
            type="text"
            name="className"
            value={formData.class}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Giới Tính:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="Male">Nam</option>
            <option value="Female">Nữ</option>
            <option value="Other">Khác</option>
          </select>
        </div>
        <div className="form-group">
          <label>Giáo Viên (GVCN):</label>
          <select
            name="gvcn"
            value={formData.gvcn}
            onChange={handleChange}
          >
            <option value="">Chọn Giáo Viên</option>
            {Array.isArray(teachers) && teachers.map(teacher => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.fullname} (MGV: {teacher.mgv})
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Chuyên Ngành:</label>
          <select
            name="majorIds"
            value={formData.majorIds}
            onChange={handleSelectMajor}
          >
            <option value="">Chọn Ngành</option>
            {Array.isArray(majors) && majors.map(major => (
              <option key={major._id} value={major._id}>
                {major.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button type="submit">Thêm</button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
