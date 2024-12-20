import React from 'react';
import './Confirmation.css';

function Confirmation({ message, onConfirm, onClose }) {
  return (
    <div className='modal-overlay-confirmation'>
      <div className='modal'>
        <div className="confirmation">
          <p>{message}</p>
          <div className='confirmation-icons'>
            <ion-icon name="close-outline" onClick={onClose}></ion-icon>
            <ion-icon name="checkmark-outline" onClick={onConfirm}></ion-icon>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;
