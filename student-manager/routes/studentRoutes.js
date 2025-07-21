const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Lấy danh sách sinh viên (populate classId để có thông tin lớp)
router.get('/', async (req, res) => {
  try {
    const students = await Student.find().populate('classId');
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi lấy danh sách sinh viên' });
  }
});

// Thêm sinh viên
router.post('/', async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(400).json({ error: 'Lỗi khi thêm sinh viên' });
  }
});

// Cập nhật sinh viên
router.put('/:id', async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({ error: 'Lỗi khi cập nhật sinh viên' });
  }
});

// Xoá sinh viên
router.delete('/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Đã xoá sinh viên' });
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi xoá sinh viên' });
  }
});

module.exports = router;
