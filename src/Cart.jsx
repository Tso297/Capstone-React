import React, { useState } from 'react';

const Cart = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const checkout = () => {
    // Send cart contents to Stripe for payment
    // Then, send the cart contents to your Flask API
    fetch('YOUR_STRIPE_CHECKOUT_ENDPOINT', {
      method: 'POST',
      body: JSON.stringify({ cart }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        // Reset the cart
        setCart([]);
      }
    });
  };

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.name} - ${item.price}
            <button onClick={() => removeFromCart(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={checkout}>Checkout</button>
    </div>
  );
};

export default Cart;