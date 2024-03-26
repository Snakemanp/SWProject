// App.jsx
import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import Page1 from './Signup/page1.jsx';
import Page2 from './Customer/page2.jsx';
import Page3 from './Restaurants/page3.jsx';

function User(){
    const {username}=useParams();
    return(<h1 style={{color:'white'}}>This is not written yet for {username}</h1>
    )
}
function App() {
  return (
      <Routes>
        <Route path="/*"  element={<Page1 />} />
        <Route path="/user/:id/*" element={<Page2 />} />
        <Route path="/Restaurants/:id/*" element={<Page3 />} />
      </Routes>
  );
}

export default App;
