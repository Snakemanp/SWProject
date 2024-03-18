import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './Signup.jsx'
import './index.css'
import Navbar from './navbar.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navbar />
    <Login />
  </React.StrictMode>,
)
