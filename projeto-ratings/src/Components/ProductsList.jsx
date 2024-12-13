import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductsList.css';

function ProductsList({ query, onEditProduct, products, setProducts, onNotify }) {

  const [filteredProducts, setFilteredProducts] = useState([]);
  
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

  const handleDelete = async (productId) => {
    if (isNaN(productId)) {
      console.error('Invalid product ID');
      return;
    } try {
      await axios.delete(`http://localhost:8080/products/${productId}`);
      const updatedProducts = products.filter(product => product.id !== productId);
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
      onNotify('Successfully deleted', 'success');
    } catch (error) {
      onNotify('Error deleting product.', 'error');
      console.error('Error:', error);
    }
  }

  return (
    <>
      {filteredProducts.length === 0 &&
        <div className='products-grid-loading'>
          <div className='loading-spinner'>
          </div>
        </div>}
      {filteredProducts.length > 0 &&
        <div className='products-grid'>
          {filteredProducts.map(product =>
            <div className='products-grid-item' key={product.id}>
              <div className='products-grid-item-hover'>
                <ion-icon name="trash-outline" onClick={() => handleDelete(product.id)}></ion-icon>
                <ion-icon name="pencil-outline" onClick={() => onEditProduct(product)}></ion-icon>
              </div>
              <div className='products-grid-image'>
                {/* <img src="favorito.png" alt="favorite" className='item-icon' /> */}
                <div className='products-grid-icon-admin'>
                  <ion-icon name="trash-outline" onClick={() => handleDelete(product.id)}></ion-icon>
                  <ion-icon name="pencil-outline" onClick={() => onEditProduct(product)}></ion-icon>
                </div>
                <img src={`http://localhost:8080/products/product-images/${product.id}?t=${Date.now()}`} alt={product.name} className='product-image' />
              </div>
              <h4>
                {product.name}
              </h4>
              <span>
                R$ {product.price.toFixed(2)}
              </span>
            </div>
          )}
        </div>}
    </>
  )
}

export default ProductsList;
