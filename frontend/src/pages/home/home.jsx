import React from 'react'
import { useNavigate } from 'react-router-dom';
import './home.css'
import Testimonials from '../../components/Testimonials/Testimonials';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="home">
        <div className="home-content">
          <h1>Welcome!</h1>
          <p>Learn, Grow and Excel!</p>
          <button onClick={() => navigate("/courses")} className='common-btn'>Get Started</button>
        </div>
      </div>
      <Testimonials />
    </div>
  )
}


export default Home;



