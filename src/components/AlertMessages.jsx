import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AlertMessages = () => {
  const [alertMessages, setAlertMessages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8090/getAllAlertMessages')
      .then(response => {
        setAlertMessages(response.data);
      })
      .catch(error => {
        console.error('Error fetching alert messages:', error);
      });
  }, []);

  return (
    <div>
      <h2>Alert Messages</h2>
      <ul>
        {alertMessages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export default AlertMessages;
