// navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/navbar.css';

const Navbar = () => {
  return (
    <nav className='Navbar'>
      <div className='left'>
        <button className='navele' id='logo'>SSFDS</button>
        <Link to=''>
          <button className='navele'>HOME</button>
        </Link>
        <Link to='restuarants'>
          <button className='navele'>RESTAURANTS</button>
        </Link>
        <Link to='order'>
          <button className='navele'>ORDER HISTORY</button>
        </Link>
      </div>
      <div className='right'>
        <Link to='profile'>
          <button className='navele'>PROFILE</button>
        </Link>
        <Link to='/'>
          <button className='navele'>LOGOUT</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
