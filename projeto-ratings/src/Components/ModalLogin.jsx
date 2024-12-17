import React, { useEffect, useState } from 'react';
import './ModalLogin.css';
import axios from 'axios';

function ModalLogin({ show, onClose, onNotify }) {

    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay-sale">
            <div className="modal">
                <h2>Login</h2>
                <form>
                    <label>
                        Username:
                        <input type="text" required />
                    </label>
                    <label>
                        Password:
                        <input type="password" required />
                    </label>
                    <div className="modal-buttons">
                        <button type="button" onClick={onClose}>Cancel</button>
                        <button type="submit">Sign In</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalLogin;
