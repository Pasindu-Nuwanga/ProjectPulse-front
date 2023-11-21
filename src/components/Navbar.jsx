// import { Component } from "react";
// import "./NavbarStyle.css";
// import { NavbarItems } from "./NavbarItems";
// import { Link } from "react-router-dom";
// import UserProfile from "./UserProfile";
// import { useNavigate } from "react-router-dom";


// class Navbar extends Component{

//     state = {clicked: false};
//     handleClick = (event) => {
//       event.preventDefault();
//       //window.location.href = '/login';
//         this.setState({ clicked: !this.state.clicked });
//     }

//     render(){

//       const { navigate } = this.props;
//         return(
//             <nav className="NavbarItems">
//                 <img className="Navbar-logo" src= "/images/Project_Logo.png" alt="Registration"/>

//                 <ul className={this.state.clicked ? "Nav-menu active" : "Nav-menu"}>

//                     {NavbarItems.map((item, index) =>{
//                      return(
//                         <li key={index}>
//                         <Link className = {item.cName} to= {item.url}>{item.title}</Link>
//                     </li>
//                      )
//                     })} 
//                 </ul>
//                 <div className="Profile-section">
//                   <div className="Profile-content">
//                     <div className="Profile-photo-container">
//                       <img className="Profile-photo" src="/images/profile.png" alt="Profile" />
//                     </div>
//                     <div className="UserProfile-container">
//                       <UserProfile roleName={this.props.roleName} username={this.props.username} />
//                     </div>
//                   </div>
//                   <button className="Logout-btn" 
//                    onClick= {()=> {
//                     const confirmLogout = window.confirm("Are you sure you want to log out?");
//                     if (confirmLogout) {
//                       localStorage.clear(); window.location.href = '/login'
//                     }
//                    }}>
//                     Log out
//                     </button>
//                 </div>

//                 {/* Resposive navbar */}
//                 <div className="menu-icons" onClick={
//                     this.handleClick}>    
//                     <i className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
//                 </div>
//             </nav>
//         );
//     }
// }

// export default function(props) {
//   const navigate = useNavigate();

//   return <Navbar {...props} navigate={navigate} />;
// }

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserProfile from './UserProfile';
import './NavbarStyle.css';
import { NavbarItems } from './NavbarItems';
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import PasswordChangeForm from './PasswordChangeForm';

const Navbar = ({ roleName, username }) => {
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

  return (
    <>
    <nav className="NavbarItems">
      <img className="Navbar-logo" src="/images/Project_Logo.png" alt="Registration" />

      <ul className={clicked ? 'Nav-menu active' : 'Nav-menu'}>
        {NavbarItems.map((item, index) => (
          <li key={index}>
            <Link className={item.cName} to={item.url}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>

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

      {/* Responsive navbar */}
      <div className="menu-icons" onClick={toggleDropdown}>
        <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
      </div>

    </nav>

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
  </>
  );
};

export default function(props) {
     const navigate = useNavigate();
  
     return <Navbar {...props} navigate={navigate} />;
   }
