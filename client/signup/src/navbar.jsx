import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav className='Navbar'>
      <div className='left'>
        <button className='navele' id='logo'>SFSS</button>
        <Link to='/'>
        <button className='navele' >HOME</button>
        </Link>
        <Link to='/restuarants'>
        <button className='navele'>RESTAURANTS</button>
        </Link>
      </div>
      <div className='right'>
        <Link to='/signin'>
        <button className='navele' >SIGNIN</button>
        </Link>
        <Link to='/signup'>
        <button className='navele' >REGISTER</button>
        </Link>
      </div>
    </nav>
  );
};
 export default Navbar;