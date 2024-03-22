import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import Bottom from '../Signup/bottom'

function Home(){

    return(
        <div className='content'>
        <Navbar />
        <div className='Home content-main'>
            <h1>Social Service Food Delivery System</h1>
            <p>Welcome to Social Service Food Delivery Site,<br/> Where you can order from our Restaurants.
            <br />Feel free to share some of your own and rate on others!</p>
            <p>Explore Restaurents</p>
            <Link to='restuarants'>
                <button className='link-button'>Restaurants</button>
            </Link>
        </div>
        <Bottom />
        </div>
    );
}
export default Home;
