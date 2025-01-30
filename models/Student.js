const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: String,
  class: Number,
  section: String,
  rollno: Number,
  percentage: Number,
});

module.exports = mongoose.model("student", StudentSchema);
