// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/studentDB')
  .then(() => console.log('✅ Đã kết nối MongoDB'))
  .catch((err) => console.error('❌ Lỗi kết nối MongoDB:', err));

// Import route
const studentRoutes = require('./routes/studentRoutes');
const classRoutes = require('./routes/classRoutes');

// Sử dụng route
app.use('/api/students', studentRoutes);
app.use('/api/classes', classRoutes);

// Route test
app.get('/', (req, res) => {
  res.send('Backend đang chạy!');
});

app.listen(port, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${port}`);
});
