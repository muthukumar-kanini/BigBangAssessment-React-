import React from 'react'
import { Link } from 'react-router-dom'
import './Navbardoc.css';

export default function 
() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary" style={{ height: "90px" }}>
  <div className="container">
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link className="nav-link" to="/home">Home</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/doctoruser">patients</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/doctoredit">editdocter</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/hospital">Hospital</Link>
      </li>
    </ul>
    <ul className="navbar-nav ml-auto">
     
      <li className="nav-item">
        <Link className="nav-link" to="/register">Logout</Link>
      </li>
    </ul>
  </div>
</nav>

    </div>
  )
}
