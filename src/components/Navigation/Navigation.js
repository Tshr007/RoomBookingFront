import React from 'react';
import { Link } from 'react-router-dom';
import './Navig.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navigation() {
  return (
    <nav className="navbar navbar-expand-sm bg-danger navbar-dark navbar">
    <div className="container-fluid ">
      <ul className="navbar-nav">
      <li className="nav-item">
          <Link className="nav-link active" to="/">HomePage</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/Register">Register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/feedback">User Reviews</Link>
        </li>
      </ul>
      </div>
    </nav>
  );
}

export default Navigation;
