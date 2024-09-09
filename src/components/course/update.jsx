import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { sendGet, sendPut } from '../../utils/httpUtil';

const EditCourse = ({ onClose, onUpdateCourse }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [credit, setCredit] = useState('');
  const [majorId, setMajorId] = useState('');
  const [majors, setMajors] = useState([]); 
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    // Fetch course data
    const fetchCourse = async () => {
      try {
        const response = await sendGet(`http://localhost:8080/api/course/${id}`);
        const { name, code, credit, majorId } = JSON.parse(response).data;

        setName(name || '');
        setCode(code || '');
        setCredit(credit || '');
        setMajorId(majorId?._id || '');
      } catch (err) {
        setError('Không thể tải thông tin khóa học');
      } finally {
        setLoading(false);
      }
    };

    const fetchMajors = async () => {
      try {
        const response = await sendGet(`http://localhost:8080/api/major/getAll`);
        const majorData = JSON.parse(response).data;
        setMajors(majorData || []);
      } catch (err) {
        setError('Không thể tải danh sách ngành học');
      }
    };

    fetchCourse();
    fetchMajors();
  }, [id]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!majorId) {
      setError('Vui lòng chọn một ngành học hợp lệ.');
      setLoading(false);
      return;
    }

    try {
      const response = await sendPut(`http://localhost:8080/api/course/update/${id}`, {
        name,
        code,
        credit,
        majorId,
      });
      const responseData = JSON.parse(response);

      if (responseData && responseData.data) {
        setSuccess('Khóa học đã được cập nhật thành công!');
        onUpdateCourse(responseData.data);
      }
    } catch (err) {
      setError('Lỗi khi cập nhật khóa học');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate('/courses');
      }, 1000);
    }
  }, [success, navigate]);


  const handleCancel = () => {
    navigate('/courses'); 
  };

  return (
    <div className="edit-course-container">
      <h1>Sửa Khóa Học</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Tên Khóa Học:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="code">Mã Khóa Học:</label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="credit">Số Tín Chỉ:</label>
          <input
            type="number"
            id="credit"
            value={credit}
            onChange={(e) => setCredit(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="majorId">Ngành Học:</label>
          <select
            id="majorId"
            value={majorId}
            onChange={(e) => setMajorId(e.target.value)}
            required
          >
            <option value="">Chọn ngành học</option>
            {majors.map((major) => (
              <option key={major._id} value={major._id}>
                {major.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Đang cập nhật...' : 'Cập Nhật Khóa Học'}
        </button>
        <button type="button" onClick={handleCancel}>Hủy</button>
      </form>
    </div>
  );
};

export default EditCourse;
