import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "../css/Auth.scss";
import { Link } from "react-router-dom";

export default function Login({ setUser }) {
  useEffect(() => {
    document.title = "Login";
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/auth/login", {
        email,
        password,
      });
      const tokens = res.data;
      if (tokens) {
        localStorage.setItem("token", tokens.token);
        localStorage.setItem("refresh", tokens.refresh);

        const decoded = jwtDecode(tokens.token);
          setUser({
              username: decoded.username || decoded.user_name || decoded.email,
              email: decoded.email,
              id: decoded.user_id || decoded.id,
          });
        setMessage("");
        navigate("/dashboard");
      } else {
        setMessage("Login failed! No token received");
      }
    } catch (error) {
      console.error(error);
      setMessage("Login failed!");
    }
  };

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
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start',
              width: '100%',
              gap: '60px'
            }}>
              <p className="auth-footer-text" style={{ margin: 0 }}>
                Don&apos;t have an account?
                <br />
                <Link to="/register" className="auth-link">
                  Register here
                </Link>
              </p>
              
              <Link 
                to="/admin/login" 
                className="auth-link"
                style={{ 
                  fontSize: '14px',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  marginTop: '0'
                }}
              >
                Admin Portal
              </Link>
            </div>
          </div>
        </form>

        {message && (
          <p className="auth-message auth-message--error">{message}</p>
        )}
      </div>
    </div>
  );
}