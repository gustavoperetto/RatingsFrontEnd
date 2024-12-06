import React from 'react';
import './Sidebar.css';

function Sidebar({ onToggleVisible, onAddProduct }) {
    return (
        <div>
            <div className="sidebar">
                <img src="settings.png" alt="sidebar" className="settings-icon" onClick={onToggleVisible} />
                <img src="movies-podcast.png" alt="Ratings" className="ratings_logo" />
                <div className="p-grid p-fluid">
                    <div className="p-col-12">
                        <h1>Ratings</h1>
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
                            <li className="p-menuitem">
                                <a href="#" className="p-link">Sale</a>
                            </li>
                            <li className="p-menuitem">
                                <a onClick={onAddProduct} className="p-link">Add Product</a>
                            </li>
                            <li className="p-menuitem">
                                <a className="p-link">Add Category</a>
                            </li>
                            <li className="p-menuitem">
                                <a href="#" className="p-link">Account</a>
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
