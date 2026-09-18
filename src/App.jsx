import React, { useState } from 'react';
import './App.css';
import AboutUs from './AboutUs';
import ProductList from './ProductList';
import CartItem from './CartItem';

function App() {
  const [showProductList, setShowProductList] = useState(false);
  const [currentPage, setCurrentPage] = useState('landing'); // 'landing', 'products', 'cart'

  const handleGetStartedClick = () => {
    setShowProductList(true);
    setCurrentPage('products');
  };

  return (
    <div className="app">
      {currentPage === 'landing' && (
        <div className="landing-page">
          <div className="landing-content">
            <h1>Paradise Nursery</h1>
            <p>Where Green Meets Serenity</p>
            <AboutUs />
            <button className="get-started-button" onClick={handleGetStartedClick}>
              Get Started
            </button>
          </div>
        </div>
      )}

      {currentPage === 'products' && (
        <ProductList setCurrentPage={setCurrentPage} />
      )}

      {currentPage === 'cart' && (
        <CartItem setCurrentPage={setCurrentPage} />
      )}
    </div>
  );
}

export default App;