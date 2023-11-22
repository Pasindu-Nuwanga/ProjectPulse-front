import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotAllowed.css"; 

const NotAllowed = () => {
  const navigate = useNavigate();

  return (
    <div className="not-allowed-container">
      <div className="not-allowed-message">You can't access this page. Please Login!</div>
      
      <div className="back-to-login">
      <button className="back-to-login-button" onClick={() => navigate("/login")}>
      <i className='fa fa-sign-in'/>Back to Login
      </button>
      </div>
    </div>
  );
};

export default NotAllowed;
