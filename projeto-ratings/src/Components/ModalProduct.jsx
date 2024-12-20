import React, { useEffect, useState } from 'react';
import './ModalProduct.css';
import axios from 'axios';

function ModalProduct({ show, onClose, onNotify, products, setProducts }) {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productStock, setProductStock] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [productImage, setProductImage] = useState(null);

  useEffect(() => {
    if (show) {
      axios.get('http://localhost:8080/categories')
        .then(res => {
          setCategories(res.data);
        })
        .catch(err => console.error('Error loading categories:', err));
    } else {
      setProductName('');
      setProductDescription('');
      setProductPrice('');
      setProductStock('');
      setSelectedCategory('');
      setProductImage(null);
    }
  }, [show]);

  const handleImageChange = (event) => {
    setProductImage(event.target.files[0]);
  };

  const handleCategoryChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newProduct = {
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
      const productResponse = await axios.post(
        'http://localhost:8080/products',
        newProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const addedProduct = productResponse.data;

      if (productImage && addedProduct.id) {
        const formData = new FormData();
        formData.append('file', productImage);
        formData.append('productId', addedProduct.id);
        await axios.post('http://localhost:8080/products/product-images', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
      }

      const updatedProducts = [...products, addedProduct];
      setProducts(updatedProducts);
      const productsUpdatedEvent = new CustomEvent('productsUpdated', {
        detail: { updatedProducts },
      });
      window.dispatchEvent(productsUpdatedEvent);

      onNotify('Product added successfully', 'success');
      onClose();
    } catch (error) {
      onNotify('Error adding product.', 'error');
      console.error('Error:', error);
      onClose();
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay-product">
      <div className="modal">
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name of the product:
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
              onChange={handleCategoryChange}
              required
            >
              <option value="" disabled>Select a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Image:
            <input
              type="file"
              onChange={handleImageChange}
            />
          </label>
          <div className="modal-buttons">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalProduct;
