import { React, useEffect, useState } from 'react';
import {Home, User, Restaurants, Ordermenu, Cart,Success,Failure,Donationhistory} from './ngo.jsx';
import { Routes, Route, useParams } from 'react-router-dom';

function Page4() {
  const {id}=useParams();
  const [user,setUser]=useState(JSON.parse(localStorage.getItem('user')) || []);
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);
  useEffect(()=>{
    document.getElementById('root').style.backgroundImage='url(../../public/page4.jpg)';
    //document.getElementById('root').style.backgroundImage='url(../../public/page2.webp)';
    fetch(`http://localhost:5000/id?id=${id}`)
        .then(response=>response.json())
        .then(data=>{
            //if(data.menu) setmenu(data.menu);
            console.log(data);
            setUser(data);
        })
        .catch(error => {
            console.error('Error fetching menu:', error);
        });
  },[]) 
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  return (
    <>
      <Routes>
        <Route index element={<Home user={user}/>} />
        <Route path="restuarants" element={<Restaurants user={user}/>} />
        <Route path=":restaurant/menu" element={<Ordermenu cart={cart} setCart={setCart} user={user}/>} />
        <Route path='cart' element={<Cart cart={cart} setCart={setCart} user={user}/>} />
        <Route path="profile" element={<User user={user}/>} />
        <Route path="donationhistory" element={<Donationhistory user={user}/>} />
        
        <Route path="order/success/:mode/:to" element={<Success cart={cart} user={user} setCart={setCart}/>} />
        <Route path="order/failure" element={<Failure/>} />
        <Route path='*' element={<h1 style={{color:'blue'}}>Page Not Found</h1>} />
      </Routes>
    </>
  );
}
export default Page4;
