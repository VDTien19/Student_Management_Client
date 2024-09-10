import React, { useEffect, useState } from 'react';
import { sendGet, sendPost, sendPut } from '../../utils/httpUtil';
import { toast } from 'react-toastify'; // Import toast here
import 'react-toastify/dist/ReactToastify.css';
import './ClassroomForm.css'; // Import the CSS file

const ClassroomForm = ({ id, onClose }) => {
  const [classroom, setClassroom] = useState({ name: '', gvcn: '', students: [], year: '' });
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await sendGet('http://localhost:8080/api/teacher/getAll');
        const data = JSON.parse(response);
        setTeachers(data.data);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    fetchTeachers();

    if (id) {
      const fetchClassroom = async () => {
        try {
          const response = await sendGet(`http://localhost:8080/api/class/${id}`);
          const data = JSON.parse(response);
          setClassroom({
            ...data,
            gvcn: data.gvcn ? data.gvcn._id : '', // Set the ID of the teacher if it exists
          });
        } catch (error) {
          console.error('Error fetching classroom:', error);
        }
      };

      fetchClassroom();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClassroom({ ...classroom, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await sendPut(`http://localhost:8080/api/class/update/${id}`, classroom);
        toast.success('Classroom updated successfully');
      } else {
        await sendPost('http://localhost:8080/api/class/create', classroom);
        toast.success('Classroom created successfully');
      }
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error('Error saving classroom:', error);
      toast.error('Error saving classroom');
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">{id ? 'Edit Classroom' : 'Create Classroom'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label className="form-label">Tên:</label>
          <input
            type="text"
            name="name"
            value={classroom.name}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Giáo viên:</label>
          <select
            name="gvcn"
            value={classroom.gvcn || ''}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Chọn giáo viên</option>
            {teachers.map(teacher => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.fullname}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Năm học:</label>
          <input
            type="text"
            name="year"
            value={classroom.year}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="submit-button-classroom">
          {id ? 'Update Classroom' : 'Create Classroom'}
        </button>
      </form>
    </div>
  );
};

export default ClassroomForm;
