import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './TeacherList.css';

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchId, setSearchId] = useState('');

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('/api/teachers/getAll');
      setTeachers(response.data.data || []);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const searchUserById = async (id) => {
    try {
      const response = await axios.get(`/api/teachers/${id}`);
      if (response.data.data) {
        setUsers([response.data.data]);
      } else {
        alert('User not found');
      }
    } catch (err) {
      alert('Error fetching user: ' + err.message);
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
      {Array.isArray(teachers) && teachers.length === 0 ? (
        <p>No teachers found</p>
      ) : (
        <ul className="teacher-items">
          {Array.isArray(teachers) && teachers.map(teacher => (
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
