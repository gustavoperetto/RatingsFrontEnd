import React from "react";
import "./Navbar.css";

function Navbar({ onToggleVisible }) {
  
  return (
    <div className="navbar">
        <img src="cart-52.png" alt="shop" className="shop_logo"/>
      <h1>Ratings</h1>
      <img src="settings.png" alt="settings" className="settings-icon" onClick={onToggleVisible}/>
      </div>
  );
}

export default Navbar;
