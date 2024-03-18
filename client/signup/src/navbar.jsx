import React from 'react';
import './navbar.css';
const Navbar = ({buttonpress}) => {
  function click(name) {
    buttonpress(name);
  }

  return (
    <nav className='Navbar'>
      <div className='left'>
        <button className='navele' id='logo'>SFSS</button>
        <button className='navele'>HOME</button>
        <button className='navele'>RESTAURENTS</button>
      </div>
      <button className='navele right'>SIGNUP</button>
    </nav>
  );
};
 export default Navbar;