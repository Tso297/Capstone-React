import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);


  const cartItems = cart.custom_blend ? JSON.parse(cart.custom_blend) : [];
  console.log("Parsed cart items structure:", cartItems);

  
  console.log('Parsed cart items:', cartItems);
  console.log('Number of items in cart:', cartItems.length);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {

            const userDetails = {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                token: firebaseUser.accessToken,
                displayName: firebaseUser.displayName
            };

            if (userDetails.uid && userDetails.token) {
                console.log("Setting user details:", userDetails);
                setUser(userDetails);
            } else {
                console.log("Incomplete user data received from Firebase:", userDetails);
                setUser(null);
            }
        } else {
            console.log("No user logged in or incomplete data.");
            setUser(null);
            setCart([]);
        }
    });

    return () => unsubscribe();
}, []);

useEffect(() => {
    if (user && user.uid && user.token) {
        console.log("Fetching cart for user:", user.uid);
        fetchCart();
    } else {
        console.log("User not ready or missing necessary properties:", user);
    }
}, [user]);

const fetchCart = async () => {
  if (!user || !user.uid) { 
      console.error("Attempted to fetch cart without a valid user or necessary user properties.", user);
      return; 
  }

  console.log("Fetching cart for user:", user.uid); 

  try {
      const response = await fetch('https://flask-capstone-1.onrender.com/api/cart', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`, 
              'User': user.uid
          }
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setCart(data); 
      console.log("Cart data received:", data); 
  } catch (error) {
      console.error("Failed to fetch cart:", error);
  }
};



    const addToCart = async (item) => {
      // Ensure that 'cart' is treated as an array
      const processedCart = Array.isArray(cart) ? [...cart, item] : [item];
      setCart(processedCart); // Update the cart state locally
    
      try {
        const response = await fetch('https://flask-capstone-1.onrender.com/api/update-cart', {
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
    console.log(`Starting to update item with name: ${itemName} to new quantity: ${newQuantity}`);
    const updatedItems = cartItems.map(item =>
        item.name === itemName ? { ...item, quantity: parseInt(newQuantity, 10) } : item
    );
  
    try {
        const response = await fetch('https://flask-capstone-1.onrender.com/api/update-cart-item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`, 
                'User': `${user.uid}`
            },
            body: JSON.stringify(updatedItems)
        });
  
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const { updatedItems: newUpdatedItems, totalPrice } = await response.json();
        console.log(`Updated cart received from server: `, newUpdatedItems);
  
        // Here, ensure you are creating a completely new object/array structure
        setCart({
            ...cart, 
            custom_blend: JSON.stringify(newUpdatedItems),
            totalPrice: totalPrice
        }); // This should trigger a re-render
  
        console.log("Cart state updated.");
    } catch (error) {
        console.error("Failed to update cart item quantity:", error);
    }
  };

  const removeFromCart = async (itemName) => {
    console.log(`Starting to remove item with name: ${itemName}`);
    try {
        const response = await fetch(`https://flask-capstone-1.onrender.com/api/cart/item/${itemName}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user?.token}`,
                'User': user?.uid
            },
            credentials: 'include'  // This is necessary if your server is using sessions
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const { updatedCart, totalPrice } = await response.json();
        console.log(`Updated cart received from server: `, updatedCart);

        // Here, ensure you are creating a completely new object/array structure
        setCart({
            ...cart,
            custom_blend: JSON.stringify(updatedCart),
            totalPrice: totalPrice
        }); // This should trigger a re-render

        console.log("Cart state updated after removal.");
    } catch (error) {
        console.error("Failed to remove item from cart:", error);
    }
};

    // Keeping your original handleCheckout function exactly as provided
    const handleCheckout = async () => {
        
        if (!user || !user.token || !user.uid) {
            console.error("User data is incomplete:", user);
            alert("Your session has expired, please log in again.");
            return;
        }
    
        try {
            const stripeResponse = await fetch(`https://flask-capstone-1.onrender.com/api/create-checkout-session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                    'User': user.uid
                }
            });
    
            console.log("Stripe response status:", stripeResponse.status);
            const responseText = await stripeResponse.text();  // Get text response to ensure you can read error messages
            console.log("Stripe response body:", responseText);
    
            if (!stripeResponse.ok) {
                throw new Error("Failed to create Stripe session: " + responseText);
            }
    
            const stripeSession = JSON.parse(responseText);
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