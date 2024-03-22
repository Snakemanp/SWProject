import { React, useEffect, useState } from 'react';
import Home from './users';
import { Routes, Route } from 'react-router-dom';

function Page2() {
  useEffect(()=>{
    document.getElementById('root').style.backgroundImage='url(https://wallpaperboat.com/wp-content/uploads/2019/10/free-website-background-21.jpg)';
  },[])  
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="restuarants" element={<h1 style={{color:'blue'}}>Restaurants List</h1>} />
        <Route path="order" element={<h1 style={{color:'blue'}}>Order Food</h1>} />
        <Route path="profile" element={<h1 style={{color:'blue'}}>Profile</h1>} />
        <Route path='*' element={<h1 style={{color:'blue'}}>Page Not Found</h1>} />
      </Routes>
    </>
  );
}
export default Page2;
