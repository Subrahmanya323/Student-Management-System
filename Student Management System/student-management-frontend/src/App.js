import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StudentList from './pages/StudentList';
import AddStudent from './pages/AddStudent';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      {/* Toastify container to show notifications */}
      <ToastContainer position="top-center" autoClose={3000} />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student-list" element={<StudentList />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/edit-student/:id" element={<AddStudent />} />
      </Routes>
    </Router>
  );
}

export default App;
