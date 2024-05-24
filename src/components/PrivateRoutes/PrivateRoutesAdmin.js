import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import AuthContext from"../../context/AuthContext";
 
const PrivateRoutesAdmin = () => {
    const {role} = useContext(AuthContext)
 
    return role == "Admin" ? <Outlet /> : <Navigate to="/login" />
 
}
 
export default PrivateRoutesAdmin;