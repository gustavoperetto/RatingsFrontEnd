import React, { useEffect, useState } from 'react';
import './ModalShopCart.css';

function ModalShopCart({ show, onClose, onNotify }) {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        if (show) {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            setCartItems(cart);
        }
    }, [show]);

    const updateCartItem = (id, newQuantity) => {
        const updatedCart = cartItems.map(item =>
            item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
        );
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const removeCartItem = (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };


    const calculateTotal = () => {
        return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
    };

    const handleSaveCart = () => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
        onNotify('Cart saved to LocalStorage!', 'success');
        onClose();
    };

    const handleCloseModal = () => {
        const cartUpdatedEvent = new CustomEvent('cartUpdated');
        window.dispatchEvent(cartUpdatedEvent);
        onClose();
    };


    if (!show) return null;

    return (
        <div className="modal-overlay-shopcart">
            <div className="modal">
                <h2>Shopping Cart</h2>
                {cartItems.length > 0 ? (
                    <>
                        <ul className="cart-items">
                            {cartItems.map(item => (
                                <li key={item.id} className="cart-item">
                                    <img src={`http://localhost:8080/products/product-images/${item.id}`} alt={item.name} />
                                    <div className='cart-item-desc'>
                                        <div className='cart-item-title-price'>
                                            <h4>{item.name}</h4>
                                            <p>R$ {item.price.toFixed(2)}</p>
                                        </div>
                                        <div className="quantity-controls">
                                            <ion-icon name="add-outline" onClick={() => updateCartItem(item.id, item.quantity + 1)}></ion-icon>
                                            <span>{item.quantity}</span>
                                            <ion-icon name="remove-outline" onClick={() => updateCartItem(item.id, item.quantity - 1)}></ion-icon>

                                        </div>
                                    </div>
                                    <div className='cart-remove'>
                                        <ion-icon name="trash-outline" onClick={() => removeCartItem(item.id)}></ion-icon>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="cart-summary">
                            <h3>Total: R$ {calculateTotal()}</h3>
                        </div>
                        <div className="cart-actions">
                            <button onClick={handleCloseModal}>Continue Shopping</button>
                            <button onClick={handleSaveCart}>To Buy</button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='cart-empty'>
                            <p>Your cart is empty!</p>
                            <ion-icon name="close-outline" onClick={handleCloseModal}></ion-icon>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default ModalShopCart;
