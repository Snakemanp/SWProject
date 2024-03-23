import { React, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, Orders, Menu, Addmenu } from './restaurants';
import Navbar from './navbar';

function Page3() {
  useEffect(()=>{
    document.getElementById('root').style.backgroundImage='url(../../public/page3.avif)';
  },[])  
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="orders" element={<Orders />} />
        <Route path="menu" element={<Menu />} />
        <Route path="menu/add" element={<Addmenu />} />
        <Route path="profile" element={<><Navbar /><h1 style={{color:'blue'}}>Profile</h1></>} />
        <Route path='*' element={<h1 style={{color:'blue'}}>Page Not Found</h1>} />
      </Routes>
    </>
  );
}
export default Page3;
