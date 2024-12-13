import React, { useEffect, useState } from 'react';
import './ModalShopCart.css';
import axios from 'axios';

function ModalShopCart({ show, onClose, customerId }) {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (show) {
            fetchCartItems();
        }
    }, [show]);

    const fetchCartItems = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:8080/orders/${customerId}`);
            setCartItems(response.data.items);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching cart items:', error);
            setLoading(false);
        }
    };

    const handleUpdateQuantity = async (orderItemId, quantity) => {
        try {
            await axios.put(`http://localhost:8080/orders/${customerId}/items/${orderItemId}`, { quantity });
            fetchCartItems();
        } catch (error) {
            console.error('Error updating quantity:', error);
            onClose();
        }
    };

    const handleRemoveItem = async (orderItemId) => {
        try {
            await axios.delete(`http://localhost:8080/orders/${customerId}/items/${orderItemId}`);
            fetchCartItems();
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    const handleCheckout = async () => {
        try {
            await axios.post(`http://localhost:8080/orders/${customerId}/checkout`);
            alert('Purchase completed successfully!');
            onClose();
        } catch (error) {
            console.error('Error during checkout:', error);
        }
    };

    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Shopping Cart</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : cartItems.length > 0 ? (
                    <div>
                        <ul>
                            {cartItems.map(item => (
                                <li key={item.orderItemId} className="cart-item">
                                    <div>
                                        <strong>{item.productName}</strong>
                                        <p>Price: ${item.price.toFixed(2)}</p>
                                        <p>
                                            Quantity:
                                            <input
                                                type="number"
                                                min="1"
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    handleUpdateQuantity(item.orderItemId, parseInt(e.target.value, 10))
                                                }
                                            />
                                        </p>
                                    </div>
                                    <button onClick={() => handleRemoveItem(item.orderItemId)}>Remove</button>
                                </li>
                            ))}
                        </ul>
                        <div className="modal-footer">
                            <button onClick={onClose}>Close</button>
                            <button onClick={handleCheckout}>Checkout</button>
                        </div>
                    </div>
                ) : (
                    <p>Your cart is empty!</p>
                )}
            </div>
        </div>
    );
}

export default ModalShopCart;
