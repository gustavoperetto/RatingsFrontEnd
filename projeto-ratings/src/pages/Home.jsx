import React, { useState, useEffect } from 'react';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import ModalProduct from '../Components/ModalProduct';
import ModalCategory from '../Components/ModalCategory';
import ModalSale from '../Components/ModalSale';
import ModalEditProduct from '../Components/ModalEditProduct';
import ModalShopCart from '../Components/ModalShopCart';
import ModalLogin from '../Components/ModalLogin';
import Notification from '../Components/Notification';
import './Home.css';
import ProductsList from '../Components/ProductsList';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Scrollbar, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import axios from 'axios';

function Home() {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [isNavbarVisible, setNavbarVisible] = useState(true);
  const [isAnimatingOut, setAnimatingOut] = useState(false);
  const [products, setProducts] = useState([]);
  const [showModalProduct, setShowModalProduct] = useState(false);
  const [showModalCategory, setShowModalCategory] = useState(false);
  const [showModalSale, setShowModalSale] = useState(false);
  const [showModalEditProduct, setShowModalEditProduct] = useState(false);
  const [showModalShopCart, setShowModalShopCart] = useState(false);
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [query, setQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);

  useEffect(function () {
    axios.get('http://localhost:8080/products')
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
  }, []);

  const updateCartItems = (newCartItems) => {
    setCartItems(newCartItems);
    localStorage.setItem('cart', JSON.stringify(newCartItems));
  };

  const isAnyModalOpen =
    showModalProduct ||
    showModalCategory ||
    showModalSale ||
    showModalEditProduct ||
    showModalShopCart;

  useEffect(() => {
    if (isAnyModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isAnyModalOpen]);

  const handleToggle = (target) => {
    if (target === "sidebar" && isNavbarVisible) {
      setAnimatingOut(true);
      setTimeout(() => {
        setNavbarVisible(false);
        setSidebarVisible(true);
        setAnimatingOut(false);
      }, 500);
    } else if (target === "navbar" && isSidebarVisible) {
      setAnimatingOut(true);
      setTimeout(() => {
        setSidebarVisible(false);
        setNavbarVisible(true);
        setAnimatingOut(false);
      }, 500);
    }
  };

  const updateProducts = (updatedProductList) => {
    setProducts(updatedProductList);
  };

  const showNotification = (message, type = 'success') => {
    const newNotification = {
      id: new Date().getTime(),
      message, type
    };
    setNotifications((prevNotifications) =>
      [...prevNotifications, newNotification]);
    setTimeout(() => {
      setNotifications((prevNotifications) =>
        prevNotifications.filter((n) => n.id !== newNotification.id));
    }, 3000);
  };

  const handleCloseNotification = () => {
    setNotification({ message: '', type: '' });
  };

  //Open Modals
  const handleOpenProductClick = () => {
    setShowModalProduct(true);
  };

  const handleOpenCategoryClick = () => {
    setShowModalCategory(true);
  };

  const handleOpenSaleClick = () => {
    setShowModalSale(true);
  };

  const handleOpenEditProductClick = (product) => {
    setProductToEdit(product);
    setShowModalEditProduct(true);
  };

  const handleOpenShopCartClick = () => {
    setShowModalShopCart(true);
  };

  const handleOpenLoginClick = () => {
    setShowModalLogin(true);
  };

  //Close Modals
  const handleCloseModalProduct = () => {
    setShowModalProduct(false);
  };

  const handleCloseModalCategory = () => {
    setShowModalCategory(false);
  };

  const handleCloseModalSale = () => {
    setShowModalSale(false);
  };

  const handleCloseModalShopCart = () => {
    setShowModalShopCart(false);
  };

  const handleCloseModalEditProduct = () => {
    setShowModalEditProduct(false);
  };

  const handleCloseModalLogin = () => {
    setShowModalLogin(false);
  };

  return (
    <>
      <div className="home">
        <div>
          {isNavbarVisible && (<Navbar
            onToggleVisible={() => handleToggle("sidebar")}
            onShopCart={handleOpenShopCartClick}
            className={isAnimatingOut ? "animating-out" : ""}
            cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          />)}
          {isSidebarVisible && (<Sidebar
            onToggleVisible={() => handleToggle("navbar")}
            onAddProduct={handleOpenProductClick}
            onAddCategory={handleOpenCategoryClick}
            onAddSale={handleOpenSaleClick}
            className={isAnimatingOut ? "animating-out" : ""}
          />)}
        </div >
        <div className='home-carousel'>
          <span className='home-title'>Ratings</span>
          <Swiper
            modules={[Pagination, Scrollbar, Autoplay]}
            spaceBetween={10}
            slidesPerView={1}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            autoplay={{
              delay: 3500, disableOnInteraction: false
            }}
          >
            <SwiperSlide><img src="slide-1.png" className='slide-1' /></SwiperSlide>
            <SwiperSlide><img src="slide-2.png" className='slide-1' /></SwiperSlide>
            <SwiperSlide><img src="slide-3.png" className='slide-1' /></SwiperSlide>
            <SwiperSlide><img src="slide-4.png" className='slide-1' /></SwiperSlide>
          </Swiper>
        </div>
        <div className='home-navbar'>
          <h2>Products</h2>
          <form>
            <label>
              <input type="text" onChange={e => setQuery(e.target.value)} placeholder="Search for a product" />
            </label>
          </form>
        </div>
        <div className='products-grid-root'>
          <ProductsList query={query} onEditProduct={handleOpenEditProductClick} products={products} setProducts={updateProducts} onNotify={showNotification} />
        </div>
        <div className='home-footer'>
          <Footer />
        </div>
        <div className="notification-wrapper">
          {notifications.map((notification) => (
            <Notification key={notification.id} message={notification.message} type={notification.type} onClose={() =>
              setNotifications((prevNotifications) => prevNotifications.filter((n) => n.id !== notification.id))} 
              />))}
        </div>
        <ModalProduct show={showModalProduct} onClose={handleCloseModalProduct} onNotify={showNotification} products={products} setProducts={updateProducts}/>
        <ModalCategory show={showModalCategory} onClose={handleCloseModalCategory} onNotify={showNotification} />
        <ModalSale show={showModalSale} onClose={handleCloseModalSale} onNotify={showNotification} />
        <ModalEditProduct show={showModalEditProduct} onClose={handleCloseModalEditProduct} product={productToEdit} onNotify={showNotification} />
        <ModalShopCart show={showModalShopCart} onClose={handleCloseModalShopCart} onNotify={showNotification} cartItems={cartItems} updateCartItems={updateCartItems} />
        <ModalLogin show={showModalLogin} onClose={handleCloseModalLogin} onNotify={showNotification} />
      </div>
    </>
  );
}

export default Home;
