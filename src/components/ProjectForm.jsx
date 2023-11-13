import React, { useState } from 'react';
import axios from 'axios';

const ProjectForm = () => {
  const [projectName, setProjectName] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8090/projects', {
        projectName: projectName,
      });

      console.log('Project created:', response.data);
      // Handle success, e.g., show a success message to the user
    } catch (error) {
      console.error('Error creating project:', error);
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <div>
      <h2>Create a New Project</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Project Name:</label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
};

export default ProjectForm;
