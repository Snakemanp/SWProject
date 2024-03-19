import React from 'react';
import './navbar.css';
import {Login,Home, Signup} from './Signup.jsx';
import { Link } from 'react-router-dom';
const Navbar = ({buttonpress}) => {
  function click(name) {
    buttonpress(name);
  }

  return (
    <nav className='Navbar'>
      <div className='left'>
        <button className='navele' id='logo'>SFSS</button>
        <Link to='/'>
        <button className='navele' onClick={()=>click('HOME')}>HOME</button>
        </Link>
        <button className='navele'onClick={()=>click('RESTAURANTS')}>RESTAURANTS</button>
      </div>
      <div className='right'>
        <Link to='/signin'>
        <button className='navele' onClick={()=>click('SIGNIN')}>SIGNIN</button>
        </Link>
        <Link to='/signup'>
        <button className='navele' onClick={()=>click('REGISTER')}>REGISTER</button>
        </Link>
      </div>
    </nav>
  );
};
 export default Navbar;