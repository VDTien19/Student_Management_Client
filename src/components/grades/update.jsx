import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { sendPut, sendGet } from '../../utils/httpUtil';

const UpdateGrade = () => {
  const { gradeId } = useParams();
  const [courseId, setCourseId] = useState('');
  const [midScore, setMidScore] = useState('');
  const [finalScore, setFinalScore] = useState('');
  const [transcriptId, setTranscriptId] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGrade = async () => {
      try {
        const response = await sendGet(`http://localhost:8080/api/grade/${gradeId}`);
        const data = JSON.parse(response).grades;
        setCourseId(data.course._id);
        setMidScore(data.midScore);
        setFinalScore(data.finalScore);
        setTranscriptId(data.transcript._id);
      } catch (err) {
        setError('Failed to fetch grade details');
        console.error(err);
      }
    };

    fetchGrade();
  }, [gradeId]);

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
      const response = await sendPut(`http://localhost:8080/api/grade/update/${gradeId}`, requestData);
      setSuccess('Grade updated successfully!');
      navigate('/grades');
    } catch (err) {
      setError('Failed to update grade. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Sửa Điểm</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="courseId">Mã Môn Học</label>
          <input
            type="text"
            className="form-control"
            id="courseId"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            required
          />
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
          <label htmlFor="transcriptId">Mã bảng điểm</label>
          <input
            type="text"
            className="form-control"
            id="transcriptId"
            value={transcriptId}
            onChange={(e) => setTranscriptId(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sửa
        </button>
      </form>
    </div>
  );
};

export default UpdateGrade;
