import React from 'react';
import './Sidebar.css';

function Sidebar({ onToggleVisible }) {
    return (
        <div className="sidebar">
                <div>
                    <img src="settings.png" alt="sidebar" className="settings-icon" onClick={onToggleVisible} />
                    <div className="p-grid p-fluid">
                        <div className="p-col-12">
                            <img src="movies-podcast.png" alt="Ratings" className="ratings_logo" />
                        </div>
                    </div>
                    <div className="p-grid p-fluid">
                        <div className="p-col-12">
                            <h1>Ratings</h1>
                        </div>
                    </div>
                    <div className="p-grid p-fluid">
                        <div className="p-col-12">
                            <div className="p-menubar">
                                <ul className="p-menu">
                                    <li className="p-menuitem">
                                        <a href="#" className="p-link">Home</a>
                                    </li>
                                    <li className="p-menuitem">
                                        <a href="#" className="p-link">Movies</a>
                                    </li>
                                    <li className="p-menuitem">
                                        <a href="#" className="p-link">Top 10</a>
                                    </li>
                                    <li className="p-menuitem">
                                        <a href="#" className="p-link">Surprise me</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="footer">
                        <footer>
                            &copy; 2024 Ratings. All rights reserved.
                        </footer>
                    </div>
                </div>
        </div>
    );
}

export default Sidebar;
