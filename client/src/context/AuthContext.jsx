import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../services/api";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token){
            setUser(jwtDecode(token));
        }
    },[]);

    const login = async (credentials)=>{
        try{
            const { data } = await api.post("/users/login", credentials);
            localStorage.setItem("token", data.token);
            setUser(jwtDecode(data.token));
        }catch(error){
            console.error(
              "Login failed:",
              error.response?.data || error.message
            );
            throw error;
        }
    };

    const logout = ()=>{
        localStorage.removeItem("token");
        setUser(null);
    };

    return(
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};