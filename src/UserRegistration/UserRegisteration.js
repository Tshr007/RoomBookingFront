import axios from "axios";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button} from '@mui/material';
import Navigation from "../components/Navigation/Navigation.js";
import * as Yup from 'yup';
import './UserRegistration.css';

function UserRegistration() {
 
const [userId, setUserId] = useState("");
const [user_name, setUser_name] = useState("");
const [phone_No, setPhone_No] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [role,setRole]=useState("User");
const [users, setUsers] = useState([]);
const [errors, setErrors]=useState({});
const navigate = useNavigate();
 
  useEffect(() => {
    (async () => await Load())();
  }, []);
 
   async function Load() {    
    const result = await axios.get("https://localhost:7069/api/Users");
    setUsers(result.data);
    console.log(result.data);
  }

  const validationSchema = Yup.object().shape({
    user_name: Yup.string().required('Name is required'),
    phone_No: Yup.string().matches(/^[789]\d{9}$/, 'Phone number should start with 7, 8 or 9 and contain exactly 10 digits').required('Phone number is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });
 
  async function save(event) {  
    event.preventDefault();
    try {
      await validationSchema.validate({
        user_name,
        phone_No,
        email,
        password,

      }, { abortEarly: false });

      const response = await axios.get("https://localhost:7069/api/Users");
 
    // Check if the email already exists in the response data
    const emailExists = response.data.some((employer) => employer.email == email);
 
    if (emailExists) {
      setErrors({ email: 'Email already exists' });
      return;
    }
      await axios.post("https://localhost:7069/api/Users", {       
        user_name:user_name,
        phone_No:phone_No,
        email:email,
        password:password,
        role:role
      });
      alert("Registation Successful");
      setUserId("");
      setUser_name("");
      setPhone_No("");
      setEmail("");
      setPassword("");
      setRole("");
      Load();
     
      navigate('/login');
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
        alert('Registration failed');
      }
   
  }
}
 
    return (
      <div>
        <Navigation />
        <br></br>
        <br></br>
        <br></br>
        <h1>User Registeration</h1>
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
            <button class="btn btn-primary mt-4" onClick={save}>
              Register
            </button><br></br>
            <br></br>
          </div>

          <br></br>
          <center><label>Already Registered?</label></center><br></br>
          <Button type="button" class="btn btn-warning"
          component={Link}
          to="/login"
          variant="contained"
          style={{ margin: '10px' }}>
          Login
        </Button>
         
        </form>
      </div>
      <br></br>
       
      </div>
     
    );
  }
 
  export default UserRegistration;