import React, { useState } from 'react';
import ProjectForm from "./ProjectForm";
import Registration from "./Registration";
import UserProfile from './UserProfile';
import "./Admin.css";
import ProjectList from './ProjectList';
import Footer from './Footer';
import UserTable from './UserTable';
import Open from './Open';
import Modal from 'react-modal';
import PasswordChangeForm from './PasswordChangeForm';

function Admin({roleName, username}) {
  
  const [activeComponent, setActiveComponent] = useState('');
  const [clicked, setClicked] = useState(false);
  const [isChangePasswordModalOpen, setChangePasswordModalOpen] = useState(false);

  const toggleDropdown = () => {
    setClicked(!clicked);
  };

  const openChangePasswordModal = () => {
    setChangePasswordModalOpen(true);
  };

  const closeChangePasswordModal = () => {
    setChangePasswordModalOpen(false);
  };

  const handleNavigation = (component) => {
    setActiveComponent(component);
  };

  console.log('username', username);
  console.log('roleName', roleName);

  return (
    <div>
      <div className='admin-top'>
        <img className="Navbar-logo" src="/images/Project_Logo.png" alt="Registration" />

        <div className="Profile-section">
        <div className="Profile-content">
          <div className="Profile-photo-container">
            <img className="Profile-photo" src="/images/profile.png" alt="Profile" />
          </div>
          <div className="UserProfile-container">
            <UserProfile roleName={roleName} username={username} />
          </div>
        </div>

        {/* Dropdown directly in the Navbar */}
        <div className="Dropdown">
        <button className="Dropdown-toggle" onClick={toggleDropdown}>
          <span>Profile</span> 
          <i className='fa fa-caret-down'/>
        </button>
        {clicked && (
          <div className="Dropdown-content">
            <button className="password-change-btn" onClick={openChangePasswordModal}>Change Password</button>
            <button className="logout-btn" 
                    onClick= {()=> {
                     const confirmLogout = window.confirm("Are you sure you want to log out?");
                     if (confirmLogout) {
                       localStorage.clear(); window.location.href = '/login'
                     }
                    }}>
                     <i className='fa fa-sign-out'/><a> </a>Log out 
                     </button>
          </div>
        )}
      </div>
      </div>
      </div>

      {/* Change Password Modal */}
    <Modal
      isOpen={isChangePasswordModalOpen}
      onRequestClose={closeChangePasswordModal}
      contentLabel="Change Password"
      style={{
        overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
        content: {
          border: 'none',
          background: 'none',
          width:'500px',
          margin:'auto',
          padding:'20px',
          marginTop: '130px',
          overflow: 'auto', 
        },
      }}
    >
      {isChangePasswordModalOpen && (
        <div className="password-change-form-container" >
          <PasswordChangeForm />
        </div>
      )}
    </Modal>

      <Open
       clsName = "about"
       openImg = "/images/admin.jpg"
       origin = "about-text"
       title = "Adminstration"
       />

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
          <button
            className={`admin-button ${activeComponent === 'userTable' ? 'active' : ''}`}
            onClick={() => handleNavigation('userTable')}
          >
            User Details
          </button>
        </div>

        {activeComponent === 'projectForm' && <ProjectForm />}
        {activeComponent === 'registration' && <Registration />}
        {activeComponent === 'projectList' && <ProjectList />}
        {activeComponent === 'userTable' && <UserTable />}
      </div>

      <Footer/>
    </div>
    
  );
}

export default Admin;
