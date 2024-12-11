import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductsList.css';

function ProductsList({ query, onEditProduct }) {

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(function () {
    axios.get('http://localhost:8080/products')
      .then(res => {
        setProducts(res.data);
        setFilteredProducts(res.data);
      })
      .catch(err => console.log(err));
  }, []);

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
      alert('Successfully deleted');
    } catch (error) {
      alert('Eror deleting product');
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
              <div className='products-grid-image'>
                {/* <img src="favorito.png" alt="favorite" className='item-icon' /> */}
                <img src="apagar.png" alt="delete" className='item-icon-delete' onClick={() => handleDelete(product.id)} />
                <img src="editar.png" alt="edit" className='item-icon-edit' onClick={() => onEditProduct(product)} />
                <img src={`http://localhost:8080/products/product-images/${product.id}`} alt={product.name} className='product-image' />
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
