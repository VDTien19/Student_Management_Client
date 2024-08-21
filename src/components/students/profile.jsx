import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users/getAll');
      setUsers(response.data.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
    <div>
      <h2>User List</h2>
      <Link to="/users/add">
        <button>Add User</button>
      </Link>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user._id}>
              <h3>{user.fullname}</h3>
              <p>Email: {user.email}</p>
              <p>MSV: {user.msv}</p>
              <p>Class: {user.class}</p>
              <p>Gender: {user.gender}</p>
              <p>Year: {user.year}</p>
              <p>Major: {user.majorIds.map(major => major.name).join(', ')}</p>
              <p>GVCN: {user.gvcn?.name || 'N/A'}</p>
              {/* Nút Xoá */}
              <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
              {/* Nút Chỉnh Sửa */}
              <Link to={`/users/edit/${user._id}`}>
                <button>Edit</button>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
