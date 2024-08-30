import React, { useEffect, useState } from 'react';
import { sendGet, sendPost, sendPut } from '../../utils/httpUtil';
import { toast } from 'react-toastify'; // Import toast here
import 'react-toastify/dist/ReactToastify.css';

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
    <div>
      <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Classroom' : 'Create Classroom'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={classroom.name}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Teacher</label>
          <select
            name="gvcn"
            value={classroom.gvcn || ''}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
            required
          >
            <option value="">Select Teacher</option>
            {teachers.map(teacher => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.fullname}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Year</label>
          <input
            type="text"
            name="year"
            value={classroom.year}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-dark px-4 py-2 rounded">
          {id ? 'Update Classroom' : 'Create Classroom'}
        </button>
      </form>
    </div>
  );
};

export default ClassroomForm;
