// navbar.jsx
import React from 'react';
import '../../styles/navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='Navbar'>
      <div className='left'>
        <button className='navele' id='logo'>SSFDS</button>
        <Link to='/'>
          <button className='navele'>HOME</button>
        </Link>
        <Link to='/restuarants'>
          <button className='navele'>RESTAURANTS</button>
        </Link>
      </div>
      <div className='right'>
        <Link to='/signin'>
          <button className='navele'>SIGNIN</button>
        </Link>
        <Link to='/signup'>
          <button className='navele'>REGISTER</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
