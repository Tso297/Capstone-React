import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Background from '../public/container-spices.jpg';
import { useCart, useParsedCart } from './CartContext';
import { useNavigate, Link } from 'react-router-dom';
import './ingredients.css'

const ingredients = [
  { name: "Allspice", price: 15.00 },
  { name: "Anise", price: 18.00 },
  { name: "Annatto", price: 12.00 },
  { name: "Basil", price: 9.00 },
  { name: "Bay Leaves", price: 6.00 },
  { name: "Caraway Seed", price: 12.00 },
  { name: "Cardamom", price: 30.00 },
  { name: "Cayenne", price: 6.00 },
  { name: "Celery Seed", price: 9.00 },
  { name: "Chives", price: 15.00 },
  { name: "Cilantro", price: 9.00 },
  { name: "Cinnamon", price: 15.00 },
  { name: "Cloves", price: 21.00 },
  { name: "Coriander", price: 12.00 },
  { name: "Cumin", price: 9.00 },
  { name: "Dill Weed", price: 9.00 },
  { name: "Fennel Seed", price: 9.00 },
  { name: "Flaxseed", price: 6.00 },
  { name: "Garlic", price: 6.00 },
  { name: "Ginger", price: 15.00 },
  { name: "Juniper Berries", price: 15.00 },
  { name: "Marjoram", price: 9.00 },
  { name: "Mint", price: 9.00 },
  { name: "Mustard", price: 6.00 },
  { name: "Nutmeg", price: 30.00 },
  { name: "Onion", price: 6.00 },
  { name: "Oregano", price: 9.00 },
  { name: "Paprika", price: 9.00 },
  { name: "Parsley", price: 9.00 },
  { name: "Pepper", price: 6.00 },
  { name: "Poppy Seed", price: 6.00 },
  { name: "Rosemary", price: 9.00 },
  { name: "Sage", price: 9.00 },
  { name: "Salt", price: 3.00 },
  { name: "Sesame Seed", price: 9.00 },
  { name: "Star Anise", price: 15.00 },
  { name: "Tarragon", price: 9.00 },
  { name: "Thyme", price: 9.00 },
  { name: "Turmeric", price: 9.00 },
  { name: "Vanilla", price: 30.00 }
];

const BlendMix = (user) => {
  const [sliders, setSliders] = useState([]);
  const [blendName, setBlendName] = useState("");
  const navigate = useNavigate();
  const { cart, addToCart } = useCart();

  console.log('Current cart:', cart);
  console.log('Number of items in cart:', cart.length);

    const cartItems = useParsedCart();
    console.log('Number of items in cart:', cartItems.length);

  const handleCheckout = async () => {
    try {
        // Perform the initial checkout to your own backend
        const response = await fetch(`https://flask-capstone-1.onrender.com/api/checkout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Note: 'Access-Control-Allow-Origin' is a response header and should not be set by the client
                'x-access-token': `Bearer ${user.token}`,
            },
            body: JSON.stringify(cart)
        });

        if (!response.ok) {
            throw new Error("Failed to checkout: " + await response.text());
        }

        // If initial checkout is successful, proceed with Stripe checkout
        const checkoutData = await response.json();
        console.log('Initial checkout successful:', checkoutData);

        // Assuming the server's response includes a URL or session ID for Stripe
        // Now initiate Stripe checkout
        const stripeResponse = await fetch(`https://flask-capstone-1.onrender.com/api/create-checkout-session`, {
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

        // Get the Stripe session URL from your server's response and redirect
        const stripeSession = await stripeResponse.json();
        window.location.href = stripeSession.url;  // Redirect to Stripe's checkout page

    } catch (error) {
        console.error('Checkout error:', error);
        alert('Error during checkout. Please try again.');
    }
};
// THIS IS WHERE YOU THINK YOU NEED TO THROW THAT SHIT IN FOR STRIPE

  const handleSliderInput = (id, newValue) => {
    newValue = parseInt(newValue);
    let total = sliders.reduce((acc, slider) => acc + (slider.id === id ? newValue : slider.value), 0);

    if (total <= 100) {
        const updatedSliders = sliders.map(slider =>
            slider.id === id ? { ...slider, value: newValue } : slider
        );
        setSliders(updatedSliders);
    }
  };

  const handleInputChange = (id, event) => {
    let newValue = parseInt(event.target.value, 10);
    if (isNaN(newValue)) newValue = 0;  // Defaults to 0 if input is NaN
    if (newValue < 0) newValue = 0;  // Ensures percentage is not negative
    if (newValue > 100) newValue = 100;  // Ensures percentage does not exceed 100

    const total = sliders.reduce((acc, slider) => acc + (slider.id === id ? 0 : slider.value), 0) + newValue;
    if (total <= 100) {
        setSliders(sliders.map(slider =>
            slider.id === id ? { ...slider, value: newValue } : slider
        ));
    }
};

  const handleIngredientSelect = (e) => {
    const selectedIngredient = e.target.value;
    if (!sliders.some(slider => slider.id === selectedIngredient)) {
        setSliders([...sliders, { id: selectedIngredient, value: 0 }]);
    }
  };

  const handleBlendNameChange = (e) => {
    setBlendName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalPercentage = sliders.reduce((total, slider) => total + slider.value, 0);
    if (totalPercentage !== 100) {
        alert('The total percentage must be 100. Please adjust the slider values.');
        return;
    }
    const blendIngredients = sliders.map(slider => {
        const ingredient = ingredients.find(ing => ing.name === slider.id);
        return {
            name: slider.id,
            percentage: slider.value,
            price: (slider.value / 100) * ingredient.price,
        };
    });
    const totalPrice = blendIngredients.reduce((acc, ingredient) => acc + ingredient.price, 0);
    const blend = {
        name: blendName,
        ingredients: blendIngredients,
        totalPrice,
        quantity: 1,
    };
    console.log('check 1')
    addToCart(blend);
    console.log('check 2')
    setBlendName("");
    console.log('check 3')
    setSliders([]);
    console.log('check 4')
  };

  return (
      <div style={{
          backgroundImage: `url(${Background})`,
          backgroundSize: 'cover',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: 'inset 0 0 300px rgba(0,0,0,0.9)'
      }}>
          <div style={{ padding: 20, width: '40%', borderRadius: '100px', backgroundColor: 'rgba(0, 0, 0, 0.9)', textAlign: 'center', boxShadow: '0 40px 32px rgba(0, 0, 0, 0.8)', borderColor: 'white', borderWidth: '4px', borderStyle: 'solid' }}>
              <FormControl component="form" onSubmit={handleSubmit}>
                  <FormLabel component="legend" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.5)', fontFamily: 'Dancing Script, cursive', fontSize: '6rem', color: 'white' }}>Blending Table</FormLabel>
                  <FormGroup style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <input
                          type="text"
                          placeholder="Name Your Blend"
                          value={blendName}
                          onChange={handleBlendNameChange}
                          style={{ width: '100%', marginBottom: 10, padding: 5, textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}
                      />
                      <Select
                          value=""
                          onChange={handleIngredientSelect}
                          displayEmpty
                          style={{ width: '100%', marginBottom: 10, color: 'black', backgroundColor: 'white' }}
                      >
                          <MenuItem value="" disabled>Select Ingredient</MenuItem>
                          {ingredients.map((ingredient) => (
                              <MenuItem key={ingredient.name} value={ingredient.name}>{ingredient.name}</MenuItem>
                          ))}
                      </Select>
                      {sliders.map((slider, index) => (
    <div key={index} style={{ marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', color: 'white' }}>
        <span style={{ flex: 1, textAlign: 'left', paddingRight: '10px' }}>{slider.id}</span>
        <Slider
            value={slider.value}
            onChange={(e, newValue) => handleSliderInput(slider.id, newValue)}
            aria-labelledby={`slider-${slider.id}`}
            valueLabelDisplay="auto"
            min={0}
            max={100}
            style={{ flex: 3, color: 'white', marginRight: '1rem' }}
        />
        <div className="input-percentage-container" style={{ flex: 1, }}>
            <Input
                className="input-percentage"
                value={slider.value.toString()}
                margin="dense"
                onChange={(e) => handleInputChange(slider.id, e)}
                inputProps={{
                    step: 1,
                    min: 0,
                    max: 100,
                    type: 'number',
                    'aria-labelledby': `slider-input-${slider.id}`
                }}
                style={{ color: 'white', width: '70%' }}
            />
            <span>%</span>
        </div>
        <span style={{ flex: 1, textAlign: 'right', paddingRight: '10px' }}>
            ${((slider.value / 100) * ingredients.find(ing => ing.name === slider.id).price).toFixed(2)}
        </span>
    </div>
))}
                  </FormGroup>
                  <Button
                      type="submit"
                      variant="contained"
                      style={{
                          marginTop: 20,
                          backgroundColor: 'white',
                          color: 'black',
                          boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.08)',
                          transition: 'box-shadow 0.3s ease',
                          borderRadius: '4px',
                      }}
                  >
                      Submit
                  </Button>
                  <p style={{ color: 'white' }}>Unique Seasonalities In Cart: {cartItems.length}</p>
                  <Link to="/checkout" style={{ textDecoration: 'none' }}>
                  <Button
                      variant="contained"
                      style={{
                          marginTop: 20,
                          backgroundColor: 'white',
                          color: 'black',
                          boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.08)',
                          transition: 'box-shadow 0.3s ease',
                          borderRadius: '4px',
                      }}
                  >
                      View Cart
                  </Button>
                  </Link>
              </FormControl>
          </div>
      </div>
  );
};
export default BlendMix;