import React, { useState, useEffect } from 'react';
import { sendPut, sendGet } from '../../utils/httpUtil'; // Adjust the import path as needed
import { useParams, useNavigate } from 'react-router-dom';

const DiligencyUpdate = () => {
  const { id } = useParams(); // Get the id from the URL params
  const navigate = useNavigate();
  const [diligency, setDiligency] = useState({ studentId: '', courseId: '', date: '', notes: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiligency = async () => {
      try {
        const response = await sendGet(`http://localhost:8080/api/diligency/student/${id}`); // Ensure ID is correct
        const jsonResponse = JSON.parse(response);
        if (jsonResponse.data) {
          setDiligency(jsonResponse.data);
        } else {
          setError('No diligence record found for the given student ID');
        }
      } catch (err) {
        setError(err.message || 'Error fetching diligence record');
      } finally {
        setLoading(false);
      }
    };

    fetchDiligency();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDiligency((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await sendPut(`http://localhost:8080/api/diligency/update/${id}`, diligency); // Correct endpoint
      const jsonResponse = JSON.parse(response);
      if (jsonResponse.message === 'Diligency record updated successfully') {
        setSuccess('Diligency record updated successfully');
        setTimeout(() => navigate('/diligency'), 2000); // Redirect after success
      } else {
        throw new Error(jsonResponse.message || 'Error updating diligence record');
      }
    } catch (err) {
      setError(err.message || 'Error updating diligence record');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="edit-diligency-container">
      <h1>Cập Nhật Hồ Sơ Điểm Danh</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="studentId">Mã Sinh Viên:</label>
          <input
            type="text"
            id="studentId"
            name="studentId"
            value={diligency.studentId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="courseId">Mã Môn Học:</label>
          <input
            type="text"
            id="courseId"
            name="courseId"
            value={diligency.courseId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Ngày:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={diligency.date ? new Date(diligency.date).toISOString().substr(0, 10) : ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="notes">Ghi Chú:</label>
          <textarea
            id="notes"
            name="notes"
            value={diligency.notes}
            onChange={handleChange}
            rows="3"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Đang Cập Nhật...' : 'Cập Nhật Hồ Sơ'}
        </button>
        <button type="button" onClick={() => navigate('/diligency')}>Hủy</button>
      </form>
    </div>
  );
};

export default DiligencyUpdate;
