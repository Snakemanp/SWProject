import React, { useState } from 'react';
import { Login, Home, Signup } from './Signup.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Navbar from './navbar.jsx';
import Navbarcus from './navbarcus.jsx';
import Navbarngo from './navbarngo.jsx';
import Navbaradm from './navbaradm.jsx';
import Navbarres from './navbarres.jsx';
function App() {
  

  return (
    <>
      <BrowserRouter>
        
        <Routes>
          <Route path='/' element={<><Navbar/><Home /></>} />
          <Route path='/homeres' element={<><Navbarres/><Home /></>} />
          <Route path="/homeadm" element={<><Navbaradm/><Home /></>} />
          <Route path="/homengo" element={<><Navbarngo/><Home /></>} />
          <Route path="/homecus" element={<><Navbarcus/><Home /></>} />
          <Route path="/signin" element={<><Navbar /><Login /></>} />
          <Route path="/signup" element={<><Navbar /><Signup /></>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;

