// App.jsx
import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import Page1 from './page1.jsx';

function User(){
    const {username}=useParams();
    return(<h1 style={{color:'white'}}>This is not written yet for {username}</h1>
    )
}
function App() {
  return (
      <Routes>
        <Route path="*" element={<Page1 />} />
        <Route path="/user/:username" element={<User />} />
      </Routes>
  );
}

export default App;
