import { useState, useEffect } from "react";
import axios from "axios";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    document.title = "Register";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setIsSuccess(false);
      setMessage("Passwords dont match");
      return;
    }
    try {
      const res = await axios.post("http://localhost:8000/api/auth/register", {
        first_name: firstName,
        last_name: lastName,
        username,
        email,
        password,
      });
      setIsSuccess(true);
      setMessage("Sucessfully registered!");
    } catch (error) {
      console.error(error);
      setIsSuccess(false);
      setMessage("Registration failed!" + error.message);
    }
  };
  return (
    <div className="auth">
      <div className="auth-card">
        <h1 className="auth-title">Sign up</h1>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            className="auth-input"
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            className="auth-input"
          />
          <input
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Username"
            className="auth-input"
          />
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="auth-input"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="auth-input"
          />
          <input
            type="password"
            value={confirmpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
            placeholder="Confirm password"
            className="auth-input"
          />

          <button type="submit" className="auth-button">
            Sign Up
          </button>
          <div className="auth-footer">
            <p className="auth-footer-text">
              Have an account?
              <br />
              <a href="/login" className="auth-link">
                Login here
              </a>
            </p>
          </div>
        </form>

        {message && (
          <p
            className={
              "auth-message " +
              (isSuccess ? "auth-message--success" : "auth-message--error")
            }
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Register;
