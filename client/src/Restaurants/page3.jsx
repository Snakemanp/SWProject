import { React, useEffect, useState } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { Home, Orders, Menu, Addmenu, Edititem, User } from './restaurants';

function Page3() {
  const {id}=useParams();
  const [user,setUser]=useState(JSON.parse(localStorage.getItem('user')) || []);
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);
  useEffect(()=>{
    document.getElementById('root').style.backgroundImage='url(../../public/page3.avif)';
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
  return (
    <>
      <Routes>
        <Route index element={<Home user={user}/>} />
        <Route path="orders" element={<Orders user={user}/>} />
        <Route path="menu" element={<Menu user={user}/>} />
        <Route path="menu/add" element={<Addmenu user={user}/>} />
        <Route path="menu/:itemname/edit" element={<Edititem user={user}/>} />
        <Route path="profile" element={<User user={user}/>} />
        <Route path='*' element={<h1 style={{color:'blue'}}>Page Not Found</h1>} />
      </Routes>
    </>
  );
}
export default Page3;
