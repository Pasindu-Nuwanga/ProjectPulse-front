import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PhaseForm = () => {
  const [phaseName, setPhaseName] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch specific project by ID from localStorage
    const projectId = localStorage.getItem('projectId');
    if (projectId) {
      axios.get(`http://localhost:8090/project/${projectId}`)
        .then(response => {
          setProjects([response.data]); // Set the fetched project as an array to match your map function
        })
        .catch(error => {
          console.error('Error fetching project by ID:', error);
        });
    }
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8090/phases', {
        phaseName: phaseName,
        projectName: selectedProject,
      });

      console.log('Phase created:', response.data);
      // Handle success, e.g., show a success message to the user
    } catch (error) {
      console.error('Error creating phase:', error);
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <div>
      <h2>Create a New Phase</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Phase Name:</label>
          <input
            type="text"
            value={phaseName}
            onChange={(e) => setPhaseName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Project Name:</label>
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            required
          >
            <option value="" disabled>Select a project</option>
            {projects.map(project => (
              <option key={project.projectId} value={project.projectName}>
                {project.projectName}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Create Phase</button>
      </form>
    </div>
  );
};

export default PhaseForm;
