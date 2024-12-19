import React, { useState } from 'react';
import './ModalLogin.css';
import { jwtDecode } from "jwt-decode";

function ModalLogin({ show, onClose, onNotify, onLoginSuccess }) {
    const [isRegistering, setIsRegistering] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        name: '',
        email: '',
        address: '',
        phone: '',
    });

    const resetForm = () => {
        setFormData({
            username: '',
            password: '',
            name: '',
            email: '',
            address: '',
            phone: '',
        });
        setIsRegistering(false);
    }

    const handleClose = () => {
        resetForm();
        onClose();
    };

    if (!show) {
        return null;
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const endpoint = isRegistering
            ? 'http://localhost:8080/auth/register'
            : 'http://localhost:8080/auth/login';
        const payload = isRegistering
            ? {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                address: formData.address,
                phone: formData.phone,
                role: 'USER',
            }
            : {
                email: formData.username,
                password: formData.password,
            };

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const data = await response.json();
                if (data && data.token) {
                    const decodedToken = jwtDecode(data.token);
                    const role = decodedToken.role;
                    localStorage.setItem('authToken', data.token);
                    onNotify('Login successful');
                    onLoginSuccess(role);
                    handleClose();
                } else {
                    onNotify('Registration successful');
                    handleClose();
                }
            }
        } catch (error) {
            console.error('Error:', error);
            onNotify('An unexpected error occurred.');
            handleClose();
        }
    };

    return (
        <div className="modal-overlay-login">
            <div className="modal">
                <h2>{isRegistering ? 'Register' : 'Login'}</h2>
                <form onSubmit={handleSubmit}>
                    {isRegistering && (
                        <>
                            <label>
                                Name:
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                Email:
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                Address:
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                Phone:
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                Password:
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                        </>
                    )}
                    {!isRegistering && (
                        <>
                            <label>
                                Username:
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                Password:
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                        </>
                    )}
                    <div className="modal-buttons">
                        <button type="button" onClick={handleClose}>
                            Cancel
                        </button>
                        <button type="submit">
                            {isRegistering ? 'Sign Up' : 'Sign In'}
                        </button>
                        <div className="modal-register-forgot">
                            {!isRegistering && <a href="#">Forgot Password?</a>}
                            <a
                                href="#"
                                onClick={() => setIsRegistering((prev) => !prev)}
                            >
                                {isRegistering ? 'Back to Login' : 'Register'}
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalLogin;
