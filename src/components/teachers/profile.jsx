import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('/api/teachers/getAll');
      setTeachers(response.data.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Teacher List</h2>
      <Link to="/teachers/add">
        <button>Add Teacher</button>
      </Link>
      {teachers.length === 0 ? (
        <p>No teachers found</p>
      ) : (
        <ul>
          {teachers.map(teacher => (
            <li key={teacher._id}>
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
