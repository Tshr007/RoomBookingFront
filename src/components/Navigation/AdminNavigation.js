import React from 'react';
import { Link } from 'react-router-dom';
import './Navig.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminNavigation() {
  return (
    <nav className="navbar navbar-expand-sm bg-danger navbar-dark navbar">
    <div className="container-fluid ">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active" to="/admin">Update Room</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/admin/bookings">View Booking</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/admin/users">View Users</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/">Log Out</Link>
        </li>

      </ul>
      </div>
    </nav>
  );
}

export default AdminNavigation;