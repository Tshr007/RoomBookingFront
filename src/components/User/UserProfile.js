import axios from "axios";
import { useContext,useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { Button} from '@mui/material';
import UserNavigation from "../Navigation/UserNavigation";
import * as Yup from 'yup';
import './UserProfile.css';
 
function UserProfile() {
 
    const [userId, setUserId] = useState("");
    const [user_name, setUser_name] = useState("");
    const [phone_No, setPhone_No] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role,setRole]=useState("User");
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const {userid}=useContext(AuthContext);
    const [errors, setErrors]=useState({});

  useEffect(() => {
    (async () => await Load())();
  }, []);
 
   async function Load() {    
    const result = await axios.get("https://localhost:7069/api/Users");
    const filteredRes = result.data.filter(user => user.userId == userid);
    console.log(filteredRes);
    setUsers(filteredRes);
  }

  const validationSchema = Yup.object().shape({
    user_name: Yup.string().required('Name is required'),
    phone_No: Yup.string().matches(/^[789]\d{9}$/, 'Phone number should start with 7, 8 or 9 and contain exactly 10 digits').required('Phone number is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });
 
  
  async function editProfile(registers) {

    setUserId(registers.userId);
    setUser_name(registers.user_name);
    setPhone_No(registers.phone_No);
    setEmail(registers.email);
    setPassword(registers.password);
    setRole(registers.role);
  }
 
 
  async function DeleteProfile(id) {
  await axios.delete("https://localhost:7069/api/Users/"+id );
   alert("User deleted Successfully");
   setUserId("");
      setUser_name("");
      setPhone_No("");
      setEmail("");
      setPassword("");
      setRole("");
      Load();
      navigate('/');
  }
 
 
  async function update(event) {
    event.preventDefault();
    try {
      await validationSchema.validate({
        user_name,
        phone_No,
        email,
        password,

      }, { abortEarly: false });

      const response = await axios.get("https://localhost:7069/api/Users");

      alert("User Updated");
      setUserId("");
      setUser_name("");
      setPhone_No("");
      setEmail("");
      setPassword("");
      setRole("");
      Load();
    }catch (error) { 
    if (error instanceof Yup.ValidationError) {
        // Handle validation errors
        const errors = error.inner.reduce((acc, curr) => {
          acc[curr.path] = curr.message;
          return acc;
        }, {});
        setErrors(errors);
      } else {
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
        <h1>My Profile</h1>
      <div class="container mt-4">
        <form>
          <div class="form-group">
           
            <input
              type="text"
              class="form-control"
              id="userId"
              hidden
              value={userId}
              onChange={(event) => {
                setUserId(event.target.value);
              }}
            />
 
 <label> Name*</label>
            <input
              type="text"
              className={`form-control ${errors.user_name ? 'is-invalid' : ''}`}
              id="user_name"
              value={user_name}
              onChange={(event) => {
                setUser_name(event.target.value);
              }}
              required
            />
            {errors.user_name && <div className="invalid-feedback">{errors.user_name}</div>}

            <label>Phone Number</label>
            <input
              type="text"
              className={`form-control ${errors.phone_No ? 'is-invalid' : ''}`}
              id="phone_No"
              value={phone_No}
              onChange={(event) => {
                setPhone_No(event.target.value);
              }}
              required
            />
            {errors.phone_No && <div className="invalid-feedback">{errors.phone_No}</div>}

            <label>Email*</label>
            <input
              type="text"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              id="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
             required
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}

            <label>Password*</label>
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              id="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              required
            />
           {errors.password && <div className="invalid-feedback">{errors.password}</div>}
           
 
 
          </div>
          <div>
            {/*<button class="btn btn-primary mt-4" onClick={save}>
              Register
        </button><br></br>*/}
            <br></br>
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
            <th scope="col">User Id</th>
            <th scope="col">Name</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Email</th>
            <th scope='col'>Option</th>
          </tr>
        </thead>
        {users.map(function fn(reg) {
          return (
            <tbody>
              <tr>
                <th scope="row">{reg.userId} </th>
                <td>{reg.user_name}</td>
                <td>{reg.phone_No}</td>
                <td>{reg.email}</td>
                <td>
             <button
                    type="button"
                    class="btn btn-warning"
                    onClick={() => editProfile(reg)}
                  >
                    Edit
          </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() =>DeleteProfile(reg.userId)}
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
 
export default UserProfile;