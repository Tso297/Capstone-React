import React, { useEffect } from 'react';
import { useCart, useCartDetails } from './CartContext';
import './Checkout.css';
import BlendMix from './Blend';

const Checkout = () => {
    const { user, handleCheckout, removeFromCart, updateCartItemQuantity } = useCart();
    const { cartItems, totalQuantity, totalPrice } = useCartDetails();
    console.log("Cart Items in Checkout Component:", cartItems);

    useEffect(() => {
      console.log("Cart items updated, re-render should happen", cartItems);
  }, [cartItems]); 

    const handleQuantityChange = (itemName, newQuantity) => {
        updateCartItemQuantity(itemName, parseInt(newQuantity, 10));
    };

    const handleRemoveItem = (id) => {
        removeFromCart(id);
    };

    const onCheckoutClick = async () => {
        if (!user) {
            alert("Please log in to proceed with the checkout.");
            return;
        }
        await handleCheckout();
    };

    return (
        <div className="checkout-container">
            <div className="checkout-content">
                <h1 className='title'>View Your Seasonalities</h1>
                <ul>
                    {cartItems.map((item) => (
                        <li key={item.name} className="checkout-item">
                            <div className="item-details">
                                <span className='ingredient-name'>{item.name}</span>
                                <div>
                                    <span className='ingredient-quantity'>Quantity:</span>
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(item.name, e.target.value)}

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
                                                    <div>{ingredient.name} </div><div> {ingredient.percentage}%</div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <button className="remove-button" onClick={() => handleRemoveItem(item.name)}>Remove</button>
                        </li>
                    ))}
                </ul>
                <div className="checkout-summary">
                    <p className='checkout-tags'>Total Items: {totalQuantity}</p>
                    <button onClick={onCheckoutClick} className="checkout-button">
                        Checkout
                    </button>
                    <p className='checkout-tags'>Total Price: ${totalPrice}</p>
                </div>
            </div>
        </div>
    );
};

export default Checkout;