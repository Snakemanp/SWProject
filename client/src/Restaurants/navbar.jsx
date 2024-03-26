// navbar.jsx
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import '../../styles/navbar.css';

const Navbar = () => {
    const {id} = useParams();
  return (
    <nav className='Navbar'>
      <div className='left'>
        <button className='navele' id='logo'>SSFDS</button>
        <Link to={`/Restaurants/${id}/`}>
          <button className='navele'>HOME</button>
        </Link>
        <Link to={`/Restaurants/${id}/orders`}>
          <button className='navele'>ORDERS</button>
        </Link>
        <Link to={`/Restaurants/${id}/menu`}>
          <button className='navele'>MENU</button>
        </Link>
      </div>
      <div className='right'>
        <Link to={`/Restaurants/${id}/profile`}>
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
