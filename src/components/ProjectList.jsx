import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProjectList.css';

const ProjectList = ({ role }) => {
  const [projects, setProjects] = useState([]);
  const [uploadMessage, setUploadMessage] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {

    axios
      .get(`http://localhost:8090/project/all`)
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error('Error fetching projects:', error);
      });
  }, []);

  const handleEditClick = (project) => {
    setSelectedProject(project);
    setShowEditModal(true);
  };

  const handleEditProjectName = (newProjectName) => {
    axios
      .put(`http://localhost:8090/edit/projects/${selectedProject.projectId}`, { projectName: newProjectName })
      .then((response) => {
        console.log(response.data);
        setUploadMessage('Project name updated successfully!');
        setShowEditModal(false);
  
        // Reload the current web page
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error editing project name:', error);
        setUploadMessage('Failed to edit project name. Please try again.');
        setShowEditModal(false);
      });
  };
  

  const handleCancelEdit = () => {
    setShowEditModal(false);
  };

  return (
    <>
    <div className="project-list-container">
      <h2>Project List</h2>
      <hr/>

      {uploadMessage && <div className="alert-alert-info mt-2">{uploadMessage}</div>}

      <div className="projects-list">
        <ul>
          {projects.map((project) => (
            <li key={project.projectId}>
              <div>
                {project.projectName}
              </div>
              <div>
                <button className="edit" onClick={() => handleEditClick(project)}>
                  Rename
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* Edit Modal */}
    {showEditModal && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <label>
              New Project Name:
              <hr/>
              <input type="text" value={selectedProject.projectName} onChange={(e) => setSelectedProject({ ...selectedProject, projectName: e.target.value })} />
            </label>
            <div className="edit-modal-buttons">
              <button className='edit-save' onClick={() => handleEditProjectName(selectedProject.projectName)}>Save</button>
              <button className='edit-cancel' onClick={handleCancelEdit}>Cancel</button>
            </div>
          </div>
        </div>
      )}</>
  );
};

export default ProjectList;
