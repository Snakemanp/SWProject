import { React, useEffect } from 'react';
import { Login, Home, Signup, Restaurants, Reset } from './Signup.jsx';
import { Routes, Route } from 'react-router-dom';
import '../../styles/index.css';

function Page1() {
  useEffect(()=>{
    document.getElementById('root').style.backgroundImage='url(../../4117465.jpg)';
  },[])
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="restuarants" element={<Restaurants />} />
        <Route path="signin" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path='reset' element={<Reset />} />
        <Route path='*' element={<h1 style={{color:'white'}}>Page Not Found</h1>} />
      </Routes>
    </>
  );
}
export default Page1;
