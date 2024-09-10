import React, { useState, useEffect } from 'react';
import { sendPut, sendGet } from '../../utils/httpUtil'; // Adjust the import path as needed
import { useParams, useNavigate } from 'react-router-dom';
import './DiligencyUpdate.css'; // Import the CSS file

const DiligencyUpdate = () => {
  const { id } = useParams(); // Get the id from the URL params
  const navigate = useNavigate();
  
  const [diligency, setDiligency] = useState({ studentId: '', course: '', date: '', notes: '' });
  const [courses, setCourses] = useState([]); // Store the list of courses
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch all courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courseResponse = await sendGet('http://localhost:8080/api/course/getAll'); // Adjust the endpoint if needed
        const courseJsonResponse = JSON.parse(courseResponse);
        if (courseJsonResponse.data) {
          setCourses(courseJsonResponse.data); // Set the course list
        } else {
          setError('No courses found');
        }
      } catch (err) {
        setError(err.message || 'Error fetching courses');
      }
    };

    fetchCourses();
  }, []);

  // Fetch the diligency data by student ID
  useEffect(() => {
    const fetchDiligency = async () => {
      try {
        const response = await sendGet(`http://localhost:8080/api/diligency/student/${id}`);
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
      const response = await sendPut(`http://localhost:8080/api/diligency/update/${id}`, diligency);
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
      <h1>Sửa chuyên cần</h1>
      {error && <p className="status-message error">{error}</p>}
      {success && <p className="status-message success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="studentId">Sinh viên:</label>
          <input
            type="text"
            id="student"
            name="student"
            value={diligency.studentId ? diligency.studentId.fullname : ''}
            onChange={handleChange}
            required
            readOnly // Make it read-only if you don't want to change the student
          />
        </div>

        {/* Course Select Dropdown */}
        <div className="form-group">
          <label htmlFor="course">Môn Học:</label>
          <select
            id="course"
            name="course"
            value={diligency.courseId ? diligency.courseId._id : ''}
            onChange={handleChange}
            required
          >
            <option value="">Chọn Môn Học</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Ngày Tháng:</label>
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
        <button type="submit-diligency" disabled={loading}>
          {loading ? 'Updating...' : 'Update Diligency Record'}
        </button>
        <button type="button" className="cancel-button" onClick={() => navigate('/diligency')}>Thoát</button>
      </form>
    </div>
  );
};

export default DiligencyUpdate;
