import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";


export default function Login({ setUser }) {
  useEffect(() => {
    document.title = "Login";
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

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
      setUser(decoded.username); // or { username: decoded.username } if you prefer
    } else {
      setMessage("Login failed! No token received");
    }
  } catch (error) {
    console.error(error);
    setMessage("Login failed!");
  }
};

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginTop: "30px ",
        }}
      >
        <h1 className="auth-title">Log in</h1>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "0.5em" }}
        >
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="custom-input"
            autoComplete="off"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="custom-input"
          />
          <button type="submit" className="custom-button">
            Log In
          </button>
          <div style={{display:"flex", justifyContent:"center"}}>
            <p style={{ marginTop: "10px"}}>
              Don't have an account?
              <br />
              <a href="/register" style={{ color: "#007bff", textDecoration: "underline" }}>
                Register here
              </a>
            </p>
          </div>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
