import React, { useEffect, useState } from 'react';
import './Notification.css';

function Notification({ message, type, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);

      const hideTimer = setTimeout(() => {
        setVisible(false);
        onClose();
      }, 3000);

      return () => clearTimeout(hideTimer);
    }
  }, [message, onClose]);

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
