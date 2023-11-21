// src/components/PasswordChangeForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./PasswordChangeForm.css";

const PasswordChangeForm = () => {
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  // Load email from local storage on component mount
  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleChangePassword = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8090/api/v1/employee/change-password',
        {
          email,
          oldPassword,
          newPassword,
        }
      );

      setMessage(response.data);
    } catch (error) {
      setMessage(error.response.data);
    }
  };

  return (
    <div className='password-change-form'>
      <h2>Change the Password</h2>
      <div>
        <label>Email:</label>
        <input
          className="input-field"  // Add this class name
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          readOnly
        />
      </div>
      <div>
        <label>Old Password:</label>
        <input
          className="input-field"  // Add this class name
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </div>
      <div>
        <label>New Password:</label>
        <input
          className="input-field"  // Add this class name
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <button className="change-password-btn" onClick={handleChangePassword}>
        Change Password
      </button>
      <div className="message">{message}</div>
    </div>
  );
};

export default PasswordChangeForm;
