import React, { useState, useEffect } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, Providers } from './firebase';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from './CartContext'; // Ensure this is imported correctly

const Navbar = () => {
  const [user, setUser] = useState(null);
  const { cart } = useCart(); // Access cart from context
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + item.totalPrice * item.quantity, 0).toFixed(2);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe(); // Proper cleanup on component unmount
  }, []);

  const signOutOnClick = () => {
    signOut(auth).then(() => window.location.reload());
  };

  const signInOnClick = async () => {
    const response = await signInWithPopup(auth, Providers.google);
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
              <Link className="nav-link" to="/blend" style={{  marginRight: '1.75rem',fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>Make a Seasonality!</Link>
            </li>
          </ul>
          <Link to="/" className="navbar-brand" style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#fff', marginLeft: '15rem' , fontFamily: 'Dancing Script, cursive' }}>Seasonality</Link>
          
          {user && ( // Only display cart link if user is logged in
            <Link to="/checkout" className="nav-link" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginLeft: '35rem' }}>
              <FaShoppingCart style={{ marginRight: '5px' }} />
              <span>{totalItems} - ${totalPrice}</span>
            </Link>
          )}
          {!user ? (
            <button onClick={signInOnClick} style={{ color: 'black', marginLeft: '46rem' }}>
              Sign In
            </button>
          ) : (
            <button onClick={signOutOnClick} style={{ color: 'black' }}>
              Sign Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;