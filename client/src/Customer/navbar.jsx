// navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import '../../styles/navbar.css';

function Navbar({id}){
  return (
    <nav className='Navbar'>
      <div className='left'>
        <button className='navele' id='logo'>SSFDS</button>
        <Link to={`/user/${id}/`}>
          <button className='navele'>HOME</button>
        </Link>
        <Link to={`/user/${id}/restuarants`}>
          <button className='navele'>RESTAURANTS</button>
        </Link>
      </div>
      <div className='right'>
        <Link to={`/user/${id}/cart`}>
          <button className='navele'>
            <FaShoppingCart size={'28'}/>
          </button>
        </Link>
        <Link to={`/user/${id}/profile`}>
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
