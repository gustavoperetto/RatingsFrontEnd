import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductsList.css';

function ProductsList({ query, onEditProduct, products, setProducts, onNotify, userRole }) {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const shouldShowPagination = totalPages > 1 && !query;

  useEffect(() => {
    if (query) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [query, products]);

  useEffect(() => {
    const handleProductsUpdate = (event) => {
      const updatedProducts = event.detail.updatedProducts || [];
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
    };

    window.addEventListener('productsUpdated', handleProductsUpdate);

    return () => {
      window.removeEventListener('productsUpdated', handleProductsUpdate);
    };
  }, [setProducts]);


  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleAddToCart = (product) => {
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = currentCart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      currentCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(currentCart));

    const cartUpdatedEvent = new CustomEvent('cartUpdated');
    window.dispatchEvent(cartUpdatedEvent);

    onNotify('Item added to cart!', 'success');
  };

  const handleDelete = async (productId) => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      onNotify('No permission to do this operation, contact your administrator!', 'error');
      return;
    }

    if (isNaN(productId)) {
      console.error('Invalid product ID');
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedProducts = products.filter(product => product.id !== productId);
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);

      const productsUpdatedEvent = new CustomEvent('productsUpdated', {
        detail: { updatedProducts }
      });
      window.dispatchEvent(productsUpdatedEvent);
      onNotify('Successfully deleted', 'success');
    } catch (error) {
      onNotify('Error deleting product.', 'error');
      console.error('Error:', error);
    }
  };

  return (
    <>
      {filteredProducts.length === 0 &&
        <div className='products-grid-loading'>
          <div className='loading-spinner'></div>
        </div>}
      {filteredProducts.length > 0 &&
        <>
          <div className='products-grid'>
            {paginatedProducts.map(product => (
              <div className='products-grid-item' key={product.id}>
                <div className='products-grid-item-hover'>
                  {userRole === 'ADMIN' && (
                    <>
                      <ion-icon name="trash-outline" onClick={() => handleDelete(product.id)}></ion-icon>
                      <ion-icon name="pencil-outline" onClick={() => onEditProduct(product)}></ion-icon>
                    </>
                  )}
                  <ion-icon name="cart-outline" onClick={() => handleAddToCart(product)}></ion-icon>
                </div>
                <div className='products-grid-image'>
                  <img src={`http://localhost:8080/products/product-images/${product.id}?t=${Date.now()}`} alt={product.name} className='product-image' />
                  {userRole === 'ADMIN' && (
                    <>
                      <ion-icon name="trash-outline" onClick={() => handleDelete(product.id)}></ion-icon>
                      <ion-icon name="pencil-outline" onClick={() => onEditProduct(product)}></ion-icon>
                    </>
                  )}
                  <ion-icon name="cart-outline" onClick={() => handleAddToCart(product)}></ion-icon>
                </div>
                <h4>{product.name}</h4>
                <span>R$ {product.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
          {shouldShowPagination && (
            <div className="pagination-controls">
              <button onClick={handlePreviousPage} disabled={currentPage === 1}>Before</button>
              <span>Page {currentPage} of {totalPages}</span>
              <button onClick={handleNextPage} disabled={currentPage === totalPages}>After</button>
            </div>
          )}
        </>}
    </>
  );
}

export default ProductsList;
