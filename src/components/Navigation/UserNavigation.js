import React from 'react';
import { Link } from 'react-router-dom';
import './Navig.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserNavigation() {
  return (
    <nav className="navbar navbar-expand-sm bg-danger navbar-dark navbar">
    <div className="container-fluid ">
      <ul className="navbar-nav">
      <li className="nav-item">
          <Link className="nav-link active" to="/user">User Profile</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/user/book">Book Room</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/user/mybookings">My Bookings</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/user/review">Review</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/user/reviews">
            What other User's say
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/">Log Out</Link>
        </li>

      </ul>
      </div>
    </nav>
  );
}

export default UserNavigation;