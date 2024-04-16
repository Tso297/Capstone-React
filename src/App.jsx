import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import Ingredients from './Ingredients';
import BlendMix, { CartModal } from './Blend';
import AuthChecker from './auth/AuthChecker';
import Checkout from './Checkout';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, Providers } from './firebase';
import { CartProvider } from './CartContext';

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart(cart => [...cart, item]);
  };

  const signOutOnClick = () => {
    signOut(auth);
    window.location.reload();
  };

  const signInOnClick = async () => {
    await signInWithPopup(auth, Providers.google);
  };

  return (
    <CartProvider>
    <BrowserRouter>
      <div className="App">
        <Navbar cart={cart} signOutOnClick={signOutOnClick} signInOnClick={signInOnClick} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/ingredients" element={<Ingredients />} />
          <Route path="/blend" element={<BlendMix cart={cart} setCart={setCart} addToCart={addToCart} />} />
          <Route path="/checkout" element={<AuthChecker><Checkout /></AuthChecker>} />
        </Routes>
      </div>
    </BrowserRouter>
    </CartProvider>
  );
}

export default App;