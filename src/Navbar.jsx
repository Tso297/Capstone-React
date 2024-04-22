import React, { useState, useEffect } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, Providers } from './firebase';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart, useCartDetails } from './CartContext';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const { addToCart, cart, fetchCart } = useCart();
  const { totalQuantity, totalPrice } = useCartDetails();
  //const totalPrice = Array.isArray(cart) ? cart.reduce((total, item) => total + (item.totalPrice * item.quantity), 0) : 0;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        fetchCart(); // Call fetchCart when the user logs in
      }
    });
    return () => unsubscribe();
  }, []);

  const signOutOnClick = () => {
    signOut(auth).then(() => window.location.reload());
  };

  const signInOnClick = async () => {
    const response = await signInWithPopup(auth, Providers.google);
    if (response.user) {
      fetchCart();  // Optionally fetch the cart right after signing in
    }
  };

  const handleAddTestItem = () => {
    const testItem = { id: 'test1', name: 'Test Product', quantity: 1, totalPrice: 10.00 };
    addToCart(testItem);
};

  const buttonStyle = {
    color: 'black',
    marginLeft: 'auto',
    padding: '8px 16px',
    fontSize: '1rem',
    backgroundColor: 'white',
    border: 'none',
    cursor: 'pointer'
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container-fluid d-flex justify-content-center">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ingredients" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>Ingredients</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/blend" style={{ marginRight: '1.75rem', fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>Make a Seasonality!</Link>
            </li>
          </ul>
          <button onClick={handleAddTestItem}>Add Test Item</button>
          <Link to="/" className="navbar-brand" style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#fff', marginLeft: '16rem', fontFamily: 'Dancing Script, cursive' }}>Seasonality</Link>
          
          {user ? (
            <div className="nav-item" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', display: 'flex', alignItems: 'center', marginLeft: '9rem' }}>
              <span>Welcome, {user.displayName || 'User'}!</span>
              <Link to="/checkout" className="nav-link" style={{ marginLeft: '10px' }}>
                <FaShoppingCart style={{ marginRight: '15px', marginLeft: '8rem' }} />
                <span>{totalQuantity} - ${totalPrice}</span>
              </Link>
              <button onClick={signOutOnClick} style={buttonStyle}>
                Sign Out
              </button>
            </div>
          ) : (
            <button onClick={signInOnClick} style={buttonStyle}>
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;