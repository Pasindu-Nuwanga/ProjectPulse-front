import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./UserTable.css";

const UserTable = ({ projectId, role }) => {

  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');

  useEffect(() => {
    // Fetch the list of projects
    axios.get("http://localhost:8090/project/all")
      .then(response => setProjects(response.data))
      .catch(error => console.error('Error fetching projects:', error));
  }, []);

  useEffect(() => {
    if (selectedProject) {
      // Fetch users based on the selected project
      axios.get(`http://localhost:8090/api/v1/employee/users/${selectedProject}`)
        .then(response => setUsers(response.data))
        .catch(error => console.error('Error fetching users:', error));
    }
  }, [selectedProject]);

  return (
    <div className="user-table-container">
      {/* Project Dropdown */}
      <label className="project-label">Select Project: </label>
      <select onChange={(e) => setSelectedProject(e.target.value)} className="project-select">
        <option value="">-- Select Project --</option>
        {projects.map((project) => (
          <option key={project.projectId} value={project.projectId}>
            {project.projectName}
          </option>
        ))}
      </select>

      <div className='user-table-scroll'>
        <table className="user-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Job Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userId}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.roles.roleName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
