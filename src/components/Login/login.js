import axios from "axios"
import { jwtDecode } from "jwt-decode"
import { useContext,useState } from "react"
import { useNavigate } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContext from"../../context/AuthContext";
import Navigation from "../Navigation/Navigation.js";
import './login.css';
 
function Login(){
    const navigate = useNavigate()
 
    const {userid, setUserid, role, setRole, username, setUserName, setToken} = useContext(AuthContext);
 
    const [info, setInfo] = useState({})
 
    const handleChange = (e) => {
      setInfo((prev) => ({...prev, [e.target.name]:e.target.value}))
    }
 
    const handleSubmit = async (e) => {
      e.preventDefault()
        try{
            const res = await axios.post(`https://localhost:7069/api/Users/login?email=${info.email}&password=${info.password}`)
            //localStorage.setItem('token', res.data)
            let userid = jwtDecode(res.data).UserId;
            setToken(res.data)
            let username=jwtDecode(res.data).DisplayName;
            let role = jwtDecode(res.data).Role
            setUserid(userid)
            setRole(role)
            setUserName(username)
            //localStorage.setItem('userid', userid)
            alert("Logged in Successfully!")
            if (role === 'Admin') {
                navigate("/admin");
              }
              if(role==='User') { // Assuming 'user' is the role for non-admin users
                navigate("/user")}
           
        }
        catch(error){
          alert("Login failed! May be you entered wrong credentials. Please try again.")
            console.log(error)
        }
 
    }
 
    return (
        <div>
              <Navigation />
              <center><h1>Login Page</h1></center>
              <div className="mb-3 mt-3">
                <label for="email" className="form-label">Email:</label>
                  <input type="email" id="email" name="email" className="form-control" placeholder="Enter email" onChange={handleChange}/>
              </div>
              <div className="mb-3 mt-3">
                <label for="password" className="form-label"> Password:</label>
                  <input type="password" id="password" name="password" className="form-control" placeholder="Enter password" onChange={handleChange}/>
              </div>
              <input type="submit" value="Login" className="btn btn-primary" onClick={handleSubmit} />
          </div>
      )
}
 
export default Login;