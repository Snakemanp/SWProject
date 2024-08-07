// App.jsx
import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import Page1 from './Signup/page1.jsx';
import Page2 from './Customer/page2.jsx';
import Page3 from './Restaurants/page3.jsx';
import Page4 from './Ngo/page4.jsx'
import Page5 from './Admin/page5.jsx'

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
        <Route path="/Ngo/:id/*" element={<Page4 />} />
        <Route path="/Admin/:passkey/*" element={<Page5 />} />
      </Routes>
  );
}

export default App;
