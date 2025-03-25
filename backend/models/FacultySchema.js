const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
   Name: {
    type: String,
    required: true,
  },
  Designation: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true, 
  },
  Domain1: {
    type: String,
    required: true,
  },
  Domain2: {
    type: String,
    required: true,
  },
  Domain3: {
    type: String,
    required: true,
  },
  ProfileURL: {
    type: String,
    required: true,
  },
  ImageURL: {
    type: String,
    required: true,
  },
});

const Faculty = mongoose.model("faculty_detail", facultySchema,"faculty_details");

module.exports = Faculty;