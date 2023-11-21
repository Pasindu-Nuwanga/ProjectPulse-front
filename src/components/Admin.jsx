import React, { useState } from 'react';
import ProjectForm from "./ProjectForm";
import Registration from "./Registration";
import UserProfile from './UserProfile';
import "./Admin.css";  // Assuming you have a CSS file for Admin styles
import ProjectList from './ProjectList';
import Footer from './Footer';

function Admin({roleName, username}) {
  const [activeComponent, setActiveComponent] = useState('projectForm');

  const handleNavigation = (component) => {
    setActiveComponent(component);
  };

  return (
    <div>
      <div className="admin-container">
        <div className="admin-buttons">
          <button
            className={`admin-button ${activeComponent === 'projectForm' ? 'active' : ''}`}
            onClick={() => handleNavigation('projectForm')}
          >
            Create Project
          </button>
          <button
            className={`admin-button ${activeComponent === 'projectList' ? 'active' : ''}`}
            onClick={() => handleNavigation('projectList')}
          >
            Project List
          </button>
          <button
            className={`admin-button ${activeComponent === 'registration' ? 'active' : ''}`}
            onClick={() => handleNavigation('registration')}
          >
            User Registration
          </button>
        </div>

        {activeComponent === 'projectForm' && <ProjectForm />}
        {activeComponent === 'registration' && <Registration />}
        {activeComponent === 'projectList' && <ProjectList />}
      </div>

      <Footer/>
    </div>
  );
}

export default Admin;
