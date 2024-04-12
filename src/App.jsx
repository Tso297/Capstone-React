import About from './About'
import Home from './Home'
import Navbar from './Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Ingredients from './Ingredients'
import AuthChecker from './auth/AuthChecker'
import Cart from './Cart'
import Checkout from './Checkout'
import Blend from './Blend'
import React, { useState } from 'react';
function App() {
  const [cart, setCart] = useState([]);
  return (
    <BrowserRouter>
    <div className="App">
    <Navbar cart={cart}/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/ingredients" element={<Ingredients/>} />
      <Route path="/blend" element={<Blend/>} />
      <Route path="/cart" element={<AuthChecker><Cart/></AuthChecker>} />
      <Route path="/checkout" element={<AuthChecker><Checkout/></AuthChecker>} />
    </Routes>
    </div>
    </BrowserRouter>
    
  )
}

export default App
