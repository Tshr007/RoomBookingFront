import React from 'react';
import Login from './components/Login/login.js';
import Navigation from './components/Navigation/Navigation.js';
import { BrowserRouter , createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom';
import RoomCrud from './components/Admin/RoomCrud.js';
import UserRegistration from './UserRegistration/UserRegisteration.js';
import HomePage from './components/HomePage/HomePage.js';
import Profile from './components/User/UserProfile.js';
import Bookings from './components/Admin/bookings.js';
import Book from './components/User/Booking.js';
import MyBookings from './components/User/MyBookings.js';
import Users from './components/Admin/Users.js';
import Review from './components/User/Feedback.js';
import Feedback from './components/Feedbacks/Feedbacks.js';
import Reviews from './components/User/Reviews.js';
import PrivateRoutesAdmin from './components/PrivateRoutes/PrivateRoutesAdmin.js';
import PrivateRoutesUser from './components/PrivateRoutes/PrivateRoutesUser.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
  
      <Routes> 
      <Route path='/' element={<HomePage />} />
      <Route path='/register' element={<UserRegistration/>}/>
      <Route path='/login' element={<Login/>} />
      <Route path='/feedback' element={<Feedback/>} />

      <Route element={<PrivateRoutesAdmin />} >
      
      <Route path='/admin' element={<RoomCrud/>}/>
      <Route path='/admin/bookings' element={<Bookings/>}/>
      <Route path='/admin/users' element={<Users/>}/>
      </Route>

      <Route element={<PrivateRoutesUser />} >
      <Route path="/user" element={<Profile/>} />
      <Route path='/user/book' element={<Book/>}/>
      <Route path='/user/mybookings' element={<MyBookings/>}/>
      <Route path='/user/review' element={<Review/>}/>
      <Route path='/user/reviews' element={<Reviews/>}/>
      </Route>
      </Routes>  

      </header>
    </div>
  );
}

export default App;
