import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Logout from "./components/Logout";
import HomePage from "./pages/HomePage";
import DonationPage from "./pages/DonationPage";

function App() {
    const [user, setUser] = useState(null);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home user={user} />} />

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
                    element={
                        user ? <Navigate to="/dashboard" replace /> : <Register />
                    }
                />

                <Route
                    path="/dashboard"
                    element={
                        user ? <Dashboard user={user} /> : <Navigate to="/login" replace />
                    }
                />

                <Route
                    path="/logout"
                    element={<Logout setUser={setUser} />}
                />

                <Route path='/donate' element={<DonationPage/>} />
            </Routes>
        </Router>
    );
}

export default App;
