import React, { useState, useEffect } from 'react';
import { sendGet, sendPut } from '../../utils/httpUtil';
import './EditMajor.css'; // Import CSS

const EditMajor = ({ majorId, onClose, onUpdateMajor }) => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchMajor = async () => {
      try {
        const response = await sendGet(`http://localhost:8080/api/major/${majorId}`);
        const { name, code } = JSON.parse(response).data;
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
      const response = await sendPut(`http://localhost:8080/api/major/update/${majorId}`, { name, code });
      const responseData = JSON.parse(response);
      if (responseData && responseData.data) {
        setSuccess('Ngành học đã được cập nhật thành công!');
        onUpdateMajor(responseData.data);
        onClose();
      } else {
        throw new Error(response);
      }
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
