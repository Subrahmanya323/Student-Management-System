import React, { useState, useEffect } from 'react';
import { createStudent, updateStudent } from '../services/StudentService';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddStudent = () => {
  const [student, setStudent] = useState({
    name: '',
    age: '',
    gender: '',
    email: '',
    phoneNumber: '',
    address: '',
    dob: ''
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setStudent(location.state);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!student.name || !student.age || !student.gender || !student.email || !student.phoneNumber || !student.address || !student.dob) {
      toast.error('All fields are required!');
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(student.name)) {
      toast.error('Name should only contain letters!');
      return;
    }

    if (isNaN(student.age) || student.age < 1 || student.age > 120) {
      toast.error('Age must be a number between 1 and 120!');
      return;
    }

    if (!/^\d{10}$/.test(student.phoneNumber) || /^0+$/.test(student.phoneNumber)) {
      toast.error('Phone number must be a valid 10-digit number!');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(student.email)) {
      toast.error('Enter a valid email address!');
      return;
    }

    if (!/[a-zA-Z]/.test(student.address) || student.address.length < 5) {
      toast.error('Address must contain at least 5 characters with letters!');
      return;
    }

    if (new Date(student.dob) > new Date()) {
      toast.error('Date of Birth cannot be in the future!');
      return;
    }

    try {
      if (student.id) {
        await updateStudent(student.id, student);
        toast.success('Student updated successfully!');
      } else {
        await createStudent(student);
        toast.success('Student added successfully!');
      }
      navigate('/');
    } catch (error) {
      toast.error('An error occurred! Please try again.');
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="mb-4">{student.id ? 'Edit Student' : 'Add Student'}</h2>
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-3">
              <label className="form-label">Name:</label>
              <input
                type="text"
                className="form-control"
                value={student.name}
                onChange={(e) => setStudent({ ...student, name: e.target.value })}
                required
              />
            </div>

            {/* Age */}
            <div className="mb-3">
              <label className="form-label">Age:</label>
              <input
                type="number"
                className="form-control"
                value={student.age}
                onChange={(e) => setStudent({ ...student, age: e.target.value })}
                required
              />
            </div>

            {/* Gender */}
            <div className="mb-3">
              <label className="form-label">Gender:</label>
              <select
                className="form-control"
                value={student.gender}
                onChange={(e) => setStudent({ ...student, gender: e.target.value })}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input
                type="email"
                className="form-control"
                value={student.email}
                onChange={(e) => setStudent({ ...student, email: e.target.value })}
                required
              />
            </div>

            {/* Phone Number */}
            <div className="mb-3">
              <label className="form-label">Phone Number:</label>
              <input
                type="text"
                className="form-control"
                value={student.phoneNumber}
                onChange={(e) => setStudent({ ...student, phoneNumber: e.target.value })}
                required
              />
            </div>

            {/* Address */}
            <div className="mb-3">
              <label className="form-label">Address:</label>
              <input
                type="text"
                className="form-control"
                value={student.address}
                onChange={(e) => setStudent({ ...student, address: e.target.value })}
                required
              />
            </div>

            {/* Date of Birth */}
            <div className="mb-3">
              <label className="form-label">Date of Birth:</label>
              <input
                type="date"
                className="form-control"
                value={student.dob}
                onChange={(e) => setStudent({ ...student, dob: e.target.value })}
                required
              />
            </div>

            <button type="submit" className="btn btn-success">
              ✅ {student.id ? 'Update' : 'Add'}
            </button>
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => navigate('/')}
            >
              ❌ Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
