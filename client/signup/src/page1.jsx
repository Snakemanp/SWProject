import React, { useState } from 'react';
import { Login, Home, Signup } from './Signup.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Navbar from './navbar.jsx';

function App() {
  // const [navbardata, setnavbardata] = useState('HOME');

  // function getdatafromnavbar(data) {
  //   setnavbardata(data);
  //

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;

