import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { sendGet, sendDelete } from '../../utils/httpUtil';
import './userList.css'; 

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchId, setSearchId] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await sendGet('http://localhost:8080/api/user/getAll');
      const usersData = JSON.parse(response);
      setUsers(usersData.data || []);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const searchUserById = async (keyword) => {
    try {
      const response = await sendGet(`http://localhost:8080/api/user/searchStudents=${keyword}`);
      const userData = JSON.parse(response);
      if (userData.data) {
        setUsers([userData.data]);
      } else {
        alert('User not found');
      }
    } catch (err) {
      alert('Error fetching user: ' + err.message);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const response = await sendGet('http://localhost:8080/api/user/getAll');
      const currentUserData = JSON.parse(response);
      setCurrentUser(currentUserData.data);
    } catch (err) {
      console.error('Error fetching current user: ', err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchCurrentUser();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchId.trim()) {
      searchUserById(searchId);
    } else {
      alert('Please enter a valid user ID');
    }
  };

  const handleDeleteUser = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (!confirmed) return;

    try {
      await sendDelete(`http://localhost:8080/api/user/delete/${id}`);
      alert('User deleted successfully');
      setUsers(users.filter(user => user._id !== id));
    } catch (err) {
      alert('Error deleting user: ' + err.message);
    }
  };


  return (
    <div className="user-list">
      <h2>Danh sách sinh viên</h2>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search by User ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <Link to="/users/add">
        <button className="add-user-btn">Thêm sinh viên</button>
      </Link>
      {Array.isArray(users) && users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <ul>
          {Array.isArray(users) && users.map(user => (
            <li key={user._id}>
              <h3>{user.fullname}</h3>
              <p>Email: {user.email}</p>
              <p>MSV: {user.msv}</p>
              <p>
                Class: 
                {user.gvcn?.classrooms ? user.gvcn?.classrooms.name : 'N/A'}
              </p>
              <p>Gender: {user.gender}</p>
              <p>Year: {user.year}</p>
              <p>Major: {user.majorIds.map(major => major.name).join(' | ')}</p>
              <p>GVCN: {user.gvcn?.fullname || 'N/A'}</p>
              <div className="button-group">
                <button className="delete-btn" onClick={() => handleDeleteUser(user._id)}>Delete</button>

                {currentUser && currentUser.isAdmin ? (
                  <Link to={`/users/edit/admin/${user._id}`}>
                    <button className="edit-btn">Edit</button>
                  </Link>
                ) : currentUser && currentUser.isGv ? (
                  <Link to={`/users/edit/user/${user._id}`}>
                    <button className="edit-btn">Edit</button>
                  </Link>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
