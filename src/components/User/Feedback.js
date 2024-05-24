import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext,useEffect, useState } from "react";
import UserNavigation from '../Navigation/UserNavigation.js';
import AuthContext from '../../context/AuthContext';
import * as Yup from 'yup';


function Review() {

    const [reviewId, setReviewId] = useState("");
    const [userId,setUserId]=useState("");
    const [roomId, setRoomId] = useState("");
    const [comment,setComment]=useState("");
    const [rating,setRating]=useState("");
    const [reviews, setReviews] = useState([]);
    const {userid}=useContext(AuthContext);
    const [roomNumber,setRoomNumber]=useState("");
    const [type,setType]=useState("");
    const [rooms,setRooms]=useState([]);
    const [errors, setErrors]=useState({});
     
      useEffect(() => {
        (async () => await Load())();
      }, []);
     
       async function Load() {    
        const result = await axios.get("https://localhost:7069/api/Reviews");
        const filteredRes = result.data.filter(review => review.userId == userid);
        setReviews(filteredRes);
        console.log(filteredRes);
        const result1 = await axios.get("https://localhost:7069/api/Rooms");
        setRooms(result1.data);
        console.log(result1.data);
      }

      const validationSchema = Yup.object().shape({
        roomNumber: Yup.number()
        .typeError('Room Number must be a number')
        .required('Room Number is required'),
        /*roomId: Yup.string().required('Room is required'),*/
        rating: Yup.string().required('Rating is required'),
      });

      function getRoomIdByNumber(no) {
        const room = rooms.find(room => room.roomNumber == no);
        return room ? room.roomId : 'Room Number not found';
      }

      function getRoomType(id){
        const room= rooms.find(room=>room.roomId==id);
        return room? room.type:'Room not found';
      }
      function getRoomNumber(id){
        const room= rooms.find(room=>room.roomId==id);
        return room? room.roomNumber:'Room not found';
      }
     
    function insert(){
       axios.post("https://localhost:7069/api/Reviews",{
        reviewId:reviewId,
        userId:userid,
         roomId:roomId,
         comment:comment,
         rating:rating
    
    
       })
    }
       
    async function save(event) {
        event.preventDefault();
        try {
          await validationSchema.validate({
            roomNumber,
            rating,
    
          }, { abortEarly: false });
         await axios.post("https://localhost:7069/api/Reviews", {
            roomId:roomId,
            userId:userid,
            comment:comment,
            rating:rating
            }
          );
          alert("Review Added");
          setReviewId("");
              setUserId("");
              setRoomId("");
              setComment("");
              setRating("");
               
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
        alert('Registration failed');
      }
    }
    }
    
      async function editCategory(reviews) {
        setReviewId(reviews.reviewId);
        setRoomId(reviews.roomId);
        setUserId(reviews.userId);
        setComment(reviews.comment);
        setRating(reviews.rating);
      }
     
    
      async function DeleteCategory(id) {
      await axios.delete("https://localhost:7069/api/Reviews/"+id );
       alert("Review deleted Successfully");
       setReviewId("");
              setUserId("");
              setRoomId("");
              setComment("");
              setRating("");
              
       
       Load();
      }
     
    
      async function update(event) {
        event.preventDefault();
        try {
          await validationSchema.validate({
            roomNumber,
            rating,
    
          }, { abortEarly: false });
         await axios.put(`https://localhost:7069/api/Reviews/${reviewId}`, {
          reviewId:reviewId,
          userId:userId,
         roomId:roomId,
         comment:comment,
         rating:rating
            }
          );
          alert("Review Updated");
          setReviewId("");
              setUserId("");
              setRoomId("");
              setComment("");
              setRating("");
               
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
              alert('Registration failed');
            }
          }
      }
    
        return (
          <div>
            <UserNavigation />
            <br></br>
                <br></br>
                <br></br>
            <h1>Review Details</h1>
          <div class="container mt-4">
            <form>
              
              <div class="form-group">
               
                <input
                  type="text"
                  class="form-control"
                  id="reviewId"
                  hidden
                  value={reviewId}
                  onChange={(event) => {
                    setReviewId(event.target.value);
                  }}
                />
                {/*
                <label>Room Number</label>
                <input
                  type="text"
                  class="form-control"
                  id="roomId"
                
                  value={roomId}
                  onChange={(event) => {
                    setRoomId(event.target.value);
                  }}
                />
                */}
                
                <label>Room Number</label>
                <input
                  type="text"
                  className={`form-control ${errors.roomNumber ? 'is-invalid' : ''}`}
                  id="roomNumber"
                
                  value={roomNumber}
                  onChange={(event) => {
                    setRoomNumber(event.target.value);
                   setRoomId(getRoomIdByNumber(event.target.value));
                  }}
                  required
                />
                {errors.roomNumber && <div className="invalid-feedback">{errors.roomNumber}</div>}

                <label>User Id</label>
                <input
                  type="text"
                  class="form-control"
                  id="userId"
                  value={userid}
                  onChange={(event) => {
                    setUserId(userid);
                  }}
                />
                <label>Comment</label>
                <input
                  type="text"
                  class="form-control"
                  id="comment"
                  value={comment}
                  onChange={(event) => {
                    setComment(event.target.value);
                  }}
                />
                
                <label>Rating</label>

<select
  className={`form-control ${errors.rating ? 'is-invalid' : ''}`}
  id="rating"
  value={rating}
  onChange={(event) => {
    setRating(event.target.value);
  }}
  required
>
  <option value="">Select a rating</option>
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
  <option value="5">5</option>
</select>
{errors.rating && <div className="invalid-feedback">{errors.rating}</div>}

              <div>
                <button class="btn btn-primary mt-4" onClick={save}>
                  Add
                </button>
                <button class="btn btn-warning mt-4" onClick={update}>
                  Update
                </button>
              </div>
              </div>
            </form>
          </div>
          <br></br>
    
           <table class="table table-light" align="center">
            <thead>
              <tr>
                <th scope="col">Room Number</th>
                <th scope="col">Room Type</th>
                <th scope="col">Review</th>
                <th scope="col">Rating</th>
              </tr>
            </thead>
            {reviews.map(function fn(review) {
              return (
                <tbody>
                  <tr>
                    <th scope="row">{getRoomNumber(review.roomId)} </th>
                    <td>{getRoomType(review.roomId)}</td>
                    <td>{review.comment}</td>
                    <td>{review.rating}</td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-warning"
                        onClick={() => editCategory(review)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        class="btn btn-danger"
                        onClick={() => DeleteCategory(review.reviewId)}
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
      
export default Review;
    