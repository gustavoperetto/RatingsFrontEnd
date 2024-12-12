import React from "react";
import "./Navbar.css";

function Navbar({ onToggleVisible, onShopCart, className }) {

  return (
    <div className={`navbar ${className}`}>
      <div className="shopcart-icon">
        <ion-icon name="cart-outline" onClick={onShopCart}></ion-icon>
      </div>
      <h1>Ratings</h1>
      <div className="sidebar-icon">
        <ion-icon name="menu-outline" onClick={onToggleVisible}></ion-icon>
      </div>
    </div>
  );
}

export default Navbar;
