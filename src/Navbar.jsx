import React, { useState, useEffect } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, Providers } from './firebase';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart, useCartDetails } from './CartContext';
import './Navbar.css';

const Navbar = () => {
    const [user, setUser] = useState(null);
    const { addToCart, cart, fetchCart } = useCart();
    const { totalQuantity, totalPrice } = useCartDetails();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            if (user) {
                fetchCart();
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
            fetchCart();
        }
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top nav-container">
            <div className="container-fluid d-flex justify-content-center">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link nav-link-active" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/ingredients">Ingredients</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/blend">Make a Seasonality!</Link>
                        </li>
                    </ul>
                    <Link to="/" className="navbar-brand">Seasonality</Link>
                    {user && user.email === "torcsh30@gmail.com" && (
                                <Link className="nav-link-admin" to="/orders">Orders</Link>
                        )}

                    {user ? (
                        <div className="nav-item nav-user-info">
                            <span>Welcome, {user.displayName || 'User'}!</span>
                            <Link to="/checkout" className="nav-cart-link">
                                <FaShoppingCart className="nav-cart-icon" />
                                <span>{totalQuantity} - ${totalPrice}</span>
                            </Link>
                            <button onClick={signOutOnClick} className="nav-button">
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <button onClick={signInOnClick} className="nav-button">
                            Sign In
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;