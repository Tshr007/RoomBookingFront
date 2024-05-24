import axios from "axios";
import { useEffect, useState } from "react";
import AdminNavigation from '../Navigation/AdminNavigation.js';
import * as Yup from 'yup';

function RoomCrud() {

const [roomId, setRoomId] = useState("");
const [roomNumber,setRoomNumber]=useState("");
const [type, setType] = useState("");
const [capacity,setCapacity]=useState("");
const [price,setPrice]=useState("");
const [amenities,setAmenities]=useState("");
const [imgURL,setImgURL]=useState("");
const [rooms, setRooms] = useState([]);
const [errors, setErrors]=useState({});
 
 
  useEffect(() => {
    (async () => await Load())();
  }, []);
 
  async function Load() {    
    const result1=await axios.get("https://localhost:7069/api/Rooms");
    setRooms(result1.data);
    console.log(result1.data);
  }
  const validationSchema = Yup.object().shape({
    roomNumber: Yup.number()
        .required('Room Number is required')
        .typeError('Room Number must be a number'),
    /*roomId: Yup.string().required('Room is required'),*/
    type: Yup.string().required('Type is required'),
    capacity: Yup.number()
        .required('capacity is required')
        .typeError('capacity must be a number'),
    price: Yup.number()
        .required('price is required')
        .typeError('price must be a number'),
    amenities: Yup.string().required('Amenities is required'),
  });

 
function insert(){
   axios.post("https://localhost:7069/api/Rooms",{
     roomId:roomId,
     type:type,
     capacity:capacity,
     amenities:amenities,
     price:price,
     roomNumber:roomNumber,
     imgURL:imgURL


   })
}
   
  async function save(event) {   
    event.preventDefault();
    try {
      await validationSchema.validate({
        roomNumber,
        type,
        capacity,
        price,
        amenities,

      }, { abortEarly: false });
      await axios.post("https://localhost:7069/api/Rooms", { 
        roomNumber:roomNumber,       
        type:type,
        capacity:capacity,
        amenities:amenities,
        price:price, 
       
      });
      alert("Room added Successfully");
          setRoomId("");
          setType("");
          setCapacity("");
          setAmenities("");
          setPrice("");
          setRoomNumber("");
          setImgURL("");
          
          Load();
    } catch (error) { 
      if (error instanceof Yup.ValidationError) {
          // Handle validation errors
          const errors = error.inner.reduce((acc, curr) => {
            acc[curr.path] = curr.message;
            return acc;
          }, {});
          setErrors(errors);
        } 
        else {
          // Handle other errors
          alert('Room Registration failed');
        }
      }
    }
  

  async function editCategory(rooms) {
    setRoomId(rooms.roomId);
    setType(rooms.type);
    setCapacity(rooms.capacity);
    setAmenities(rooms.amenities);
    setPrice(rooms.price);
    setImgURL(rooms.imgURL);
    setRoomNumber(rooms.roomNumber);
  }
 

  async function DeleteCategory(id) {
  await axios.delete("https://localhost:7069/api/Rooms/"+id );
   alert("Room deleted Successfully");
   setRoomId("");
   setType("");
   setCapacity("");
   setAmenities("");
   setPrice("");
   setImgURL("");
   setRoomNumber("");
   
   Load();
  }
 

  async function update(event) {
    event.preventDefault();
    try {
      await validationSchema.validate({
        roomNumber,
        type,
        capacity,
        price,
        amenities,

      }, { abortEarly: false });
     await axios.put(`https://localhost:7069/api/Rooms/${roomId}`, {
      roomId:roomId,
      type:type,
      capacity:capacity,
      amenities:amenities,
      price:price,
      roomNumber:roomNumber,
      imgURL:imgURL 
        }
      );
      alert("Room Updated");
      setRoomId("");
   setType("");
   setCapacity("");
   setAmenities("");
   setPrice("");
   setImgURL("");
   setRoomNumber("");
           
      Load();
    } catch (error) { 
      if (error instanceof Yup.ValidationError) {
          // Handle validation errors
          const errors = error.inner.reduce((acc, curr) => {
            acc[curr.path] = curr.message;
            return acc;
          }, {});
          setErrors(errors);
        } 
        else {
          // Handle other errors
          alert('Room Registration failed');
        }
      }
  }

    return (
      <div>
        <AdminNavigation />
        <br></br>
            <br></br>
            <br></br>
        <h1>Room Details</h1>
      <div class="container mt-4">
        <form>
          <div class="form-group">
           
            <input
              type="text"
              class="form-control"
              id="roomId"
              hidden
              value={roomId}
              onChange={(event) => {
                setRoomId(event.target.value);
              }}
            />
            <label>Room Number</label>
            <input
              type="text"
              className={`form-control ${errors.roomNumber ? 'is-invalid' : ''}`}
              id="roomNumber"
              value={roomNumber}
              onChange={(event) => {
                setRoomNumber(event.target.value);
              }}
              required
            />
            {errors.roomNumber && <div className="invalid-feedback">{errors.roomNumber}</div>}

            <label>Room Type</label>
            <input
              type="text"
              className={`form-control ${errors.type ? 'is-invalid' : ''}`}
              id="type"
              value={type}
              onChange={(event) => {
                setType(event.target.value);
              }}
              required
            />
            {errors.type && <div className="invalid-feedback">{errors.type}</div>}

            <label>Room Capacity</label>
            <input
              type="text"
              className={`form-control ${errors.capacity ? 'is-invalid' : ''}`}
              id="capacity"
              value={capacity}
              onChange={(event) => {
                setCapacity(event.target.value);
              }}
              required
            />
            {errors.capacity && <div className="invalid-feedback">{errors.capacity}</div>}

            <label>Room Ameneties</label>
            <input
              type="text"
              className={`form-control ${errors.amenities ? 'is-invalid' : ''}`}
              id="ameneties"
              value={amenities}
              onChange={(event) => {
                setAmenities(event.target.value);
              }}
              required
            />
            {errors.amenities && <div className="invalid-feedback">{errors.amenities}</div>}

            <label>Room Price</label>
            <input
              type="text"
              className={`form-control ${errors.price ? 'is-invalid' : ''}`}
              id="price"
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
              }}
              required
            />
            {errors.price && <div className="invalid-feedback">{errors.price}</div>}

            <input
              type="text"
              class="form-control"
              id="imgURL"
              hidden
              value={imgURL}
              onChange={(event) => {
                setImgURL(event.target.value);
              }}
            />
          </div>
          <div>
            <button class="btn btn-primary mt-4" onClick={save}>
              Register
            </button>
            <button class="btn btn-warning mt-4" onClick={update}>
              Update
            </button>
          </div>
        </form>
      </div>
      <br></br>

       <table class="table table-light" align="center">
        <thead>
          <tr>
            <th scope="col">Room Id</th>
            <th scope="col">Type</th>
            <th scope="col">Room Number</th>
            <th scope="col">Capacity</th>
            <th scope="col">Ameneties</th>
            <th scope="col">Price</th>
            <th scope="col">Option</th>
          </tr>
        </thead>
        {rooms.map(function fn(room) {
          return (
            <tbody>
              <tr>
                <th scope="row">{room.roomId} </th>
                <td>{room.type}</td>
                <td>{room.roomNumber}</td>
                <td>{room.capacity}</td>
                <td>{room.amenities}</td>
                <td>{room.price}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-warning"
                    onClick={() => editCategory(room)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => DeleteCategory(room.roomId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
        
      </div>
    );
  }
  
  export default RoomCrud;
