import React, { useState, useEffect } from 'react';
import { sendGet, sendPut } from '../../utils/httpUtil';
// import './EditSemester.css'; // 

const EditSemester = ({ semesterId, onClose, onUpdateSemester }) => {
  const [semester, setSemester] = useState('');
  const [group, setGroup] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchSemester = async () => {
      try {
        const response = await sendGet(`http://localhost:8080/api/semester/${semesterId}`);
        const { semester, group, year } = JSON.parse(response).data;
        setSemester(semester);
        setGroup(group);
        setYear(year);
      } catch (err) {
        setError('Không thể tải thông tin kỳ học');
      }
    };

    fetchSemester();
  }, [semesterId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendPut(`http://localhost:8080/api/semester/update/${semesterId}`, { semester, group, year });
      const responseData = JSON.parse(response);
      if (responseData && responseData.data) {
        setSuccess('Kỳ học đã được cập nhật thành công!');
        onUpdateSemester(responseData.data);
        onClose();
      } else {
        throw new Error(response);
      }
    } catch (err) {
      setError('Lỗi khi cập nhật kỳ học');
    }
  };

  return (
    <div className="edit-semester-container">
      <h1>Sửa Kỳ Học</h1>
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
        <button type="submit">Cập Nhật Kỳ Học</button>
        <button type="button" onClick={onClose}>Hủy</button>
      </form>
    </div>
  );
};

export default EditSemester;
