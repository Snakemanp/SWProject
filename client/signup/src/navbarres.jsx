import React from 'react';
import { Link } from 'react-router-dom'; // If using react-router for navigation
import './navbarres.css'; // CSS file for styling
import '@fortawesome/fontawesome-free/css/all.min.css';
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/homeres" className="navbar-brand">Home</Link>
      </div>
      <div className="navbar-right">
        <Link to="" className="navbar-link">Restaurants</Link>
        <Link to="" className="navbar-link">Order History</Link>
        <Link to="" className="navbar-link">My Menu</Link>
        <Link to="" className="navbar-icon">
          <i className="fas fa-user"></i>
        </Link>
        <Link to='/'>
        <button className="logout-btn">Logout</button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;