import React, { useState } from 'react';
import axios from 'axios';
import "./ProjectForm.css";

const ProjectForm = () => {
  const [projectName, setProjectName] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8090/projects', {
        projectName: projectName,
      });

      console.log('Project created:', response.data);
      // Set the success message upon successful phase creation
      setSuccessMessage('Project created successfully!');
      // You may also want to clear the success message after a certain period of time

      // Optionally, reset the form fields after successful submission
      setProjectName('');
    } catch (error) {
      console.error('Error creating phase:', error);
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <div className="project-form-container"> 
      <h2>Create a New Project</h2>

      {successMessage && (
        <div className="project-success-message">{successMessage}</div>
      )}

      <form className="project-form" onSubmit={handleFormSubmit}> 
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
