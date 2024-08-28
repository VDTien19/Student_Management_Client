import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { sendGet } from '../../utils/httpUtil'; // Updated import
import './TeacherList.css';

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchId, setSearchId] = useState('');

  const fetchTeachers = async () => {
    try {
      const response = await sendGet('http://localhost:8080/api/teacher/getAll');
      setTeachers(response.data || []);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const searchUserById = async (id) => {
    try {
      const response = await sendGet(`http://localhost:8080/api/teacher/${id}`);
      if (response.data) {
        setTeachers([response.data]);
      } else {
        alert('Teacher not found');
      }
    } catch (err) {
      alert('Error fetching teacher: ' + err.message);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchId.trim()) {
      searchUserById(searchId);
    } else {
      alert('Please enter a valid teacher ID');
    }
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;

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
      {teachers.length === 0 ? (
        <p>No teachers found</p>
      ) : (
        <ul className="teacher-items">
          {teachers.map(teacher => (
            <li key={teacher._id} className="teacher-item">
              <h3>{teacher.fullname}</h3>
              <p>MGV: {teacher.mgv}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TeacherList;
