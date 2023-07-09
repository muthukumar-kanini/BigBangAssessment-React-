import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const navLinks = [
  { to: '', text: 'Home' },

  { to: '/Doctor', text: 'Doctors' },
  { to: '/patient', text: 'Patient' },
  { to: '/login', text: 'Logout' }
];

export default function Navbar() {
  const userEmail = localStorage.getItem('userEmail');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  return (
    <>
      <input className="iconclass" type="checkbox" id="active" />
      <label htmlFor="active" className="menu-btn">
        <span></span>
      </label>
      <label htmlFor="active" className="close"></label>
      <div className="wrapper">
        <ul className="navbar-nav">
          <span className="nav-link">Hi, {userEmail}</span>
          {navLinks.map((link, index) => (
            <li className="nav-item" key={index}>
              {link.text === 'Logout' ? (
                <button className="nav-link" onClick={handleLogout}>
                  {link.text}
                </button>
              ) : (
                <Link className="nav-link" to={link.to}>
                  {link.text}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
