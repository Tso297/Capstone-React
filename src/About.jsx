import Background from "../public/seasoningspoons.jpeg";

const About = () => {
  return (
    <div style={{ marginTop: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundImage: `url(${Background})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100vw', border: 'none', boxShadow: '0 0 30px 10px rgba(0, 0, 0, 0.5)' }}>
      <div className='about' style={{ fontWeight: 'bold', padding: '10px' }}>
        <h1 className='text-white text-center' style={{ textShadow: '2px 2px 0 black, -2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black, 0 0 5px rgba(0, 0, 0, 0.8)' }}>Behind The Blends</h1>
        <h2 className='text-white text-center' style={{ textShadow: '2px 2px 0 black, -2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black, 0 0 5px rgba(0, 0, 0, 0.8)' }}>Seasonality was crafted with those novice at cooking, and barbecue pit masters alike!</h2>
        <h2 className='text-white text-center' style={{ textShadow: '2px 2px 0 black, -2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black, 0 0 5px rgba(0, 0, 0, 0.8)' }}>Create your own signature blend from our selection so you never have to check for 12 ingredients again!</h2>
        <h2 className='text-white text-center' style={{ textShadow: '2px 2px 0 black, -2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black, 0 0 5px rgba(0, 0, 0, 0.8)' }}>Simply pick your ingredients, and your percentage for each and have it freshly blended and sent to you.</h2>
        <h2 className='text-white text-center' style={{ textShadow: '2px 2px 0 black, -2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black, 0 0 5px rgba(0, 0, 0, 0.8)' }}>Whether preparing your catering team, pan-searing your way to a loved one's heart, or simply cooking for fun,</h2>
        <h1 className='text-white text-center' style={{ textShadow: '2px 2px 0 black, -2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black, 0 0 5px rgba(0, 0, 0, 0.8)' }}>Let your personality show in every dish!</h1>
      </div>
    </div>
  );
}

export default About;