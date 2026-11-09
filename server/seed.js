require('dotenv').config();
const mongoose = require('mongoose');
const Resume = require('./models/Resume');

const resumeData = {
  name: 'FATHIMA HASHIM',
  address: 'Thiruvoth House, Villiappally, Vatakara, Kozhikode',
  phone: '+91 8111958337',
  email: 'fathimahashim005@gmail.com',
  objective: 'A highly motivated graduate seeking a career in teaching. Passionate about creating a positive and inclusive learning environment, with a strong foundation in Computer Science to inspire and educate students effectively.',
  education: [
    { institution: 'University of Calicut', qualification: 'B.Sc Computer Science', period: '2023-2026', result: '' },
    { institution: 'Kerala HSE Board', qualification: 'Higher Secondary Education', period: '2021-2023', result: '92.84%' },
    { institution: 'Board of Public Examinations, Kerala', qualification: 'SSLC', period: '2020-2021', result: '95%' }
  ],
  skills: [
    { category: 'Technical Skills', items: ['Python Programming', 'Software Development', 'AR Implementation', 'Efficient Typing'] },
    { category: 'Professional Skills', items: ['Communication', 'Leadership', 'Critical Thinking', 'Organizational Skills'] }
  ],
  projects: [
    { title: 'Learn With AR', description: 'Developed an Augmented Reality (AR) application designed for medical students to enhance practical learning and clinical understanding.' },
    { title: 'Project on Internet of Things', description: 'Humidity sensor using Arduino IDE.' }
  ],
  certifications: [
    'Python Language Internship (2025)',
    'Storytelling Through Data Visualization',
    'Business Intelligence & Email Marketing: Concepts, Tools and Strategy'
  ],
  interests: ['Academic Teaching', 'Software Development', 'Programming and Technology Trends', 'Web Development', 'App Development'],
  languages: ['English', 'Malayalam', 'Arabic'],
  declaration: 'I hereby declare that the above information is true and correct to the best of my knowledge.'
};

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fathima_resume');
    await Resume.findOneAndUpdate({}, resumeData, { upsert: true, new: true, runValidators: true });
    console.log('Resume data inserted/updated successfully.');
  } catch (error) {
    console.error('Seeding error:', error.message);
  } finally {
    await mongoose.disconnect();
  }
}
seed();
