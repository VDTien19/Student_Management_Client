import React, { useState, useEffect } from 'react';
import { sendPost, sendGet } from '../../utils/httpUtil'; // Adjust the path to your API utility file
import { useNavigate } from 'react-router-dom';

const AddGrade = () => {
  const [courseId, setCourseId] = useState('');
  const [midScore, setMidScore] = useState('');
  const [finalScore, setFinalScore] = useState('');
  const [transcriptId, setTranscriptId] = useState('');
  const [courses, setCourses] = useState([]);
  const [transcripts, setTranscripts] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch courses
    const fetchCourses = async () => {
      try {
        const response = await sendGet('http://localhost:8080/api/course/getAll');
        const data = JSON.parse(response);
        setCourses(data.data);
      } catch (err) {
        console.error('Error fetching courses:', err);
      }
    };

    // Fetch transcripts
    const fetchTranscripts = async () => {
      try {
        const response = await sendGet('http://localhost:8080/api/transcript/getAll');
        const data = JSON.parse(response);
        setTranscripts(data.data);
      } catch (err) {
        console.error('Error fetching transcripts:', err);
      }
    };

    fetchCourses();
    fetchTranscripts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const requestData = {
      courseId,
      midScore: parseFloat(midScore),
      finalScore: parseFloat(finalScore),
      transcriptId,
    };

    try {
      await sendPost('http://localhost:8080/api/grade/create', requestData);
      setSuccess('Grade added successfully!');
      navigate('/grades');
    } catch (err) {
      setError('Failed to add grade. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Thêm Điểm</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="courseId">Môn Học</label>
          <select
            id="courseId"
            className="form-control"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
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
          <label htmlFor="midScore">Điểm giữa kì</label>
          <input
            type="number"
            className="form-control"
            id="midScore"
            value={midScore}
            onChange={(e) => setMidScore(e.target.value)}
            required
            min="0"
            max="10"
            step="0.1"
          />
        </div>
        <div className="form-group">
          <label htmlFor="finalScore">Điểm Cuối Kì</label>
          <input
            type="number"
            className="form-control"
            id="finalScore"
            value={finalScore}
            onChange={(e) => setFinalScore(e.target.value)}
            required
            min="0"
            max="10"
            step="0.1"
          />
        </div>
        <div className="form-group">
          <label htmlFor="transcriptId">Bảng Điểm</label>
          <select
            id="transcriptId"
            className="form-control"
            value={transcriptId}
            onChange={(e) => setTranscriptId(e.target.value)}
            required
          >
            <option value="">Chọn Bảng Điểm</option>
            {transcripts.map((transcript) => (
              <option key={transcript._id} value={transcript._id}>
                {transcript.student.fullname} - {transcript.year}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Thêm Điểm
        </button>
      </form> 
    </div>
  );
};

export default AddGrade;
