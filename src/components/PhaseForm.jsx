import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./PhaseForm.css";

const PhaseForm = () => {
  const [phaseName, setPhaseName] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [projects, setProjects] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    // Fetch specific project by ID from localStorage
    const projectId = localStorage.getItem('projectId');
    if (projectId) {
      axios.get(`http://localhost:8090/project/${projectId}`)
        .then(response => {
          setProjects([response.data]); // Set the fetched project as an array to match your map function
          setSelectedProject(response.data.projectName); // Set the selected project
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
      // Set the success message upon successful phase creation
      setSuccessMessage('Phase created successfully!');
      setTimeout(() => setSuccessMessage(''), 5000);

      // Optionally, reset the form fields after successful submission
      setPhaseName('');
    } catch (error) {
      console.error('Error creating phase:', error);
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <div className="phase-form-container"> 
      <h2>Create a New Phase</h2>

      {successMessage && (
        <div className="phase-success-message">{successMessage}</div>
      )}

      <form className="phase-form" onSubmit={handleFormSubmit}>
        <div>
          <label className="phase-label">Phase Name:</label> 
          <input
            type="text"
            value={phaseName}
            onChange={(e) => setPhaseName(e.target.value)}
            required
            className="phase-input" 
          />
        </div>
        <button type="submit" className="phase-submit-btn">Create Phase</button> 
      </form>
    </div>
  );
};

export default PhaseForm;
