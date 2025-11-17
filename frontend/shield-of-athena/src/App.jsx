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
import Matcher from "./components/Matcher.jsx";
import NeedHelp from "./components/NeedHelp";
import AuthProvider, { useAuth } from "./context/authContext.js";

function App() {
    return (
    <Router>
      <AuthProvider>
        <Layout>
            <Routes>
              <Route path="/" element={<HomePage/>} />

              <Route
                path="/login"
                element={
                    <Login />
                }
              />

              <Route
                path="/register"
                element={<Register />}
              />

              <Route
                path="/dashboard"
                element={
                    <Dashboard />
                }
              />

              <Route path="/logout" element={<Logout />} />

              <Route path="/donate" element={<DonationPage />} />
              
              <Route path="/get-help" element={<NeedHelp />} />

              <Route
                path="/profile"
                element={
                    <Profile /> 
                }
            />
                <Route path="/matcher" element={<Matcher />} />
            </Routes>

          </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
