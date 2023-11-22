import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./UserTable.css";

const UserTable = ({ projectId, role }) => {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [editingUserId, setEditingUserId] = useState(null); // Track the user being edited
  const [editedValues, setEditedValues] = useState({}); // Track edited values for each user
  const [successMessage, setSuccessMessage] = useState('');

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

  const handleEditUser = (userId) => {
    // Set the editing state for the clicked user
    setEditingUserId(userId);
    // Initialize edited values for the user
    setEditedValues({ ...editedValues, [userId]: {} });
  };

  const handleSaveUser = (userId) => {
    // Make a PUT request to update the specific field for the user
    axios.put(`http://localhost:8090/api/v1/employee/users/edit/${userId}`, editedValues[userId])
      .then(response => {
        console.log("User updated:", response.data);
        // Set the success message
        setSuccessMessage('User updated successfully!');
        // Reset the success message after a few seconds
        setTimeout(() => setSuccessMessage(''), 5000);

        // Refresh the user list after successful update
        axios.get(`http://localhost:8090/api/v1/employee/users/${selectedProject}`)
          .then(response => setUsers(response.data))
          .catch(error => console.error('Error fetching users:', error));
        // Reset the editing state
        setEditingUserId(null);
      })
      .catch(error => console.error('Error updating user:', error));
  };

  const handleCancelEdit = () => {
    // Reset the editing state without saving changes
    setEditingUserId(null);
    setEditedValues({});
  };

  const handleInputChange = (userId, field, value) => {
    // Update the edited values for the user
    setEditedValues({
      ...editedValues,
      [userId]: {
        ...editedValues[userId],
        [field]: value,
      },
    });
  };

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

      {/* Success message */}
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}

      <div className='user-table-scroll'>
        <table className="user-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Job Role</th>
              <th>Edit User</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userId}>
                <td>
                  {editingUserId === user.userId ? (
                    <input
                      type="text"
                      value={editedValues[user.userId]?.firstName || user.firstName}
                      onChange={(e) => handleInputChange(user.userId, 'firstName', e.target.value)}
                    />
                  ) : (
                    user.firstName
                  )}
                </td>
                <td>
                  {editingUserId === user.userId ? (
                    <input
                      type="text"
                      value={editedValues[user.userId]?.lastName || user.lastName}
                      onChange={(e) => handleInputChange(user.userId, 'lastName', e.target.value)}
                    />
                  ) : (
                    user.lastName
                  )}
                </td>

                <td>
                  {editingUserId === user.userId ? (
                    <input
                      type="text"
                      value={editedValues[user.userId]?.email || user.email}
                      onChange={(e) => handleInputChange(user.userId, 'email', e.target.value)}
                    />
                  ) : (
                    user.email
                  )}
                </td>

                <td>{user.roles.roleName}</td>

                <td>
                  {editingUserId === user.userId ? (
                    <div className="user-edit-buttons">
                      <button onClick={() => handleSaveUser(user.userId)}>
                        <i className='fas fa-save'/>
                        </button>
                      <button className="cancel" onClick={handleCancelEdit}>
                        <i className='fas fa-cancel'/>
                        </button>
                    </div>
                  ) : (
                    <div className='edit-user-btn'>
                    <button onClick={() => handleEditUser(user.userId)}>
                      <i className='fas fa-edit'/>
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
