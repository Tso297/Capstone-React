import React from 'react';
import { useCart } from './CartContext';
import './Checkout.css';

const Checkout = () => {
  const { cart, updateCartItemQuantity, removeFromCart } = useCart();
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + item.totalPrice * item.quantity, 0);

  const handleQuantityChange = (itemId, newQuantity) => {
    updateCartItemQuantity(itemId, parseInt(newQuantity, 10));
  };

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  return (
    <div className="checkout-container">
      <div className="checkout-content">
        <h1 className='title'>View Your Seasonalities</h1>
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="checkout-item">
              <div className="item-details">
                <span className='ingredient-name'>{item.name}</span>
                <div>
                  <span className='ingredient-quantity'>Quantity:</span>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  className='ingredient-quantity-box'/>
                </div>
                <div>
                  <span className='price'>Total Price:</span>
                  <span className='number_price'>${(item.totalPrice * item.quantity).toFixed(2)}</span>
                </div>
                {item.ingredients && item.ingredients.length > 0 && (
  <div>
    <h6 className='ingredients-label'>Ingredients:</h6>
    <ul className="ingredients-list">
      {item.ingredients.map((ingredient, idx) => (
        <li key={idx} className="ingredient">
          {ingredient.name} - {ingredient.percentage}%
        </li>
      ))}
    </ul>
  </div>
)}
              </div>
              <button className="remove-button" onClick={() => handleRemoveItem(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
        <div className="checkout-summary">
          <p className='checkout-tags'>Total Items: {totalItems}</p>
          <button className="checkout-button">Checkout</button>
          <p className='checkout-tags'>Total Price: ${totalPrice.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;