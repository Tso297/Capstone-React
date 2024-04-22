import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);


  const cartItems = cart.custom_blend ? JSON.parse(cart.custom_blend) : [];
  console.log("Parsed cart items structure:", cartItems);  // This line will log the structure

  
  console.log('Parsed cart items:', cartItems);
  console.log('Number of items in cart:', cartItems.length);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
            // Assuming firebaseUser.accessToken is available; replace or ensure this property is correct
            const userDetails = {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                token: firebaseUser.accessToken, // Ensure this is correct
                displayName: firebaseUser.displayName
            };

            // Check if all required user details are present
            if (userDetails.uid && userDetails.token) {
                console.log("Setting user details:", userDetails);
                setUser(userDetails);
            } else {
                console.log("Incomplete user data received from Firebase:", userDetails);
                setUser(null); // Ensure no incomplete user data is set
            }
        } else {
            console.log("No user logged in or incomplete data.");
            setUser(null);
            setCart([]);
        }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
}, []);

useEffect(() => {
    if (user && user.uid && user.token) {
        console.log("Fetching cart for user:", user.uid);
        fetchCart();
    } else {
        console.log("User not ready or missing necessary properties:", user);
    }
}, [user]); // Dependency on user state

const fetchCart = async () => {
  if (!user || !user.uid) { // Check if user exists and has a uid
      console.error("Attempted to fetch cart without a valid user or necessary user properties.", user);
      return; // Avoid making a fetch call if user data is incomplete
  }

  console.log("Fetching cart for user:", user.uid); // Logging the user UID for debugging

  try {
      const response = await fetch('http://127.0.0.1:5000/api/cart', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`, // Assuming the token is available and needed
              'User': user.uid
          }
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setCart(data); // Update your cart state
      console.log("Cart data received:", data); // Log received cart data
  } catch (error) {
      console.error("Failed to fetch cart:", error);
  }
};



    const addToCart = async (item) => {
      // Ensure that 'cart' is treated as an array
      const processedCart = Array.isArray(cart) ? [...cart, item] : [item];
      setCart(processedCart); // Update the cart state locally
    
      try {
        const response = await fetch('http://127.0.0.1:5000/api/update-cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user?.token}`, // Assuming the token is part of the user object
                'User': `${user.uid}`
            },
            body: JSON.stringify(processedCart) // Send the updated cart to the server
            
        });
        if (!response.ok) {
            throw new Error('Failed to update cart on server');
        }
        // Optionally update the cart with the response from the server if needed
        const responseCart = await response.json();
        setCart(responseCart);
      } catch (error) {
        console.error("Failed to add item to cart:", error);
      }
    };

    const handleQuantityChange = (itemName, newQuantity) => {
      console.log(`Attempting to update item with ID: ${itemName} to new quantity: ${newQuantity}`);
      updateCartItemQuantity(itemName, parseInt(newQuantity, 10));
  };
  
  const updateCartItemQuantity = async (itemName, newQuantity) => {
    const updatedCart = cartItems.map(item =>
        item.name === itemName ? { ...item, quantity: parseInt(newQuantity, 10) } : item
    );

    try {
        const response = await fetch('http://127.0.0.1:5000/api/update-cart-item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`, 
                'User': `${user.uid}`
            },
            body: JSON.stringify(updatedCart)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const updatedCartFromServer = await response.json();
        // Create a deep copy of the cart to ensure React detects the changes
        const newCart = updatedCartFromServer.map(item => ({ ...item }));
        setCart(newCart);
    } catch (error) {
        console.error("Failed to update cart item quantity:", error);
    }
};

    const removeFromCart = async (itemName) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/api/cart/remove/${itemName}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user?.token}`
                }
            });
            if (response.ok) {
                const updatedCart = await response.json();
                setCart(updatedCart);
            }
        } catch (error) {
            console.error("Failed to remove item from cart:", error);
        }
    };

    // Keeping your original handleCheckout function exactly as provided
    const handleCheckout = async () => {
        try {
            // Perform the initial checkout to your own backend
            const response = await fetch(`http://127.0.0.1:5000/api/checkout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `Bearer ${user.token}`,
                },
                body: JSON.stringify(cart)
            });

            if (!response.ok) {
                throw new Error("Failed to checkout: " + await response.text());
            }

            const checkoutData = await response.json();
            console.log('Initial checkout successful:', checkoutData);

            // Now initiate Stripe checkout
            const stripeResponse = await fetch(`http://127.0.0.1:5000/api/create-checkout-session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `Bearer ${user.token}`
                },
                body: JSON.stringify({ cart })  // Assuming you need to send the cart or other data
            });

            if (!stripeResponse.ok) {
                throw new Error("Failed to create Stripe session: " + await stripeResponse.text());
            }

            const stripeSession = await stripeResponse.json();
            window.location.href = stripeSession.url;  // Redirect to Stripe's checkout page
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Error during checkout. Please try again.');
        }
    };

    return (
        <CartContext.Provider value={{ handleQuantityChange, user, setUser, cart, fetchCart, addToCart, updateCartItemQuantity, removeFromCart, handleCheckout }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const useParsedCart = () => {
  const { cart } = useCart();
  return cart.custom_blend ? JSON.parse(cart.custom_blend) : [];
};

export const useCartDetails = () => {
  const { cart } = useContext(CartContext);
  const cartItems = cart.custom_blend ? JSON.parse(cart.custom_blend) : [];

  // Calculate total quantity and total price
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = parseFloat(cartItems.reduce((acc, item) => acc + (item.totalPrice * item.quantity), 0).toFixed(2));


  return { cartItems, totalQuantity, totalPrice };
};