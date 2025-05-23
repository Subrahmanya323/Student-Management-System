import React, { useEffect, useState } from 'react';
import { getAllStudents, deleteStudent } from '../services/StudentService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const result = await getAllStudents();
      setStudents(result.data);
    } catch (error) {
      toast.error('Failed to load students!');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteStudent(id);
      toast.success('Student deleted successfully!'); // ✅ Success message
      loadStudents(); // Reload list after deletion
    } catch (error) {
      toast.error('Failed to delete student!');
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold">Student List</h2>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/add')}
        >
          ➕ Add Student
        </button>
      </div>

      <table className="table table-hover table-bordered shadow">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Date of Birth</th>
            <th style={{ width: '250px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.gender}</td>
              <td>{student.email}</td>
              <td>{student.phoneNumber}</td>
              <td>{student.address}</td>
              <td>{student.dob}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => navigate('/add-student', { state: student })}
                >
                  ✏️ Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(student.id)}
                >
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
