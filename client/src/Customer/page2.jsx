import { React, useEffect, useState } from 'react';
import {Home, User, Restaurants, Ordermenu } from './users.jsx';
import { Routes, Route } from 'react-router-dom';

function Page2() {
  useEffect(()=>{
    document.getElementById('root').style.backgroundImage='url(https://wallpaperboat.com/wp-content/uploads/2019/10/free-website-background-21.jpg)';
    //document.getElementById('root').style.backgroundImage='url(../../public/page2.webp)';
  },[]) 
  const [cart,setCart]=useState([]) 
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="restuarants" element={<Restaurants/>} />
        <Route path=":restaurant/menu" element={<Ordermenu cart={cart} setCart={setCart} />} />
        <Route path='cart' element={<p>Temporary</p>} />
        <Route path="profile" element={<User />} />
        <Route path='*' element={<h1 style={{color:'blue'}}>Page Not Found</h1>} />
      </Routes>
    </>
  );
}
export default Page2;
