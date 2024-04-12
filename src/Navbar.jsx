import React from 'react';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, Providers } from './firebase';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';

const signOutOnClick = () => {
  signOut(auth);
  location.reload();
};

const signInOnClick = async () => {
  const response = await signInWithPopup(auth, Providers.google);
};

const Navbar = ({ cart }) => {
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
              <a className="nav-link" href="/blend" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>Make a Blend!</a>
            </li>
          </ul>
          <a className="navbar-brand" href="/" style={{ fontSize: '3rem', fontWeight: 'bold', color: '#fff', marginLeft: 'auto', marginRight: 'calc(50% - 13rem)', fontFamily: 'Dancing Script, cursive' }}>Seasonality</a>

          <Badge badgeContent={cart.reduce((acc, item) => acc + item.quantity, 0)} color="secondary">
            <Button
              component={Link}
              to="/cart"
              style={{ color: 'white' }}
            >
              Cart (${cart.reduce((acc, item) => acc + (item.quantity * item.price), 0).toFixed(2)})
            </Button>
          </Badge>

          {
            !auth.currentUser ?
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