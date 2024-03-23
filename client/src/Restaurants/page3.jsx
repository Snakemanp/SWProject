import { React, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './restaurants';
import Navbar from './navbar';

function Page3() {
  useEffect(()=>{
    document.getElementById('root').style.backgroundImage='url(../../public/page3.avif)';
  },[])  
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="orders" element={<><Navbar /><h1 style={{color:'blue'}}>Restaurants List</h1></>} />
        <Route path="profile" element={<><Navbar /><h1 style={{color:'blue'}}>Profile</h1></>} />
        <Route path='*' element={<h1 style={{color:'blue'}}>Page Not Found</h1>} />
      </Routes>
    </>
  );
}
export default Page3;
