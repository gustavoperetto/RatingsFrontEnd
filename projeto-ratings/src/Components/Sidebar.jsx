import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import axios from 'axios';

function Sidebar({ onToggleVisible, onAddProduct, onAddCategory, onAddSale, onLogin, onLogout, className, isLoggedIn, userRole, userId }) {
    const [LoggedAdmin, setLoggedAdmin] = useState(false);
    const [user, setUser] = useState([]);

    useEffect(() => {
        const isAdmin = isLoggedIn && userRole === "ADMIN";
        setLoggedAdmin(isAdmin);
    }, [isLoggedIn, userRole]);

    useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:8080/customers/${userId}`)
                .then(res => {
                    setUser(res.data);
                })
                .catch(err => console.error('Error loading user:', err));
        }
    },[userId]);

    return (
        <div>
            <div className={`sidebar ${className}`}>
                <div className='navbar-icon'>
                    <ion-icon name="menu-outline" onClick={onToggleVisible}></ion-icon>
                </div>
                <div className="p-grid p-fluid">
                    <div className="p-col-12">
                        <h1>hello,
                            <br /> 
                            {user ? user.name : ''}
                        </h1>
                    </div>
                </div>
                <div className="p-grid p-fluid">
                    <div className="p-menubar">
                        <ul className="p-menu">
                            <li className="p-menuitem">
                                <a href="#" className="p-link">Home</a>
                            </li>
                            <li className="p-menuitem">
                                <a href="#" className="p-link">Categories</a>
                            </li>
                            {LoggedAdmin && (
                                <>
                                    <li className="p-menuitem">
                                        <a onClick={onAddSale} className="p-link">Sale Manager</a>
                                    </li>
                                    <li className="p-menuitem">
                                        <a onClick={onAddProduct} className="p-link">Add Product</a>
                                    </li>
                                    <li className="p-menuitem">
                                        <a onClick={onAddCategory} className="p-link">Category Manager</a>
                                    </li>
                                </>
                            )}
                            <li className="p-menuitem">
                                <a onClick={isLoggedIn ? onLogout : onLogin} className="p-link">
                                    {isLoggedIn ? "Sign Out" : "Sign In"}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="footer-sidebar">
                    <footer>
                        <h4>&copy; 2024 Ratings.</h4>
                        <span>All rights reserved.</span>
                    </footer>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
