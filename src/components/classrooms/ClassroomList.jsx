import React, { useState, useEffect } from 'react';
import { sendGet, sendDelete } from '../../utils/httpUtil';
import ClassroomForm from './ClassroomForm';
import Modal from '../../components/modal/Modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ClassroomList = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editClassroomId, setEditClassroomId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchClassrooms = async () => {
    try {
      const response = await sendGet('http://localhost:8080/api/class/getAll');
      const data = JSON.parse(response);
      setClassrooms(data || []);
    } catch (error) {
      setError('Error fetching classrooms');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClassrooms();
  }, []);

  const openModal = (id = null) => {
    setEditClassroomId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditClassroomId(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this classroom?')) {
      try {
        await sendDelete(`http://localhost:8080/api/class/delete/${id}`);
        toast.success('Classroom deleted successfully');
        setClassrooms(classrooms.filter(classroom => classroom._id !== id));
      } catch (error) {
        setError('Error deleting classroom');
      }
    }
  };

  const handleFormClose = () => {
    closeModal();
    fetchClassrooms(); // Fetch the latest classrooms list after form submission
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Classrooms</h2>
      <button
        onClick={() => openModal()}
        className="bg-blue-500 text-dark px-4 py-2 rounded mb-4"
      >
        Add Classroom
      </button>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ClassroomForm id={editClassroomId} onClose={handleFormClose} />
        </Modal>
      )}
      <ul className="list-disc pl-5">
        {classrooms.length > 0 ? (
          classrooms.map(classroom => (
            <li key={classroom._id} className="mb-2">
              <h3 className="text-xl">{classroom.name}</h3>
              <p className="text-gray-600">Teacher: {classroom.gvcn?.fullname || 'N/A'}</p>
              <p className="text-gray-600">Year: {classroom.year}</p>
              <div className="mt-2">
                <button
                  onClick={() => openModal(classroom._id)}
                  className="bg-blue-500 text-dark px-4 py-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(classroom._id)}
                  className="bg-red-500 text-dark px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>No classrooms found.</p>
        )}
      </ul>
      <ToastContainer />
    </div>
  );
};

export default ClassroomList;
