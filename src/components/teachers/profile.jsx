import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { sendGet, sendDelete } from '../../utils/httpUtil'; // Updated imports
import './TeacherList.css';

const TeacherList = () => {
  const [teacher, setTeacher] = useState([]);
  const [searchId, setSearchId] = useState('');
  const navigate = useNavigate();

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

  // Handle delete teacher
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      try {
        await sendDelete(`http://localhost:8080/api/teacher/delete/${id}`);
        alert('Teacher deleted successfully');
        fetchTeacher(); // Refresh the teacher list after deletion
      } catch (err) {
        alert('Error deleting teacher: ' + err.message);
      }
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
        <button>Thêm Giảng Viên</button>
      </Link>
      {teacher.length === 0 ? (
        <p>No teachers found</p>
      ) : (
        <ul className="teacher-items">
          {teacher.map((teacher) => (
            <li key={teacher._id} className="teacher-item">
              <h3>{teacher.fullname}</h3>
              <p>MGV: {teacher.mgv}</p>
              <p>Lớp: {teacher.classrooms?.name || 'No class assigned'}</p>
              <div className="teacher-actions">
                {/* Edit Button */}
                <Link to={`/teachers/edit/${teacher._id}`}>
                  <button className="btn btn-primary">Edit</button>
                </Link>

                {/* Delete Button */}
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(teacher._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TeacherList;
