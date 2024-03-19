import React, { useState } from 'react';
import {Login,Home} from './Signup.jsx';
import './index.css';
import Navbar from './navbar.jsx';

function App() {
  const [navbardata, setnavbardata] = useState('Home');

  function getdatafromnavbar(data) {
    setnavbardata(data);
  }

  return (
    <>
      <Navbar buttonpress={getdatafromnavbar} />
      <div>
        {navbardata === 'SIGNIN' && <Login></Login>}
        {navbardata === 'HOME' && <Home />}
      </div>
    </>
  );
}
export default App;