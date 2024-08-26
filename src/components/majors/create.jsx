import React, { useState } from 'react';
import axios from 'axios';
import './AddMajor.css'; // Import CSS

const AddMajor = () => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/majors/create', {
        name,
        code
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setSuccess('Ngành học đã được thêm thành công!');
      setName('');
      setCode('');
    } catch (err) {
      setError('Lỗi khi thêm ngành học');
    }
  };

  return (
    <div className="add-major-container">
      <h1>Thêm Ngành Học</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Tên Ngành Học:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="code">Mã Ngành:</label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>
        <button type="submit">Thêm Ngành Học</button>
      </form>
    </div>
  );
};

export default AddMajor;
