import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './userList.css'; 

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchId, setSearchId] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users/getAll');
      setUsers(response.data.data || []);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const searchUserById = async (id) => {
    try {
      const response = await axios.get(`/api/users/${id}`);
      if (response.data.data) {
        setUsers([response.data.data]);
      } else {
        alert('User not found');
      }
    } catch (err) {
      alert('Error fetching user: ' + err.message);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get('/api/users/me', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setCurrentUser(response.data.data);
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
      await axios.delete(`/api/users/delete/${id}`);
      alert('User deleted successfully');
      setUsers(users.filter(user => user._id !== id));
    } catch (err) {
      alert('Error deleting user: ' + err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

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
              <p>Class: {user.class}</p>
              <p>Gender: {user.gender}</p>
              <p>Year: {user.year}</p>
              <p>Major: {user.majorIds.map(major => major.name).join(', ')}</p>
              <p>GVCN: {user.gvcn?.name || 'N/A'}</p>
              <div className="button-group">
                <button className="delete-btn" onClick={() => handleDeleteUser(user._id)}>Delete</button>

                {(currentUser && currentUser.role === 'admin') || currentUser?._id === user._id ? (
                  <Link to={`/users/edit/${user._id}`}>
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
