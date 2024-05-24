import axios from "axios";
import { useContext,useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { Button} from '@mui/material';
import AdminNavigation from "../Navigation/AdminNavigation.js";
import './Users.css';

function Users() {

    const [users,setUsers]=useState([]);

    useEffect(() => {
        (async () => await Load())();
      }, []);
     
       async function Load() {    
        const result = await axios.get("https://localhost:7069/api/Users");
        console.log(result.data);
        setUsers(result.data);
      }
return(
    <>
    <AdminNavigation />
    <br></br>
    <br></br>
    <br></br>
    <h1>Users Registered</h1>
      <table class="table table-light" align="center">
        <thead>
          <tr>
            <th scope="col">User Id</th>
            <th scope="col">Name</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Email</th>
           
          </tr>
        </thead>
        {
          users.map(function fn(reg) {
          return (
            <tbody>
              <tr>
                <th scope="row">{reg.userId} </th>
                <td>{reg.user_name}</td>
                <td>{reg.phone_No}</td>
                <td>{reg.email}</td>
                
              </tr>
            </tbody>
          );
        })}
      </table>
      </>
);  
}
export default Users;
