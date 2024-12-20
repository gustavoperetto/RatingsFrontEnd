import React, { useEffect, useState } from 'react';
import './ModalEditProduct.css';
import axios from 'axios';
import Confirmation from './Confirmation';

function ModalEditProduct({ show, onClose, product, onNotify }) {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productStock, setProductStock] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (product) {
      setProductName(product.name || '');
      setProductDescription(product.description || '');
      setProductPrice(product.price || '');
      setProductStock(product.stockQuantity || '');
      setSelectedCategory(product.categoryId || '');
    }
  }, [product]);

  useEffect(() => {
    if (show) {
      axios
        .get('http://localhost:8080/categories')
        .then((res) => setCategories(res.data))
        .catch((err) => console.error('Error loading categories:', err));
    }
  }, [show]);

  const handleSubmit = async () => {
    const updatedProduct = {
      id: product.id,
      name: productName,
      description: productDescription,
      price: parseFloat(productPrice),
      stockQuantity: parseInt(productStock, 10),
      categoryId: selectedCategory,
    };

    const token = localStorage.getItem('authToken');
    if (!token) {
      onNotify('No permission to do this operation, contact your administrator!', 'error');
      return;
    }

    try {
      await axios.put(`http://localhost:8080/products/${product.id}`, updatedProduct, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const response = await axios.get('http://localhost:8080/products');
      const allProducts = response.data;
      const productsUpdatedEvent = new CustomEvent('productsUpdated', {
        detail: { updatedProducts: allProducts },
      });
      window.dispatchEvent(productsUpdatedEvent);
      onNotify('Product updated successfully', 'success');
      onClose();
    } catch (error) {
      onNotify('Error updating the product.', 'error');
      console.error('Error:', error);
    }
  };

  const handleConfirm = () => {
    setShowConfirmation(false);
    handleSubmit();
  };

  if (!show) return null;

  return (
    <div className="modal-overlay-EditProduct">
      <div className="modal">
        <h2>Edit Product</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <label>
            Name:
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              required
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              required
            />
          </label>
          <label>
            Quantity:
            <input
              type="number"
              value={productStock}
              onChange={(e) => setProductStock(e.target.value)}
              required
            />
          </label>
          <label>
            Category:
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <div className="modal-buttons">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="button" onClick={() => setShowConfirmation(true)}>
              Save
            </button>
          </div>
        </form>
      </div>
      {showConfirmation && (
        <Confirmation message="Do you really want to update this product?" onConfirm={handleConfirm} onClose={() => setShowConfirmation(false)} />
      )}
    </div>
  );
}

export default ModalEditProduct;
