import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import ModalProduct from '../Components/ModalProduct';
import ModalCategory from '../Components/ModalCategory';
import ModalSale from '../Components/ModalSale';
import ModalEditProduct from '../Components/ModalEditProduct';
import './Home.css';
import ProductsList from '../Components/ProductsList';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

function Home() {
  const [isVisible, setVisible] = useState(false);
  const [showModalProduct, setShowModalProduct] = useState(false);
  const [showModalCategory, setShowModalCategory] = useState(false);
  const [showModalSale, setShowModalSale] = useState(false);
  const [showModalEditProduct, setShowModalEditProduct] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [query, setQuery] = useState('');

  const toggleVisible = () => {
    setVisible((prevState) => !prevState);
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

  const handleCloseModalEditProduct = () => {
    setShowModalEditProduct(false);
  };

  return (
    <>
      <div className="home">
        <div>
          {!isVisible && <Navbar onToggleVisible={toggleVisible} />}
          {isVisible && <Sidebar
            onToggleVisible={toggleVisible}
            onAddProduct={handleOpenProductClick}
            onAddCategory={handleOpenCategoryClick}
            onAddSale={handleOpenSaleClick}
            />}
        </div >
        <div className='home-carousel'>
          <span className='home-title'>Ratings</span>
          <Swiper
            modules={[Pagination, Scrollbar]}
            spaceBetween={10}
            slidesPerView={1}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
          >
            <SwiperSlide><img src="slide-1.png" className='slide-1' /></SwiperSlide>
            <SwiperSlide><img src="slide-2.png" className='slide-1' /></SwiperSlide>
            <SwiperSlide><img src="slide-3.png" className='slide-1' /></SwiperSlide>
            <SwiperSlide><img src="slide-4.png" className='slide-1' /></SwiperSlide>
          </Swiper>
        </div>
        <div className='home-navbar'>
          <h2>Produtos</h2>
          <form>
            <label>
              <input type="text" onChange={e => setQuery(e.target.value)} placeholder="Search for a product" />
            </label>
          </form>
        </div>
        <div className='products-grid-root'>
          <ProductsList query={query} onEditProduct={handleOpenEditProductClick}/>
        </div>
        <div className='home-footer'>
          <Footer />
        </div>
        <ModalProduct show={showModalProduct} onClose={handleCloseModalProduct} />
        <ModalCategory show={showModalCategory} onClose={handleCloseModalCategory} />
        <ModalSale show={showModalSale} onClose={handleCloseModalSale} />
        <ModalEditProduct show={showModalEditProduct} onClose={handleCloseModalEditProduct} product={productToEdit}/>
      </div>
    </>
  );
}

export default Home;
