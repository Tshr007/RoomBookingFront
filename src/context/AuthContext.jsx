import React, { createContext, useContext, useState } from "react";
 
const AuthContext = createContext();
 
const AuthContextProvider  = ({children}) => {
    const [userid, setUserid] = useState(null)
    const [role, setRole] = useState(null)
    const [username, setUserName] = useState(null)
    const [token, setToken] = useState(null)
 
   
 
 
    return(
        <AuthContext.Provider value={{userid, setUserid, role, setRole, username, setUserName, token, setToken}} >
 
            {children}
        </AuthContext.Provider>
    )
}
 
 
export default AuthContext;
export {AuthContextProvider};