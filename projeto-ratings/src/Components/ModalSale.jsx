import React, { useEffect, useState } from 'react';
import './ModalSale.css';
import axios from 'axios';

function ModalSale({ show, onClose }) {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productNewPrice, setProductNewPrice] = useState('');

    useEffect(() => {
        if (show) {
            axios.get('http://localhost:8080/products')
                .then(res => {
                    setProducts(res.data);
                })
                .catch(err => console.error('Error loading products:', err));
        }
    }, [show]);

    const handleProductChange = (event) => {
        const productId = event.target.value;
        const product = products.find(p => p.id.toString() === productId);
        setSelectedProduct(product);
        setProductNewPrice('');
    };

    const handleNewPriceChange = (event) => {
        setProductNewPrice(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedProduct || !productNewPrice) {
            alert('Please select a product and enter a new price.');
            return;
        }

        try {
            await axios.put(`http://localhost:8080/products/sale/${selectedProduct.id}`, { price: parseFloat(productNewPrice) }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            alert('New price updated successfully');
            onClose();
            window.location.reload();
        } catch (e) {
            alert('Error updating the price: ' + e.message);
        }
    };

    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Sale Manager</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Products:
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
                        <button type="submit">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalSale;
