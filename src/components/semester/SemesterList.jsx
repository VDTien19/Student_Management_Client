import React, { useState, useEffect } from 'react';
import { sendGet, sendDelete } from '../../utils/httpUtil';
import AddSemester from './AddSemester'; // Ensure this path is correct
import EditSemester from './EditSemester'; // Ensure this path is correct
// import './SemesterList.css';

const SemesterList = () => {
  const [semesters, setSemesters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editSemesterId, setEditSemesterId] = useState(null);

  useEffect(() => {
    const fetchSemesters = async () => {
      try {
        const response = await sendGet('http://localhost:8080/api/semester/getAll');
        const data = JSON.parse(response);
        setSemesters(data.data || []);
      } catch (err) {
        setError('Không thể lấy thông tin kỳ học');
      } finally {
        setLoading(false);
      }
    };

    fetchSemesters();
  }, []);

  const addSemesterToList = (newSemester) => {
    setSemesters([...semesters, newSemester]);
    setShowAddForm(false); // Close the form after adding
  };

  const updateSemesterInList = (updatedSemester) => {
    setSemesters(semesters.map(semester => (semester._id === updatedSemester._id ? updatedSemester : semester)));
    setEditSemesterId(null); // Close the edit form after updating
  };

  const handleAddClick = () => {
    setShowAddForm(!showAddForm);
  };

  const handleEditClick = (id) => {
    setEditSemesterId(id);
  };

  const handleCloseEdit = () => {
    setEditSemesterId(null);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa kỳ học này?')) {
      try {
        await sendDelete(`http://localhost:8080/api/semester/delete/${id}`);
        setSemesters(semesters.filter((semester) => semester._id !== id));
      } catch (err) {
        setError('Lỗi khi xóa kỳ học');
      }
    }
  };

  if (loading) {
    return <p>Đang tải...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="semester-list-container">
      <h1>Danh sách các kỳ học</h1>
      <button onClick={handleAddClick}>
        {showAddForm ? 'Đóng' : 'Thêm Kỳ Học'}
      </button>
      {showAddForm && <AddSemester onAddSemester={addSemesterToList} />}
      {editSemesterId && (
        <EditSemester
          semesterId={editSemesterId}
          onClose={handleCloseEdit}
          onUpdateSemester={updateSemesterInList}
        />
      )}
      <ul>
        {Array.isArray(semesters) && semesters.length > 0 ? (
          semesters.map((semester) => (
            <li key={semester._id}>
              <h2>{semester.semester}</h2>
              <p>Nhóm: {semester.group}</p>
              <p>Năm: {semester.year}</p>
              <button onClick={() => handleEditClick(semester._id)}>Sửa</button>
              <button onClick={() => handleDeleteClick(semester._id)}>Xóa</button>
            </li>
          ))
        ) : (
          <p>Không có kỳ học nào.</p>
        )}
      </ul>
    </div>
  );
};

export default SemesterList;
