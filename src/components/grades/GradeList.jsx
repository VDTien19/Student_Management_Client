import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { sendGet, sendDelete } from '../../utils/httpUtil';

const GradeList = () => {
  const [grades, setGrades] = useState([]);
  const [transcripts, setTranscripts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGradesAndTranscripts = async () => {
      try {
        const gradeResponse = await sendGet('http://localhost:8080/api/grade/getAll');
        const gradeData = JSON.parse(gradeResponse).grades;
        setGrades(gradeData);

        // Fetch transcripts for student information
        const transcriptResponse = await sendGet('http://localhost:8080/api/transcript/getAll');
        const transcriptData = JSON.parse(transcriptResponse).data; // Assuming the response contains a data field
        setTranscripts(transcriptData);
      } catch (err) {
        setError('Failed to fetch grades or transcripts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGradesAndTranscripts();
  }, []);

  const handleDelete = async (gradeId) => {
    if (window.confirm('Are you sure you want to delete this grade?')) {
      try {
        await sendDelete(`http://localhost:8080/api/grade/delete/${gradeId}`);
        setGrades(grades.filter(grade => grade._id !== gradeId));
      } catch (err) {
        setError('Failed to delete grade');
        console.error(err);
      }
    }
  };

  // Safely handle the case when grade.student might be undefined
  const getStudentInfo = (studentId) => {
    const transcript = transcripts.find(trans => trans.student._id === studentId);
    return transcript ? { fullname: transcript.student.fullname, msv: transcript.student.msv } : { fullname: 'N/A', msv: 'N/A' };
  };

  const calculateAverageScore = (midScore, finalScore) => {
    return ((midScore + finalScore) / 2).toFixed(2);
  };

  return (
    <div className="container">
      <h1>Điểm</h1>
      <Link to="/add-grades">
        <Button variant="primary" className="mb-3">
          Thêm Điểm
        </Button>
      </Link>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Sinh viên</th>
              <th>MSV</th>
              <th>Môn học</th>
              <th>Điểm giữa kì</th>
              <th>Điểm Cuối Kì</th>
              <th>Điểm trung bình</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((grade) => {
              const studentInfo = getStudentInfo(grade.student?._id);  // Handle student safely
              return (
                <tr key={grade._id}>
                  <td>{grade.student?.fullname}</td>
                  <td>{grade.student?.msv}</td>
                  <td>{grade.course?.name || 'N/A'}</td>
                  <td>{grade.midScore}</td>
                  <td>{grade.finalScore}</td>
                  <td>{calculateAverageScore(grade.midScore, grade.finalScore)}</td>
                  <td>
                    <Link to={`/update-grade/${grade._id}`}>
                      <Button variant="warning" className="mr-2">Sửa</Button>
                    </Link>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(grade._id)}
                    >
                      Xoá
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GradeList;
