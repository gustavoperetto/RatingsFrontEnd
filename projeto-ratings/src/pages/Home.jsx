import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import './Home.css';
import ProductsList from '../Components/ProductsList';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';


function Home() {
  const [isVisible, setVisible] = useState(false);

  const toggleVisible = () => {
    setVisible((prevState) => !prevState);
  };

  return (
    <>
      <div className="home">
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
        <div>
          {!isVisible && <Navbar onToggleVisible={toggleVisible} />}
          {isVisible && <Sidebar onToggleVisible={toggleVisible} />}
        </div >
        <div className='products-grid-root'>
          <ProductsList />
        </div>
        <div className='home-footer'>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Home;
