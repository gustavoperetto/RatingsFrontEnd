import React, { useEffect, useState } from 'react';
import './Notification.css';

function Notification({ message, type, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);

      const hideTimer = setTimeout(() => {
        setVisible(false);
      }, 3000);
    }
  }, [message]);

  useEffect(() => {
    if (!visible && message) {
      const cleanupTimer = setTimeout(() => {
        onClose();
      }, 500);

      return () => {
        clearTimeout(cleanupTimer);
      };
    }
  }, [visible, message, onClose]);

  if (!visible) return null;

  return (
    <div className={`notification-container ${type}`}>
      <div className="notification">
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Notification;
