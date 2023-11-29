import React, { useState, useEffect } from 'react';
import "./Notification.css";

const Notification = ({ message, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return visible ? (
    <div className="notification">
      <p>{message}</p>
      <button onClick={() => onClose()}>Close</button>
    </div>
  ) : null;
};

export default Notification;
