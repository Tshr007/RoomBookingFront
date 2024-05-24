import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Navigation from "../Navigation/Navigation.js";
import './HomePage.css';

function Homepage(){
    const navigate=useNavigate();
     
    const [rooms, setRooms] = useState([]);

    async function registration(){
        navigate('/register');
    }
    async function alreadyuser(){
        navigate('/login');
    }
    useEffect(() => {
        (async () => await Load())();
      }, []);

    async function Load() {    
        const result = await axios.get("https://localhost:7069/api/Rooms");
        setRooms(result.data);
        console.log(result.data);
      }
    return(
        <>
            <Navigation />
            <br></br>
            <br></br>
            <br></br>
            <center><h1>Space Booking</h1></center>
            <br></br>
            <center><h2>Welcome to Room Booking System</h2></center>
            <br></br>

            <div className="center-container">
  <div className="center-item">
    <label htmlFor="register">New User? </label>
    <button type="submit" name="register" className="btn btn-light" onClick={registration}>
      Register
    </button>
  </div>
  <br />
  <div className="center-item">
    <label htmlFor="login">Already a user?</label>
    <button type="submit" name="login" className="btn btn-secondary" onClick={alreadyuser}>
      Login
    </button>
  </div>
</div><br></br><br></br>
            <br></br><center> <h5>Our Rooms </h5></center><br></br><table class="table table-light" align="center">
                <thead>
                    <tr>
                        <th scope="col">Room Number</th>
                        <th scope="col">Room Type</th>
                        <th scope="col">Room Capacity</th>
                        <th scope="col">Room Price</th>
                    </tr>
                </thead>
                {rooms.map(function fn(room) {
                    return (
                        <tbody>
                            <tr>
                                {/*<th scope="row">{room.roomId} </th>*/}
                                <td>{room.roomNumber}</td>
                                <td>{room.type}</td>
                                <td>{room.capacity}</td>
                                <td>{room.price}</td>
                            </tr>
                        </tbody>
                    );
                })}
            </table>
        </>

    );
}

export default Homepage;