import React, { useState, useEffect } from 'react';
import "./UserProfile.css";
import axios from 'axios';

  const UserProfile = ({ roleName, username }) => {
    const [user, setUser] = useState({});
  
   
  return (
    <div className="user-profile">
      <p>{username}</p>
      <p>{roleName}</p>
    </div>
  );
};

export default UserProfile;
