import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import './Home.css';
import MoviesList from '../Components/MovieList';


function Home() {
    const [isVisible, setVisible] = useState(false);
  
    const toggleVisible = () => {
      setVisible((prevState) => !prevState);
    };
  
    return (
      <div className="home">
        {!isVisible && <Navbar onToggleVisible={toggleVisible} />}
        {isVisible && <Sidebar onToggleVisible={toggleVisible} />}
        <div>
            <MoviesList />
        </div>
      </div>
    );
  }

export default Home;
