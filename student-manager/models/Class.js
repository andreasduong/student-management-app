// models/Class.js
const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  classId: String,
  name: String,
  advisor: String,
  schoolYear: String
});

module.exports = mongoose.model('Class', classSchema);
