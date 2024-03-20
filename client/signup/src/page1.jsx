import React from 'react';
import { Login, Home, Signup,Restaurants } from './Signup.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Navbar from './navbar.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restuarants" element={<Restaurants />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
