// src/AddStudentForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddStudentForm({ onStudentAdded }) {
  const [student, setStudent] = useState({
    studentId: '',
    name: '',
    dob: '',
    email: '',
    classId: '',
  });

  const [classes, setClasses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/classes')
      .then(response => setClasses(response.data))
      .catch(error => console.error('Lỗi lấy danh sách lớp:', error));
  }, []);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3000/api/students', student)
      .then(() => {
        alert('✅ Thêm sinh viên thành công!');
        onStudentAdded(); // Refresh danh sách
        setStudent({ studentId: '', name: '', dob: '', email: '', classId: '' });
      })
      .catch(error => {
        console.error('Lỗi thêm sinh viên:', error);
        alert('❌ Lỗi khi thêm sinh viên!');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Thêm sinh viên</h2>
      <input type="text" name="studentId" placeholder="Mã sinh viên" value={student.studentId} onChange={handleChange} required />
      <input type="text" name="name" placeholder="Họ tên" value={student.name} onChange={handleChange} required />
      <input type="date" name="dob" value={student.dob} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={student.email} onChange={handleChange} required />
      <select name="classId" value={student.classId} onChange={handleChange} required>
        <option value="">-- Chọn lớp --</option>
        {classes.map(cls => (
          <option key={cls._id} value={cls.classId}>{cls.classId}</option>
        ))}
      </select>
      <button type="submit">Thêm</button>
    </form>
  );
}

export default AddStudentForm;
