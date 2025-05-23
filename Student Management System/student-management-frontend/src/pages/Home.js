import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  FaUserPlus,
  FaList,
  FaEdit,
  FaTrash,
  FaGraduationCap,
  FaUsers,
  FaChartBar,
  FaCalendarAlt
} from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState({
    totalStudents: 0,
    recentStudents: 0,
    activeStudents: 0
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/students');
      setStudents(response.data);
      setStats({
        totalStudents: response.data.length,
        recentStudents: response.data.filter(student => {
          const studentDate = new Date(student.dateOfBirth || student.createdAt);
          const today = new Date();
          return (today - studentDate) / (1000 * 60 * 60 * 24) < 30;
        }).length,
        activeStudents: response.data.length
      });
    } catch (error) {
      console.error('Error fetching students:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch students. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (studentId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`/api/students/${studentId}`);
        toast.success('Student deleted successfully');
        fetchStudents();
      } catch (error) {
        console.error('Error deleting student:', error);
        toast.error(error.response?.data?.message || 'Failed to delete student. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="home-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="welcome-section">
        <h1>Welcome to Student Management System</h1>
        <p>Manage your students efficiently and effectively</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <FaGraduationCap className="stat-icon" />
          <div className="stat-content">
            <h3>Total Students</h3>
            <p>{stats.totalStudents}</p>
          </div>
        </div>
        <div className="stat-card">
          <FaUsers className="stat-icon" />
          <div className="stat-content">
            <h3>Total Students</h3>
            <p>{stats.activeStudents}</p>
          </div>
        </div>
        <div className="stat-card">
          <FaCalendarAlt className="stat-icon" />
          <div className="stat-content">
            <h3>Recent Students</h3>
            <p>{stats.recentStudents}</p>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <Link to="/add-student" className="action-button">
            <FaUserPlus /> Add New Student
          </Link>
          <Link to="/student-list" className="action-button">
            <FaList /> View All Students
          </Link>
        </div>
      </div>

      <div className="recent-students">
        <h2>Recent Students</h2>
        <div className="students-table">
          {students.length === 0 ? (
            <p className="no-data">No students found. Add your first student!</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Course</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.slice(0, 5).map((student) => (
                  <tr key={student._id || student.id}>
                    <td>{student.name || 'N/A'}</td>
                    <td>{student.email || 'N/A'}</td>
                    <td>{student.course || 'N/A'}</td>
                    <td className="action-icons">
                      <Link to={`/edit-student/${student._id || student.id}`} className="icon-button">
                        <FaEdit />
                      </Link>
                      <button 
                        className="icon-button delete"
                        onClick={() => handleDelete(student._id || student.id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home; 