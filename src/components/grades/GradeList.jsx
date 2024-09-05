import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { sendGet, sendDelete } from '../../utils/httpUtil';

const GradeList = () => {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await sendGet('http://localhost:8080/api/grade/getAll');
        const data = JSON.parse(response).grades;
        setGrades(data);
      } catch (err) {
        setError('Failed to fetch grades');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGrades();
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

  return (
    <div className="container">
      <h1>Grades</h1>
      <Link to="/add-grades">
        <Button variant="primary" className="mb-3">
          Add Grade
        </Button>
      </Link>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Course</th>
              <th>Mid Score</th>
              <th>Final Score</th>
              <th>Transcript ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((grade) => (
              <tr key={grade._id}>
                <td>{grade.course.name}</td>
                <td>{grade.midScore}</td>
                <td>{grade.finalScore}</td>
                <td>{grade.transcript}</td>
                <td>
                  <Link to={`/update-grade/${grade._id}`}>
                    <Button variant="warning" className="mr-2">Edit</Button>
                  </Link>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(grade._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GradeList;
