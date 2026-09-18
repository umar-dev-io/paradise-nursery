import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ setCurrentPage }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total cost for all items in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const numericCost = parseFloat(item.cost.replace('$', ''));
      return total + numericCost * item.quantity;
    }, 0).toFixed(2);
  };

  // Calculate total cost for a specific item
  const calculateTotalCost = (item) => {
    const numericCost = parseFloat(item.cost.replace('$', ''));
    return (numericCost * item.quantity).toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckoutShopping = () => {
    alert('Coming Soon');
  };

  return (
    <div className="cart-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo" onClick={() => setCurrentPage('landing')}>Paradise Nursery</div>
        <div className="navbar-links">
          <span onClick={() => setCurrentPage('landing')}>Home</span>
          <span onClick={() => setCurrentPage('products')}>Plants</span>
          <span onClick={() => setCurrentPage('cart')}>🛒 Cart</span>
        </div>
      </nav>

      <h2>Total Shopping Cart</h2>
      <div className="cart-total-amount">Total Cart Amount: ${calculateTotalAmount()}</div>

      {cart.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h4>{item.name}</h4>
                <p>Unit Price: {item.cost}</p>
                <p>Total: ${calculateTotalCost(item)}</p>
                <div className="cart-item-quantity">
                  <button onClick={() => handleDecrement(item)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item)}>+</button>
                </div>
                <button className="delete-btn" onClick={() => handleRemove(item)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="cart-actions">
        <button className="get-started-button" onClick={() => setCurrentPage('products')}>
          Continue Shopping
        </button>
        <button className="checkout-button" onClick={handleCheckoutShopping}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;