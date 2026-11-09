require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Resume = require('./models/Resume');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fathima_resume';

app.use(cors());
app.use(express.json());

app.get('/api/resume', async (req, res) => {
  try {
    const resume = await Resume.findOne().lean();
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found. Run npm run seed in the server folder.' });
    }
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: 'Unable to retrieve resume data.' });
  }
});

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected successfully.');
    app.listen(PORT, () => console.log(`API server running at http://localhost:${PORT}`));
  })
  .catch(error => {
    console.error('MongoDB connection failed:', error.message);
    console.error('Make sure the local MongoDB service is running.');
  });
