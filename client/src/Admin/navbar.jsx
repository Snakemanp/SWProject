import React from 'react';
import '../../styles/navbar.css';
import { Link, useParams } from 'react-router-dom';

const Navbar = () => {
    const {passkey} = useParams();
  return (
    <nav className='Navbar'>
      <div className='left'>
        <button className='navele' id='logo'>SSFDS</button>
        <Link to={`/Admin/${passkey}`}>
          <button className='navele'>HOME</button>
        </Link>
      </div>
      <div className='right'>
        <Link to='/'>
          <button className='navele'>Logout</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar