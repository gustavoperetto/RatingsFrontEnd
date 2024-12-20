import React, { useEffect, useState } from 'react';
import "./Navbar.css";

function Navbar({ onToggleVisible, onShopCart, className }) {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalItems);
    };
    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  return (
    <div className={`navbar ${className}`}>
      <div className="sidebar-icon">
        <ion-icon name="menu-outline" onClick={onToggleVisible}></ion-icon>
      </div>
      <h1>Ratings</h1>
      <div className="shopcart-icon">
        <span>{cartCount}</span>
        <ion-icon name="cart-outline" onClick={onShopCart}></ion-icon>
      </div>
    </div>
  );
}


export default Navbar;
