import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css';

function ProductList({ setCurrentPage }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [addedToCart, setAddedToCart] = useState({});

  // Calculate total number of items for the cart icon
  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://images.unsplash.com/photo-1599593915535-133a1059f776?w=300", description: "Produces oxygen at night", cost: "$15" },
        { name: "Spider Plant", image: "https://images.unsplash.com/photo-1572688484438-313f08f0c238?w=300", description: "Great for beginners", cost: "$12" },
        { name: "Peace Lily", image: "https://images.unsplash.com/photo-1593482892290-f596e388d01d?w=300", description: "Beautiful white blooms", cost: "$18" },
        { name: "Boston Fern", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=300", description: "Adds lush green texture", cost: "$14" },
        { name: "Rubber Plant", image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=300", description: "Shiny dark leaves", cost: "$22" },
        { name: "Aloe Vera", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=300", description: "Healing properties", cost: "$10" }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?w=300", description: "Calming scent", cost: "$20" },
        { name: "Jasmine", image: "https://images.unsplash.com/photo-1592722253381-a533d7d854d9?w=300", description: "Sweet evening fragrance", cost: "$25" },
        { name: "Rosemary", image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=300", description: "Herbal and woody aroma", cost: "$14" },
        { name: "Mint", image: "https://images.unsplash.com/photo-1628556270448-4d6d6d4d4447?w=300", description: "Refreshing fragrance", cost: "$8" },
        { name: "Lemon Balm", image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=300", description: "Citrusy scent", cost: "$12" },
        { name: "Eucalyptus", image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=300", description: "Refreshing clear scent", cost: "$30" }
      ]
    },
    {
      category: "Insect Repellent Plants",
      plants: [
        { name: "Marigold", image: "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=300", description: "Keeps pests away", cost: "$10" },
        { name: "Basil", image: "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=300", description: "Repels flies and mosquitoes", cost: "$9" },
        { name: "Citronella Grass", image: "https://images.unsplash.com/photo-1584583561816-39c4597b692a?w=300", description: "Natural mosquito repellent", cost: "$16" },
        { name: "Catnip", image: "https://images.unsplash.com/photo-1533649669539-72c694665f8a?w=300", description: "Deters bugs", cost: "$11" },
        { name: "Geraniums", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=300", description: "Pleasant pest deterrent", cost: "$15" },
        { name: "Floss Flower", image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=300", description: "Deters garden pests", cost: "$13" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prevState) => ({
      ...prevState,
      [plant.name]: true,
    }));
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo" onClick={() => setCurrentPage('landing')}>Paradise Nursery</div>
        <div className="navbar-links">
          <span onClick={() => setCurrentPage('landing')}>Home</span>
          <span onClick={() => setCurrentPage('products')}>Plants</span>
          <span onClick={() => setCurrentPage('cart')} className="cart-link">
            🛒 Cart ({totalCartItems})
          </span>
        </div>
      </nav>

      {/* Product Grid */}
      <div className="product-grid-container">
        <h2>Our Houseplants</h2>
        {plantsArray.map((category, index) => (
          <div key={index} className="category-section">
            <h3>{category.category}</h3>
            <div className="plant-list">
              {category.plants.map((plant, plantIndex) => (
                <div key={plantIndex} className="plant-card">
                  <img src={plant.image} alt={plant.name} className="plant-image" />
                  <h4>{plant.name}</h4>
                  <p>{plant.description}</p>
                  <p className="plant-price">{plant.cost}</p>
                  <button
                    className={`add-to-cart-btn ${addedToCart[plant.name] ? 'added' : ''}`}
                    onClick={() => handleAddToCart(plant)}
                    disabled={addedToCart[plant.name]}
                  >
                    {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;