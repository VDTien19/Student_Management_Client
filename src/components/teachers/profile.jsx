import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { sendGet } from '../../utils/httpUtil'; // Updated import
import './TeacherList.css';

const TeacherList = () => {
  const [teacher, setTeacher] = useState([]);
  const [searchId, setSearchId] = useState('');

  const fetchTeacher = async () => {
    try {
      const response = await sendGet('http://localhost:8080/api/teacher/getAll');
      const currentTeacherData = JSON.parse(response);
      setTeacher(currentTeacherData.data);
    } catch (err) {
      console.error('Error fetching teachers: ', err);
    }
  };

  const searchUserByMGV = async (mgv) => {
    try {
      // Update the search URL to use the GET /:teacherId route
      const response = await sendGet(`http://localhost:8080/api/teacher/${mgv}`);
      const teacherData = JSON.parse(response);

      if (teacherData && teacherData.data) {
        setTeacher([teacherData.data]); // Set the single teacher found
      } else {
        alert('Teacher not found');
      }
    } catch (err) {
      alert('Error fetching teacher: ' + err.message);
    }
  };

  useEffect(() => {
    fetchTeacher();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchId.trim()) {
      searchUserByMGV(searchId);
    } else {
      alert('Please enter a valid teacher MGV');
    }
  };

  return (
    <div className="teacher-list">
      <h2>Danh sách giảng viên</h2>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search by Teacher MGV"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <Link to="/teachers/add" className="add-button">
        <button>Add Teacher</button>
      </Link>
      {teacher.length === 0 ? (
        <p>No teachers found</p>
      ) : (
        <ul className="teacher-items">
          {teacher.map(teacher => (
            <li key={teacher._id} className="teacher-item">
              <h3>{teacher.fullname}</h3>
              <p>MGV: {teacher.mgv}</p>
              <p>
                Class: {teacher.classrooms?.name || 'No class assigned'}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TeacherList;
