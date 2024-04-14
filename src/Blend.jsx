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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';


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

export const CartModal = ({ open, handleClose, cart, setCart, sliders, setSliders }) => {
  const handleQuantityChange = (index, newQuantity) => {
    const updatedSliders = sliders.map((slider) => {
      const ingredient = ingredients.find((ing) => ing.name === slider.id);
      const updatedPrice = (slider.value / 100) * ingredient.price * newQuantity;
      return {
        ...slider,
        value: newQuantity,
        price: updatedPrice
      };
    });
    setSliders(updatedSliders);
    const updatedCart = cart.map((item, i) =>
      i === index ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
  };

  const handleRemoveItem = (index) => {
    const updatedCart = cart.filter((item, i) => i !== index);
    setCart(updatedCart);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>My Blends</DialogTitle>
      <DialogContent>
        {cart.map((item, index) => (
          <div key={index} style={{ marginBottom: 10 }}>
            <div>{item.name}</div>
            <div>Ingredients:</div>
            <ul style={{ paddingLeft: 20 }}>
              {item.ingredients.map((ingredient, i) => (
                <li key={i}>
                  {ingredient.name}: {ingredient.percentage}% - ${(ingredient.price * item.quantity).toFixed(2)}
                </li>
              ))}
            </ul>
            <div>
              Total Price: ${(item.totalPrice * item.quantity).toFixed(2)}
            </div>
            <Input
              type="number"
              value={item.quantity}
              onChange={(e) => handleQuantityChange(index, e.target.value)}
              inputProps={{ min: 0 }}
            />
            <Button onClick={() => handleRemoveItem(index)}>Remove</Button>
          </div>
        ))}
      </DialogContent>
      <DialogActions>
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
          Check Out
        </Button>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

const BlendMix = () => {
  const [sliders, setSliders] = useState([]);
  const [blendName, setBlendName] = useState("");
  const [cart, setCart] = useState([]);
  const [openCart, setOpenCart] = useState(false);

  const handleSliderInput = (id, newValue) => {
    const updatedSliders = sliders.map((slider) =>
      slider.id === id ? { ...slider, value: newValue } : slider
    );
    const totalValue = updatedSliders.reduce((acc, slider) => acc + slider.value, 0);
    if (totalValue <= 100) {
      setSliders(updatedSliders);
    }
  };

  const handleInputChange = (id, newValue) => {
    const updatedSliders = sliders.map((slider) =>
      slider.id === id ? { ...slider, value: newValue } : slider
    );
    const totalValue = updatedSliders.reduce((acc, slider) => acc + slider.value, 0);
    if (totalValue <= 100) {
      setSliders(updatedSliders);
    }
  };

  const handleIngredientSelect = (e) => {
    const selectedIngredient = e.target.value;
    if (!sliders.find((slider) => slider.id === selectedIngredient)) {
      setSliders([...sliders, { id: selectedIngredient, value: 0 }]);
    }
  };

  const handleBlendNameChange = (e) => {
    setBlendName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const blendIngredients = sliders.map((slider) => {
      const ingredient = ingredients.find((ing) => ing.name === slider.id);
      return {
        name: slider.id,
        percentage: slider.value,
        price: (slider.value / 100) * ingredient.price
      };
    });

    const totalPrice = blendIngredients.reduce((acc, ingredient) => acc + ingredient.price, 0);

    const blend = {
      name: blendName,
      ingredients: blendIngredients,
      totalPrice: totalPrice.toFixed(2),
      quantity: 1
    };


    setCart([...cart, blend]); // Add blend to cart
    setBlendName("");
    setSliders([]);

    console.log('Submitted:', blend);
  };

  const handleOpenCart = () => {
    setOpenCart(true);
  };

  const handleCloseCart = () => {
    setOpenCart(false);
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
              style={{    width: '100%',
              marginBottom: 10,
              padding: 5,
              textAlign: 'center', 
              marginLeft: 'auto', 
              marginRight: 'auto' }}
            />
            <Select
              value=""
              onChange={handleIngredientSelect}
              displayEmpty
              style={{ width: '100%', marginBottom: 10, color: 'black', backgroundColor: 'white' }}
            >
              <MenuItem value="" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.5)', fontFamily: 'Dancing Script, cursive', fontSize: '1.5rem', color: 'black' }} >Select Ingredient</MenuItem>
              {ingredients.map((ingredient) => (
                <MenuItem key={ingredient.name} value={ingredient.name} style={{ fontFamily: 'Dancing Script, cursive', color: 'white', fontSize: '1.5rem', backgroundColor: 'black' }}>{ingredient.name}</MenuItem>
              ))}
            </Select>
            {sliders.map((slider) => {
              const ingredient = ingredients.find((ing) => ing.name === slider.id);
              const price = (slider.value / 100) * ingredient.price;
              return (
                <div key={slider.id} style={{ marginBottom: 10, display: 'flex', alignItems: 'center', color: 'white', justifyContent: 'center', width: '100%' }}>
                  <span style={{ flex: '1', textAlign: 'left', paddingRight: '10px', color: 'white', fontFamily: 'Dancing Script, cursive' }}>{slider.id}</span>
                  <Slider
                    value={slider.value}
                    onChange={(e, newValue) => handleSliderInput(slider.id, newValue)}
                    aria-labelledby={`slider-with-input-${slider.id}`}
                    valueLabelDisplay="auto"
                    min={0}
                    max={100}
                    size="small"
                    style={{ flex: '1', width: '100%', color: 'white' }}
                  />
                  <Input
                    value={slider.value}
                    onChange={(e) => handleInputChange(slider.id, e.target.value === '' ? '' : Number(e.target.value))}
                    inputProps={{
                      step: 1,
                      min: 0,
                      max: 100,
                      type: 'number',
                      'aria-labelledby': `slider-with-input-${slider.id}`,
                    }}
                    size="medium"
                    style={{ flex: '1', width: '300px', marginLeft: '20px', color: 'white' }}
                  />
                  <span style={{ flex: '1', textAlign: 'left', paddingRight: '10px', color: 'white', fontFamily: 'Dancing Script, cursive' }}>{price.toFixed(2)}</span>
                </div>
              );
            })}
          </FormGroup>
          <div style={{ marginTop: 10, color: 'white' }}>Blend Mixture:</div>
          {sliders.map((slider) => (
            <div key={slider.id} style={{ color: 'white' }}>{slider.id}: {slider.value}%</div>
          ))}
          <div style={{ color: 'white' }}>Total Price: ${(sliders.reduce((acc, slider) => acc + (slider.value / 100) * ingredients.find((ing) => ing.name === slider.id).price, 0)).toFixed(2)}</div>
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
            onMouseDown={(e) => e.target.style.transform = 'scale(0.95)'}
            onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
            onMouseEnter={(e) => e.target.style.boxShadow = '0px 1px 2px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.08)'}
            onMouseLeave={(e) => e.target.style.boxShadow = '0px 2px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.08)'}
          >
            Submit
          </Button>
 

<p style={{ color: 'white' }}>Unique Seasonalities In Cart: {cart.length} </p>

  <Button
  variant="contained"
  onClick={handleOpenCart}
  style={{
    marginTop: 20,
    backgroundColor: 'white',
    color: 'black',
    boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.08)',
    transition: 'box-shadow 0.3s ease',
    borderRadius: '4px',
  }}
>
  Review Blends
</Button>
<CartModal open={openCart} handleClose={handleCloseCart} cart={cart} setCart={setCart} sliders={sliders} setSliders={setSliders} />
        </FormControl>  

      </div>
    </div>
    
  );
};

export default BlendMix;