import React, { useState, useEffect } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, Providers } from './firebase';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';



const signOutOnClick = () => {
  signOut(auth);
  location.reload();
};

const signInOnClick = async () => {
  const response = await signInWithPopup(auth, Providers.google);
};

const Navbar = ({ cart }) => {
  const [user, setUser] = useState(null);
  const totalItems = cart.reduce((acc, blend) => acc + blend.quantity, 0);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);
  
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container-fluid d-flex justify-content-center">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/ingredients" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>Ingredients</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/blend" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>Make a Seasonality!</a>
            </li>

          </ul>
          <a className="navbar-brand" href="/" style={{ fontSize: '3rem', fontWeight: 'bold', color: '#fff', marginLeft: 'auto', marginRight: 'calc(50% - 13rem)', fontFamily: 'Dancing Script, cursive' }}>Seasonality</a>
          <Link to="/cart" className="nav-link" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>
            <FaShoppingCart style={{ marginRight: '5px' }} />
            Cart ({totalItems})
          </Link>
          {
            ! user ?
              <button>
                <div>
                  <Link to="/" onClick={() => { signInOnClick() }} style={{ color: 'black' }}>
                    Sign In
                  </Link>
                </div>
              </button>
              :
              <button>
                <div>
                  <Link to="/" onClick={() => { signOutOnClick() }} style={{ color: 'black' }}>
                    Sign Out
                  </Link>
                </div>
              </button>
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;