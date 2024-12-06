import React from 'react';
import './Modal.css';

function Modal({ show, onClose }) {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add Product</h2>
            <label>
              Name of the product:
              <input
                type="text"
              />
            </label>
            <label>
              Description:
              <input
                type="text"
              />
            </label>
            <label>
              Price:
              <input
                type="text"
              />
            </label>
            <label>
              Quantity:
              <input
                type="text"
              />
            </label>
            <label>
              Category:
              <select>
                  <option>Eletronics</option>
              </select>
            </label>
            <label>
              Image:
              <input
                type="file"
              />
            </label>
            <button>Save</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
    );
}

export default Modal;
