import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import AuthContext from"../../context/AuthContext";
 
const PrivateRoutesUser = () => {
    const {role} = useContext(AuthContext)
 
    return role == "User" ? <Outlet /> : <Navigate to="/login" />
 
}
 
export default PrivateRoutesUser;