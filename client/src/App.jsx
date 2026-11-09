import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/resume';

function App() {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(API_URL)
      .then(response => setResume(response.data))
      .catch(() => setError('Could not load resume. Check that MongoDB and the backend server are running, and that you have seeded the database.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="status">Loading resume...</p>;
  if (error) return <p className="status error">{error}</p>;
  if (!resume) return <p className="status">No resume data found.</p>;

  return (
    <main className="cv">
      <h1>{resume.name}</h1>
      <p>{resume.address}</p>
      <p>Phone: {resume.phone}</p>
      <p>Email: {resume.email}</p>

      <section>
        <h2>Professional Objectives</h2><hr />
        <p>{resume.objective}</p>
      </section>

      <section>
        <h2>Education</h2><hr />
        <ul>
          {resume.education?.map((item, index) => (
            <li key={item._id || index}>
              <strong>{item.institution}</strong><br />
              {item.qualification} ({item.period}) {item.result && <span>{item.result}</span>}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Skills</h2><hr />
        <ul>
          {resume.skills?.map((group, index) => (
            <li key={group._id || index}>
              <strong>{group.category}:</strong> {group.items?.join(', ')}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Projects</h2><hr />
        <ul>
          {resume.projects?.map((project, index) => (
            <li key={project._id || index}>
              <strong>{project.title}</strong><br />
              {project.description}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Certifications</h2><hr />
        <ul>{resume.certifications?.map((item, index) => <li key={index}>{item}</li>)}</ul>
      </section>

      <section>
        <h2>Interests</h2><hr />
        <ul>{resume.interests?.map((item, index) => <li key={index}>{item}</li>)}</ul>
      </section>

      <section>
        <h2>Language</h2><hr />
        <ul>{resume.languages?.map((item, index) => <li key={index}>{item}</li>)}</ul>
      </section>

      <section>
        <h2>Declaration</h2><hr />
        <p>{resume.declaration}</p>
      </section>
    </main>
  );
}

export default App;
