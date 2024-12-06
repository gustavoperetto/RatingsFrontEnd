'use client';

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

  return (
    <>
      {products.length === 0 && <div>Loading...</div>}
      {products.length > 0 &&
        <div className='products-grid'>
          {products.map(product =>
            <div className='products-grid-item' key={product.id}>
              <div className='products-grid-image'>
                <img src="favorito.png" alt="favorite" className='favorite_icon' />
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