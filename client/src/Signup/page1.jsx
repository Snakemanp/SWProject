import React from 'react';
import { Login, Home, Signup,Restaurants } from './Signup.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Navbar from './navbar.jsx';

function Page1() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="restuarants" element={<Restaurants />} />
        <Route path="signin" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </>
  );
}
export default Page1;
