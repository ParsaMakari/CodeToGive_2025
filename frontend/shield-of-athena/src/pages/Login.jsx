import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "../css/Auth.scss";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const auth = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      if (email !== "" && password !== "") {
        await auth.login({email:email,password:password});
        setMessage("");
        navigate("/");        
        return;
      }
      alert("pleae provide a valid input");      
    } catch (error) {
      setMessage("Login failed:",error.message);
    }
  };

  useEffect(() => {
    document.title = "Login";
  }, []);  
  
  (auth.user!=null) && navigate("/", {replace:true} );
  return (
    <div className="auth">
      <div className="auth-card">
        <h1 className="auth-title">Log in</h1>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="auth-input"
            autoComplete="off"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="auth-input"
          />

          <button type="submit" className="auth-button">
            Log In
          </button>

          <div className="auth-footer">
            <p className="auth-footer-text">
              Don&apos;t have an account?
              <br />
                <Link to="/register" className="auth-link">
                Register here
              </Link>
            </p>
          </div>
        </form>

        {message && (
          <p className="auth-message auth-message--error">{message}</p>
        )}
      </div>
    </div>
  );
}
