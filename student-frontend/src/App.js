import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    studentId: '',
    name: '',
    dob: '',
    email: '',
    classId: ''
  });

  useEffect(() => {
    fetchStudents();
    fetchClasses();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/students');
      setStudents(res.data);
    } catch (error) {
      console.error('Lỗi khi lấy sinh viên:', error);
    }
  };

  const fetchClasses = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/classes');
      setClasses(res.data);
    } catch (error) {
      console.error('Lỗi khi lấy lớp:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:3000/api/students/${editingId}`, formData);
      } else {
        await axios.post('http://localhost:3000/api/students', formData);
      }
      setFormData({ studentId: '', name: '', dob: '', email: '', classId: '' });
      setEditingId(null);
      setShowForm(false);
      fetchStudents();
    } catch (error) {
      console.error('Lỗi khi lưu:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xoá sinh viên này không?')) {
      try {
        await axios.delete(`http://localhost:3000/api/students/${id}`);
        fetchStudents();
      } catch (error) {
        console.error('Lỗi xoá sinh viên:', error);
      }
    }
  };

  const handleEdit = (student) => {
    setFormData({
      studentId: student.studentId,
      name: student.name,
      dob: student.dob?.substring(0, 10),
      email: student.email,
      classId: student.classId?._id || ''
    });
    setEditingId(student._id);
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setFormData({ studentId: '', name: '', dob: '', email: '', classId: '' });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Danh sách sinh viên</h1>

      <button onClick={() => {
        setShowForm(!showForm);
        if (!showForm) {
          setFormData({ studentId: '', name: '', dob: '', email: '', classId: '' });
          setEditingId(null);
        }
      }}>
        {showForm ? 'Đóng form' : '➕ Thêm sinh viên'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          <h3>{editingId ? '✏️ Sửa sinh viên' : '➕ Thêm sinh viên'}</h3>
          <input type="text" name="studentId" placeholder="Mã SV" value={formData.studentId} onChange={handleChange} required />
          <input type="text" name="name" placeholder="Tên" value={formData.name} onChange={handleChange} required />
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <select name="classId" value={formData.classId} onChange={handleChange} required>
            <option value="">-- Chọn lớp --</option>
            {classes.map(cls => (
              <option key={cls._id} value={cls._id}>{cls.classId}</option>
            ))}
          </select>
          <div style={{ marginTop: 10 }}>
            <button type="submit">{editingId ? '💾 Cập nhật' : 'Lưu'}</button>
            {editingId && <button type="button" onClick={handleCancelEdit} style={{ marginLeft: 10 }}>Huỷ</button>}
          </div>
        </form>
      )}

      <table border="1" cellPadding="8" style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            <th>Mã SV</th>
            <th>Họ tên</th>
            <th>Ngày sinh</th>
            <th>Email</th>
            <th>Lớp</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student._id}>
              <td>{student.studentId}</td>
              <td>{student.name}</td>
              <td>{new Date(student.dob).toLocaleDateString()}</td>
              <td>{student.email}</td>
              <td>{student.classId?.classId || 'Chưa có lớp'}</td>
              <td>
                <button onClick={() => handleEdit(student)} style={{ marginRight: 8 }}>✏️ Sửa</button>
                <button onClick={() => handleDelete(student._id)} style={{ color: 'red' }}>🗑️ Xoá</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
