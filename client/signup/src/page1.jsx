import React, { useState } from 'react';
import {Login,Home, Signup} from './Signup.jsx';
import './index.css';
import Navbar from './navbar.jsx';

function App() {
  const [navbardata, setnavbardata] = useState('HOME');

  function getdatafromnavbar(data) {
    setnavbardata(data);
  }

  return (
    <>
      <Navbar buttonpress={getdatafromnavbar} />
      <div>
        {navbardata === 'SIGNIN' && <Login></Login>}
        {navbardata === 'HOME' && <Home />}
        {navbardata === 'REGISTER' && <Signup />}
      </div>
    </>
  );
}
export default App;