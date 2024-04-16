import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import '../../styles/navbar.css';

function Navbar({id}){
  return (
    <nav className='Navbar'>
      <div className='left'>
        <button className='navele' id='logo'>SSFDS</button>
<<<<<<< HEAD
        <Link to={`/ngo/${id}/`}>
          <button className='navele'>HOME</button>
        </Link>
        <Link to={`/ngo/${id}/restuarants`}>
=======
        <Link to={`/Ngo/${id}/`}>
          <button className='navele'>HOME</button>
        </Link>
        <Link to={`/Ngo/${id}/restuarants`}>
>>>>>>> origin/main
          <button className='navele'>RESTAURANTS</button>
        </Link>
      </div>
      <div className='right'>
<<<<<<< HEAD
      <Link to={`/ngo/${id}/donationhistory`}>
          <button className='navele' style={{fontSize:'x-small'}}>DONATION HISTORY</button>
        </Link>
        
        <Link to={`/ngo/${id}/cart`}>
=======
      <Link to={`/Ngo/${id}/donationhistory`}>
          <button className='navele'>DONATION HISTORY</button>
        </Link>
        
        <Link to={`/Ngo/${id}/cart`}>
>>>>>>> origin/main
          <button className='navele'>
            <FaShoppingCart size={'28'}/>
          </button>
        </Link>
<<<<<<< HEAD
        <Link to={`/ngo/${id}/profile`}>
=======
        <Link to={`/Ngo/${id}/profile`}>
>>>>>>> origin/main
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