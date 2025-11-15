import { useState, useEffect } from "react";
import axios from "axios";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(()=>{
    document.title ="Register"
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setMessage("Passwords dont match");
      return;
    }
    try {
      const res = await axios.post("http://localhost:8000/api/auth/register", {
        firstName,
        lastName,
        username,
        email,
        password,
      });
      setMessage("Sucessfully registered!");
    } catch (error) {
      console.error(error);
      setMessage("Registration failed!" + error.message);
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
        <h1 className="auth-title">Sign up</h1>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "0.5em",
          }}
        >
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            className="custom-input"
          />
        <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            className="custom-input"
          />
        <input
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Username"
            className="custom-input"
          />
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="custom-input"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="custom-input"
          />
          <input
            type="password"
            value={confirmpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
            placeholder="Confirm password"
            className="custom-input"
          />
          <button type="submit" className="custom-button">
            Sign Up
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default Register;
