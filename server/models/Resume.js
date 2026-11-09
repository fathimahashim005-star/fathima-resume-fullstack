const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  phone: String,
  email: String,
  objective: String,
  education: [{
    institution: String,
    qualification: String,
    period: String,
    result: String
  }],
  skills: [{
    category: String,
    items: [String]
  }],
  projects: [{
    title: String,
    description: String
  }],
  certifications: [String],
  interests: [String],
  languages: [String],
  declaration: String
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);
