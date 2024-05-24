import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext,useEffect, useState } from "react";
import UserNavigation from '../Navigation/UserNavigation.js';
import AuthContext from '../../context/AuthContext';


function Reviews() {

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
    const [users,setUsers]=useState([]);
    
      useEffect(() => {
        (async () => await Load())();
      }, [roomId]);
     
       async function Load() {    
        const result = await axios.get("https://localhost:7069/api/Reviews");
        setReviews(result.data);
        console.log(result.data);
        const result1 = await axios.get("https://localhost:7069/api/Rooms");
        setRooms(result1.data);
        console.log(result1.data);
        const result2 = await axios.get("https://localhost:7069/api/Users");
        setUsers(result2.data);
        console.log(result2.data);
      }

      function getReviewIdByNumber(no) {
        const review = reviews.find(review => review.roomNumber === no);
        return review ? review.reviewId : 'Review Type not found';
      }

      function getRoomType(id){
        const room= rooms.find(room=>room.roomId==id);
        return room? room.type:'Room not found';
      }
     
      function getUserName(id){
        const user= users.find(user=>user.userId==id);
        return user? user.user_name:'User not found';
      }
    function insert(){
       axios.post("https://localhost:7069/api/Reviews",{
        reviewId:reviewId,
        userId:userId,
         roomId:roomId,
         comment:comment,
         rating:rating
    
    
       })
    }
       
      async function save(event) {   
        event.preventDefault();
        try {
          await axios.post("https://localhost:7069/api/Reviews", { 
        userId:userId,
         roomId:roomId,
         comment:comment,
         rating:rating
    
           
          });
          alert("Review added Successfully");
              setReviewId("");
              setUserId("");
              setRoomId("");
              setComment("");
              setRating("");
              
              
              Load();
        } catch (err) {
          alert(err);
        }
      }
    
      async function editCategory(reviews) {
        setRoomId(reviews.roomId);
        setReviewId(reviews.reviewId);
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
        } catch (err) {
          alert(err);
        }
      }
    
        return (
          <div>
            <UserNavigation />
            <br></br>
                <br></br>
                <br></br>
            <h1>Review Details</h1>
          <br></br>
    
           <table class="table table-light" align="center">
            <thead>
              <tr>
                <th scope="col">User Name</th>
                <th scope="col">Room Type</th>
                <th scope="col">Review</th>
                <th scope="col">Rating</th>
              </tr>
            </thead>
            {reviews.map(function fn(review) {
              return (
                <tbody>
                  <tr>
                    <th scope="row">{getUserName(review.userId)} </th>
                    <td>{getRoomType(review.roomId)}</td>
                    <td>{review.comment}</td>
                    <td>{review.rating}</td>
                  </tr>
                </tbody>
              );
            })}
          </table>
            
          </div>
        );
      }
      
      export default Reviews;
    