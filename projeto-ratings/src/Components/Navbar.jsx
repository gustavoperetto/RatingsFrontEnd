import React from "react";
import "./Navbar.css";

function Navbar({ onToggleVisible }) {
  return (
    <div className="navbar">
        <img
          src="movies-podcast.png"
          alt="movie ratings"
          className="ratings_logo"
        />
      <h1>Ratings</h1>
      <img
        src="settings.png"
        alt="settings"
        className="settings-icon"
        onClick={onToggleVisible}
      />
    </div>
  );
}

export default Navbar;
