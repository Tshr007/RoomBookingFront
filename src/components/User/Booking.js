import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext,useEffect, useState } from "react";
import UserNavigation from '../Navigation/UserNavigation.js';
import AuthContext from '../../context/AuthContext';
import * as Yup from 'yup';
import './Booking.css';

function Bookings() {
  
    const navigate=useNavigate();
    const [bookingId, setBookingId] = useState("");
    const [userId, setUserId] = useState("");
    const [no_Of_Rooms,setNo_Of_Rooms]=useState("");
    const [roomId,setRoomId]=useState("");
    const [checkInDate,setCheckInDate]=useState("");
    const [checkOutDate,setCheckOutDate]=useState("");
    const [paymentStatus, setPaymentStatus] = useState("Unpaid");
    const [type,setType]=useState("");
    const [bookings,setBookings]=useState([]);
    const [rooms,setRooms]=useState([]);
    const [available,setAvailable]=useState([]);
    const {userid}=useContext(AuthContext);
    const [price,setPrice]=useState("");
    const [errors, setErrors]=useState({});

    useEffect(() => {
        (async () => await Load())();
      }, [checkInDate,checkOutDate]);

       async function Load() {    
        const result = await axios.get("https://localhost:7069/api/Bookings");
        setBookings(result.data);
        console.log(result.data);
        const result1=await axios.get("https://localhost:7069/api/Rooms");
        setRooms(result1.data);
        console.log(result1.data);
        
        if(checkInDate&&checkOutDate) {
            const availablerooms = await axios.get(`https://localhost:7069/api/Rooms/${checkInDate}/${checkOutDate}/RoomsAvailableOnDate`);
            setAvailable(availablerooms.data);
            console.log(availablerooms.data);
            }
    
      }
    
      const validationSchema = Yup.object().shape({
        no_Of_Rooms: Yup.string().required('No of Rooms is required'),
        /*roomId: Yup.string().required('Room is required'),*/
        checkInDate: Yup.string().required('Check in Date is required'),
        checkOutDate: Yup.string().required('Check out Date is required'),
      });

      function getRoomIdByType(type) {
        const room = rooms.find(room => room.type === type);
        return room ? room.roomId : 'Room id not found';
      }

      function AddRoom(room){
        setRoomId(room.roomId);
        getPrice(room);
      }

      function getPrice(room){
        const checkInDateObj = new Date(checkInDate);
        const checkOutDateObj = new Date(checkOutDate);
      
        const diffTime = Math.abs(checkOutDateObj - checkInDateObj);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      
        // Now you can use diffDays in your calculations
        const amount = room.price * no_Of_Rooms * diffDays;
        setPrice(amount);
      }
      
      


    function insert(){
       axios.post("https://localhost:7069/api/Bookings",{
         userId:userId,
         roomId:roomId,
         no_Of_Rooms:no_Of_Rooms,
         checkInDate:checkInDate,
         checkOutDate:checkOutDate,
         paymentStatus:paymentStatus
    
    
       })
    }
       
      async function save(event) {   
        event.preventDefault();
        try {
          await validationSchema.validate({
            no_Of_Rooms,
            roomId,
            checkInDate,
            checkOutDate,
    
          }, { abortEarly: false });

          await axios.post("https://localhost:7069/api/Bookings", {        
            userId:userid,
            roomId:roomId,
            no_Of_Rooms:no_Of_Rooms,
            checkInDate:checkInDate,
            checkOutDate:checkOutDate,
            paymentStatus:paymentStatus
           
          });
          alert("Room Booked Successfully");
              setBookingId("");
              setUserId("");
              setRoomId("");
              setNo_Of_Rooms("");
              setCheckInDate("");
              setCheckOutDate("");
              setPaymentStatus("");
              
              Load();
        } catch (error) { 
    if (error instanceof Yup.ValidationError) {
        // Handle validation errors
        const errors = error.inner.reduce((acc, curr) => {
          acc[curr.path] = curr.message;
          return acc;
        }, {});
        setErrors(errors);
      } else {
        // Handle other errors
        alert('Booking failed');
      }
      }
      }
      
    
        return (
          <div>
            <UserNavigation />
            <br></br>
            <br></br>
            <br></br>
            <h1>Booking Details</h1>
          <div class="container mt-4">
            <form>
              <div class="form-group">
               
                <input
                  type="text"
                  class="form-control"
                  id="bookingId"
                  hidden
                  value={bookingId}
                  onChange={(event) => {
                    setBookingId(event.target.value);
                  }}
                />
                <label>User Id</label>
                <input
                  type="text"
                  class="form-control"
                  id="userId"
                  value={userid}
                  onChange={(event) => {
                    setUserId(userid);
                  }}
                  readOnly
                />

                <label></label>
                <label>No of Rooms</label>
                <input
                  type="text"
                  className={`form-control ${errors.no_Of_Rooms ? 'is-invalid' : ''}`}
                  id="no_Of_Rooms"
                  value={no_Of_Rooms}
                  onChange={(event) => {
                    setNo_Of_Rooms(event.target.value);
                  }}
                  required
                />
                {errors.no_Of_Rooms && <div className="invalid-feedback">{errors.no_Of_Rooms}</div>}

                <label>Check In Date</label>
                <input
                  type="date"
                  className={`form-control ${errors.checkInDate ? 'is-invalid' : ''}`}
                  id="checkInDate"
                  value={checkInDate}
                  onChange={(event) => {
                    setCheckInDate(event.target.value);
                  }}
                  required
                />
                {errors.checkInDate && <div className="invalid-feedback">{errors.checkInDate}</div>}

                <label>Check Out Date</label>
                <input
                  type="date"
                  className={`form-control ${errors.checkOutDate ? 'is-invalid' : ''}`}
                  id="checkOutDate"          
                  value={checkOutDate}
                  onChange={(event) => {
                    setCheckOutDate(event.target.value);
                  }}
                  required
                />
                {errors.checkOutDate && <div className="invalid-feedback">{errors.checkOutDate}</div>}
                
        <table class="table table-light" align="center">
        <thead>
          <tr>
            <th scope="col">Type</th>
            <th scope="col">Room Number</th>
            <th scope="col">Capacity</th>
            <th scope="col">Ameneties</th>
            <th scope="col">Price</th>
            <th scope="col">Option</th>
          </tr>
        </thead>
      
        {available.map(function fn(room) {
          return (
            <tbody>
              <tr>
                <td>{room.type}</td>
                <td>{room.roomNumber}</td>
                <td>{room.capacity}</td>
                <td>{room.amenities}</td>
                <td>{room.price}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => AddRoom(room)}
                  >
                    Add
                  </button>
                </td>
          </tr>
          </tbody>
          );
        })}
        {/*
        {available.map(function fn(room) {
          return (
            <tbody>
              <tr>
                <td>{room.type}</td>
                <td>{room.roomNumber}</td>
                <td>{room.capacity}</td>
                <td>{room.amenities}</td>
                <td>{room.price}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-warning"
                    onClick={() => AddRoom(room)}
                  >
                    Add
                  </button>
                </td>
          </tr>
          </tbody>
          );
        })}*/}
      </table>

                <label>Payment Status</label>
                <input
                  type="text"
                  class="form-control"
                  id="paymentStatus"
                  value={paymentStatus}
                  onChange={(event) => {
                    setPaymentStatus(event.target.value);
                  
                  }}
                  readOnly
                />
                <label>Payment Amount</label>
                <input
                  type="text"
                  class="form-control"
                  id="paymentAmount"
                  value={price}
                  readOnly
                />
              </div>
              <div>
              <button class="btn btn-primary mt-4" onClick={(event) => { 
                save(event); 
                }}>
                 Book
            </button>
            <br></br>
          <button class="btn btn-warning mt-4" onClick={(event) => { 
                navigate('/user/mybookings'); 
                }}>
                 See my Bookings
            </button>
              </div>
            </form>
          </div>
          <br></br>
          
          </div>
        );
      }
      
      export default Bookings;