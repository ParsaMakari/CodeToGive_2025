import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useState } from "react";

// Context for accessing user data accross pages

const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("site") || "");

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
        setUser(null);
    };
    
    // take {email:string ,password:string}
    const login = async (data) => {
        try {
            const res = await axios.post("http://localhost:8000/api/auth/login", data);
            const tokens = res.data;
            if (tokens) {
                localStorage.setItem("token", tokens.token);
                localStorage.setItem("refresh", tokens.refresh);
                setToken(tokens.token)

                const decoded = jwtDecode(tokens.token);
                setUser({
                    username: decoded.username || decoded.user_name || decoded.email,
                    email: decoded.email,
                    id: decoded.user_id || decoded.id,
                });
            } else {
                throw new Error(res.message)
                // setMessage("Login failed! No token received");
            }
        } catch (error) {
            console.error(error);
            throw new Error(error)
        }
    };    

    const checkAuthStatus = () =>{
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const decoded = jwtDecode(token);
            setUser({
                username: decoded.username,
                email: decoded.email,
                id: decoded.user_id,
            });
        } catch (err) {
            console.error("Error decoding JWT:", err);
            localStorage.removeItem("token");
            localStorage.removeItem("refresh");
        }    
    }    

    return (
        <AuthContext.Provider 
            value={{ token, user, login, logout,checkAuthStatus}}
                >
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};
