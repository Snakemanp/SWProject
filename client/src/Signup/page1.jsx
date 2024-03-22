import React from 'react';
import { Login, Home, Signup,Restaurants } from './Signup.jsx';
import { Routes, Route } from 'react-router-dom';
import './index.css';

function Page1() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/restuarants" element={<Restaurants />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='*' element={<h1 style={{color:'white'}}>Page Not Found</h1>} />
      </Routes>
    </>
  );
}
export default Page1;
