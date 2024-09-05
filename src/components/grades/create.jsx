import React, { useState } from 'react';
import { sendPost } from '../../utils/httpUtil'; // Adjust the path to your API utility file
import { useNavigate } from 'react-router-dom';

const AddGrade = () => {
  const [courseId, setCourseId] = useState('');
  const [midScore, setMidScore] = useState('');
  const [finalScore, setFinalScore] = useState('');
  const [transcriptId, setTranscriptId] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

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
      const response = await sendPost('http://localhost:8080/api/grade/create', requestData);
      setSuccess('Grade added successfully!');
      navigate('/grades');
    } catch (err) {
      setError('Failed to add grade. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add New Grade</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="courseId">Course ID</label>
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
          <label htmlFor="midScore">Mid Score</label>
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
          <label htmlFor="finalScore">Final Score</label>
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
          <label htmlFor="transcriptId">Transcript ID</label>
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
          Add Grade
        </button>
      </form>
    </div>
  );
};

export default AddGrade;
