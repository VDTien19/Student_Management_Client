import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { sendGet } from '../../utils/httpUtil'; // Updated import
import './TeacherList.css';

const TeacherList = () => {
  const [teacher, setTeacher] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const [searchId, setSearchId] = useState('');

  const fetchTeacher = async () => {
    try {
      const response = await sendGet('http://localhost:8080/api/teacher/getAll');
      const currentTeacherData = JSON.parse(response);
      setTeacher(currentTeacherData.data);
    } catch (err) {
      console.error('Error fetching current user: ', err);
    }
  };

  
  const searchUserByMGV = async (mgv) => {
    try {
      const response = await sendGet(`http://localhost:8080/api/teacher/search/${mgv}`);
        if (response && response.data) {
          setTeacher([response.data]);
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

  // if (loading) return <p className="loading">Loading...</p>;
  // if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="teacher-list">
      <h2>Danh sách giảng viên</h2>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search by Teacher ID"
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
                Class: {teacher.classrooms.length > 0
                  ? teacher.classrooms.map(classroom => classroom.name).join(', ')
                  : 'N/A'}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TeacherList;
