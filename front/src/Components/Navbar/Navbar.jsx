import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Navbar.css";


const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Supprimer le token du localStorage
    localStorage.removeItem('token');
    // Rediriger vers la page de login
    navigate('/');
  };

  return (
    <nav className="navbar">
  <ul>
    <li><Link to="/home">Home</Link></li>
    <li><Link to="/Profile">Profile</Link></li>
    <li><Link to="/Shirt">Shirt</Link></li>
    <li><button onClick={handleLogout}>Logout</button></li>
  </ul>
</nav>

  );
};

export default Navbar;
