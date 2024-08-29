import React, { useState } from 'react';
import { sendPost } from '../../utils/httpUtil';
// import './AddSemester.css';

const AddSemester = ({ onAddSemester }) => {
  const [semester, setSemester] = useState('');
  const [group, setGroup] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendPost('http://localhost:8080/api/semester/create', { semester, group, year });
      const responseData = JSON.parse(response);
      if (responseData && responseData.data) {
        setSuccess('Kỳ học đã được thêm thành công!');
        onAddSemester(responseData.data);
      } else {
        throw new Error(response);
      }
    } catch (err) {
      setError('Lỗi khi thêm kỳ học');
    }
  };

  return (
    <div className="add-semester-container">
      <h1>Thêm Kỳ Học</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="semester">Tên Kỳ Học:</label>
          <input
            type="text"
            id="semester"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="group">Nhóm:</label>
          <input
            type="text"
            id="group"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="year">Năm:</label>
          <input
            type="text"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </div>
        <button type="submit">Thêm Kỳ Học</button>
      </form>
    </div>
  );
};

export default AddSemester;
