import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductsList.css';

function ProductsList() {

  const [products, setProducts] = useState([]);

  useEffect(function () {
    axios.get('http://localhost:8080/products')
      .then(res => setProducts(res.data))
      .catch(err => console.log(err))
  }, [])

  const handleDelete = async (productId) => {
    if (isNaN(productId)) {
      console.error('Invalid product ID');
      return;
    } try {
      await axios.delete(`http://localhost:8080/products/${productId}`);
      setProducts(products.filter(product => product.id !== productId));
      alert('Successfully deleted');
    } catch (error) {
      alert('Eror deleting product');
    }
  }

  return (
    <>
      {products.length === 0 &&
        <div className='products-grid-loading'>
          <span>
            Loading...
          </span>
        </div>}
      {products.length > 0 &&
        <div className='products-grid'>
          {products.map(product =>
            <div className='products-grid-item' key={product.id}>
              <div className='products-grid-image'>
                {/* <img src="favorito.png" alt="favorite" className='item-icon' /> */}
                <img src="apagar.png" alt="delete" className='item-icon' onClick={() => handleDelete(product.id)} />
                <img src="editar.png" alt="edit" className='item-icon' />
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
