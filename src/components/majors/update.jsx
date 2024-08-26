import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditMajor.css'; // Import CSS

const EditMajor = ({ majorId, onClose }) => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchMajor = async () => {
      try {
        const response = await axios.get(`/api/majors/${majorId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const { name, code } = response.data.data;
        setName(name);
        setCode(code);
      } catch (err) {
        setError('Không thể tải thông tin ngành học');
      }
    };

    fetchMajor();
  }, [majorId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/majors/update/${majorId}`, {
        name,
        code
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setSuccess('Ngành học đã được cập nhật thành công!');
      onClose();
    } catch (err) {
      setError('Lỗi khi cập nhật ngành học');
    }
  };

  return (
    <div className="edit-major-container">
      <h1>Sửa Ngành Học</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Tên Ngành Học:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="code">Mã Ngành:</label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>
        <button type="submit">Cập Nhật Ngành Học</button>
        <button type="button" onClick={onClose}>Hủy</button>
      </form>
    </div>
  );
};

export default EditMajor;
