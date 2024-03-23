import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from './navbar.jsx';
import Bottom from '../Signup/bottom.jsx'
import '../../styles/signup.css'
function Home(){
    const [greeting, setGreeting] = useState('');
    const { username } = useParams();

  useEffect(() => {
    const date = new Date();
    const hours = date.getHours();

    if (hours < 12) {
      setGreeting(`Good Morning`);
    } else if (hours < 18) {
      setGreeting(`Good Afternoon`);
    } else {
      setGreeting(`Good Evening`);
    }
  },[]);
    return(
        <div className='content'>
        <Navbar />
        <div className='Home content-main'>
            <h1 style={{marginBottom:'20px'}}>{greeting}</h1>
            <h2>Social Service Food Delivery System</h2>
            <p>Welcome to Social Service Food Delivery Site,<br/> Where you can order from our Restaurants.
            <br />Feel free to share some of your own and rate on others!</p>
            <p>Explore Restaurents</p>
            <Link to='orders'>
                <button className='link-button'>Orders</button>
            </Link>
        </div>
        <Bottom />
        </div>
    );
}
export {Home};