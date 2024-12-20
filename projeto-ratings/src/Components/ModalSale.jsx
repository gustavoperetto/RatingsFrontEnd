import React, { useEffect, useState } from 'react';
import './ModalSale.css';
import axios from 'axios';
import Confirmation from './Confirmation';

function ModalSale({ show, onClose, onNotify }) {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productNewPrice, setProductNewPrice] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);

    // Get the products list
    useEffect(() => {
        if (show) {
            axios.get('http://localhost:8080/products')
                .then(res => {
                    setProducts(res.data);
                })
                .catch(err => console.error('Error loading products:', err));
        } else {
            setSelectedProduct(null);
            setProductNewPrice('');
        }
    }, [show]);

    // State reset
    useEffect(() => {
        if (!show) {
            setSelectedProduct(null);
            setProductNewPrice('');
            setShowConfirmation(false);
            setProductToEdit(null);
        }
    }, [show]);

    // Product Change on select
    const handleProductChange = (event) => {
        const productId = event.target.value;
        const product = products.find(p => p.id.toString() === productId);
        setSelectedProduct(product);
        setProductNewPrice('');
    };

    // Validation
    const handleNewPriceChange = (event) => {
        const value = parseFloat(event.target.value);
        if (value > 0 && value < selectedProduct?.price) {
            setProductNewPrice(event.target.value);
        } else if (event.target.value === '') {
            setProductNewPrice('');
        }
    };

    const handleSubmit = async (event) => {
        if (event) {
            event.preventDefault();
        }
    
        if (!selectedProduct || !productNewPrice) {
            onNotify('Please select a product and enter a new price.', 'error');
            onClose();
            return;
        }
    
        const newPrice = parseFloat(productNewPrice);
        if (newPrice >= selectedProduct.price) {
            onNotify('The new price must be lower than the original price.', 'error');
            onClose();
            return;
        }
    
        const token = localStorage.getItem('authToken');
    
        if (!token) {
            onNotify('No permission to do this operation, contact your administrator!', 'error');
            return;
        }
    
        try {
            await axios.put(`http://localhost:8080/products/sale/${selectedProduct.id}`, { price: newPrice }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const response = await axios.get('http://localhost:8080/products');
            const allProducts = response.data;
            const productsUpdatedEvent = new CustomEvent('productsUpdated', {
                detail: { updatedProducts: allProducts }
            });
            window.dispatchEvent(productsUpdatedEvent);
            onNotify('New price updated successfully', 'success');
            onClose();
        } catch (error) {
            onNotify('Error updating the price.', 'error');
            console.error('Error:', error);
            onClose();
        }
    };
    
    const handleConfirm = () => {
        if (productToEdit) {
            handleSubmit();
        }
        setShowConfirmation(false);
    };

    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay-sale">
            <div className="modal">
                <h2>Sale Manager</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Products:
                        {products.length > 0 ? (
                            <select
                                value={selectedProduct?.id || ''}
                                onChange={handleProductChange}
                                required
                            >
                                <option value="" disabled>Select a product</option>
                                {products.map(product => (
                                    <option key={product.id} value={product.id}>
                                        {product.name}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <p>Loading products...</p>
                        )}
                    </label>
                    {selectedProduct && (
                        <label>
                            Price:
                            <div>
                                <span style={{ textDecoration: productNewPrice ? 'line-through' : 'none' }}>
                                    ${selectedProduct.price.toFixed(2)}
                                </span>
                                {productNewPrice && (
                                    <span style={{ marginLeft: '10px', color: 'green' }}>
                                        ${parseFloat(productNewPrice).toFixed(2)}
                                    </span>
                                )}
                            </div>
                        </label>
                    )}
                    <label>
                        New Price:
                        <input
                            type="number"
                            value={productNewPrice}
                            onChange={handleNewPriceChange}
                            required
                        />
                    </label>
                    <div className="modal-buttons">
                        <button type="button" onClick={onClose}>Cancel</button>
                        <button type="button" onClick={() => {
                            setProductToEdit(selectedProduct)
                            setShowConfirmation(true)
                        }}
                            disabled={!selectedProduct || !productNewPrice}
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
            {showConfirmation && (
                <Confirmation message={`Do you really want to apply a discount of R$ ${(selectedProduct.price - parseFloat(productNewPrice)).toFixed(2)}?`}
                    onConfirm={handleConfirm}
                    onClose={() => {
                        setShowConfirmation(false)
                        setProductToEdit(null)
                    }} />
            )}
        </div>
    );
}

export default ModalSale;
