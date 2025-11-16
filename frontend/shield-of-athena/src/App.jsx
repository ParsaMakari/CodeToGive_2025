import React, {useEffect, useState} from "react";
import Layout from "./components/Layout";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Logout from "./components/Logout";
import HomePage from "./pages/HomePage";
import DonationPage from "./pages/DonationPage";
import Profile from "./pages/Profile";
import {jwtDecode} from "jwt-decode";
import NeedHelp from "./components/NeedHelp";

function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    setUser(null);
  };

    useEffect(() => {
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
    }, []);


    return (
    <Router>
      <Layout user={user} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<HomePage user={user} />} />

          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Login setUser={setUser} />
              )
            }
          />

          <Route
            path="/register"
            element={user ? <Navigate to="/dashboard" replace /> : <Register />}
          />

          <Route
            path="/dashboard"
            element={
              user ? (
                <Dashboard user={user} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route path="/logout" element={<Logout setUser={setUser} />} />

          <Route path="/donate" element={<DonationPage />} />
          
          <Route path="/get-help" element={<NeedHelp />} />

          <Route
            path="/profile"
            element={
                user ? <Profile user={user} /> : <Navigate to="/login" replace />
            }
        />
        </Routes>

      </Layout>
    </Router>
  );
}

export default App;
