import React from 'react';
import { Link } from 'react-router-dom'; // If using react-router for navigation
import './navbaradm.css'; // CSS file for styling
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/homeadm" className="navbar-brand">Home</Link>
      </div>
      <div className="navbar-right">
        <Link to="" className="navbar-link">Restaurants</Link>
        <Link to="" className="navbar-link">Admin</Link>
       
        <Link to='/'>
        <button className="logout-btn">Logout</button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;