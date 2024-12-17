import React from 'react';
import './ModalLogin.css';

function ModalLogin({ show, onClose, onNotify }) {

    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay-login">
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
                        <div className='modal-register-forgot'>
                            <a>Forgot Password?</a>
                            <a>Register</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalLogin;
