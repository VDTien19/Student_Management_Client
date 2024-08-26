import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddMajor from './create'; 
import EditMajor from './update'; 
import './MajorList.css';

const MajorList = () => {
  const [majors, setMajors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editMajorId, setEditMajorId] = useState(null);

  useEffect(() => {
    const fetchMajors = async () => {
      try {
        const response = await axios.get('/api/majors/getAll', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setMajors(response.data.data || []);
      } catch (err) {
        setError('Không thể lấy thông tin ngành học');
      } finally {
        setLoading(false);
      }
    };

    fetchMajors();
  }, []);

  const handleAddClick = () => {
    setShowAddForm(!showAddForm);
  };

  const handleEditClick = (id) => {
    setEditMajorId(id);
  };

  const handleCloseEdit = () => {
    setEditMajorId(null);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa ngành học này?')) {
      try {
        await axios.delete(`/api/majors/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setMajors(majors.filter((major) => major._id !== id));
      } catch (err) {
        setError('Lỗi khi xóa ngành học');
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
    <div className="major-list-container">
      <h1>Danh sách các ngành học</h1>
      <button onClick={handleAddClick}>
        {showAddForm ? 'Đóng' : 'Thêm Ngành Học'}
      </button>
      {showAddForm && <AddMajor />}
      {editMajorId && <EditMajor majorId={editMajorId} onClose={handleCloseEdit} />}
      <ul>
        {Array.isArray(majors) && majors.length > 0 ? (
          majors.map((major) => (
            <li key={major._id}>
              <h2>{major.name}</h2>
              <p>Mã ngành: {major.code}</p>
              <button onClick={() => handleEditClick(major._id)}>Sửa</button>
              <button onClick={() => handleDeleteClick(major._id)}>Xóa</button>
            </li>
          ))
        ) : (
          <p>Không có ngành học nào.</p>
        )}
      </ul>
    </div>
  );
};

export default MajorList;
