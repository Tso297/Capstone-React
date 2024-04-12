import React from 'react';
import Background from "../public/eyJidWNrZXQiOiJjb250ZW50Lmhzd3N0YXRpYy5jb20iLCJrZXkiOiJnaWZcL3NlYXNvbmluZ3MuanBnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo4Mjh9LCJ0b0Zvcm1hdCI6ImF2aWYifX0=.avif";

const Home = () => {
  return (
    <div style={{ marginTop: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundImage: `url(${Background})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100vw' }}>
<h1 className='text-white' style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.5)', fontFamily: 'Dancing Script, cursive', fontSize: '6rem' }}>Welcome to Seasonality!</h1>
<h2 className='text-white' style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.5)', fontFamily: 'Dancing Script, cursive', fontSize: '4rem' }}>Where your personality meets food.</h2>
    </div>
  );
}

export default Home;