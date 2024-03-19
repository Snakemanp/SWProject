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
        <button className='navele' onClick={()=>click('HOME')}>HOME</button>
        <button className='navele'onClick={()=>click('RESTAURANTS')}>RESTAURANTS</button>
      </div>
      <div className='right'>
        <button className='navele' onClick={()=>click('SIGNIN')}>SIGNIN</button>
        <button className='navele' onClick={()=>click('REGISTER')}>REGISTER</button>
      </div>
    </nav>
  );
};
 export default Navbar;