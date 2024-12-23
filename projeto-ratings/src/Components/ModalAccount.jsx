import React, { useEffect, useState } from 'react';
import './ModalAccount.css';
import axios from 'axios';
import Confirmation from './Confirmation';

function ModalAccount({ show, onClose, onNotify, userData, setUserData }) {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [userName, setUserName] = useState(userData?.name || '');
    const [userEmail, setUserEmail] = useState(userData?.email || '');
    const [userAddress, setUserAdress] = useState(userData?.address || '');
    const [userPhone, setUserPhone] = useState(userData?.phone || '');

    useEffect(() => {
        if (userData) {
            setUserName(userData.name);
            setUserEmail(userData.email);
            setUserAdress(userData.address);
            setUserPhone(userData.phone);
        }
    }, [userData]);

    const handleSave = () => {

        const token = localStorage.getItem('authToken');

        if (!token) {
            onNotify('No permission to do this operation, contact your administrator!', 'error');
            return;
        }
        const updatedUser = {
            ...userData,
            name: userName,
            email: userEmail,
            address: userAddress,
            phone: userPhone,
        };
        axios.put(`http://localhost:8080/customers`, updatedUser, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                setUserData(updatedUser);
                onNotify('Account updated successfully!', 'success');
                onClose();
            })
            .catch(err => {
                console.error('Error updating user:', err);
                onNotify('Failed to update account.', 'error');
            });
    };

    const handleConfirm = () => {
        setShowConfirmation(false);
        handleSave();
    };

    if (!show) return null;

    return (
        <div className="modal-overlay-account">
            <div className="modal">
                <h2>User Account</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={userName || ''}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        E-mail:
                        <input
                            type="email"
                            value={userEmail || ''}
                            onChange={(e) => setUserEmail(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Address:
                        <input
                            type="text"
                            value={userAddress || ''}
                            onChange={(e) => setUserAdress(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Phone:
                        <input
                            type="text"
                            value={userPhone || ''}
                            onChange={(e) => setUserPhone(e.target.value)}
                            required
                        />
                    </label>
                    <div className="modal-buttons">
                        <button type="button" onClick={onClose}>Cancel</button>
                        <button type="button" onClick={() => setShowConfirmation(true)}>Save</button>
                    </div>
                </form>
            </div>
            {showConfirmation && (
                <Confirmation message="Do you really want to update?" onConfirm={handleConfirm} onClose={() => setShowConfirmation(false)} />
            )}
        </div>
    );
}

export default ModalAccount;
