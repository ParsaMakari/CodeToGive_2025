import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { AuthProvider } from './context/AuthContext.jsx';

// ===== LEURS COMPOSANTS =====
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Logout from "./components/Logout";
import HomePage from "./pages/HomePage";
import DonationPage from "./pages/DonationPage";
import Profile from "./pages/Profile";
import Matcher from "./components/Matcher.jsx";

// ===== TES PAGES =====
import RoleSelect from "./pages/RoleSelect";
import AdminLogin from "./pages/AdminLogin";
import DonorLogin from "./pages/DonorLogin";

// ===== TES COMPOSANTS =====
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/shared/Navbar";
import LoadingSpinner from "./components/shared/LoadingSpinner";

// ===== TES VUES ADMIN =====
import AdminDashboard from "./components/admin/AdminDashboard";
import DonationManager from "./components/admin/DonationManager";
import CampaignManager from "./components/admin/CampaignManager";
import WallOfHopeManager from "./components/admin/WallOfHopeManager";
import UserManagement from "./components/admin/UserManagement";
import ReportingCharts from "./components/admin/ReportingCharts";
import LiveEventMode from "./components/admin/LiveEventMode";

// ===== TES VUES USER =====
import UserHomePage from "./components/user/HomePage";
import DonationForm from "./components/user/DonationForm";
import MyDonations from "./components/user/MyDonations";
import ImpactJourney from "./components/user/ImpactJourney";
import DonorSpotlight from "./components/user/DonorSpotlight";
import WallOfHope from "./components/user/WallOfHope";
import UserProfile from "./components/user/UserProfile";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

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
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-center">
          <LoadingSpinner size="large" color="purple" />
          <p className="mt-4 text-gray-600 font-semibold">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* ====== ROUTES DE L'ÉQUIPE (avec Layout) ====== */}
          <Route
            path="/"
            element={
              <Layout user={user} onLogout={handleLogout}>
                <HomePage user={user} />
              </Layout>
            }
          />
          <Route
            path="/login"
            element={
              <Layout user={user} onLogout={handleLogout}>
                {user ? <Navigate to="/dashboard" replace /> : <Login setUser={setUser} />}
              </Layout>
            }
          />
          <Route
            path="/register"
            element={
              <Layout user={user} onLogout={handleLogout}>
                {user ? <Navigate to="/dashboard" replace /> : <Register />}
              </Layout>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Layout user={user} onLogout={handleLogout}>
                {user ? <Dashboard user={user} /> : <Navigate to="/login" replace />}
              </Layout>
            }
          />
          <Route
            path="/logout"
            element={
              <Layout user={user} onLogout={handleLogout}>
                <Logout setUser={setUser} />
              </Layout>
            }
          />
          <Route
            path="/donate"
            element={
              <Layout user={user} onLogout={handleLogout}>
                <DonationPage />
              </Layout>
            }
          />
          <Route
            path="/profile"
            element={
              <Layout user={user} onLogout={handleLogout}>
                {user ? <Profile user={user} /> : <Navigate to="/login" replace />}
              </Layout>
            }
          />

          {/* ====== TES ROUTES (SANS Layout) ====== */}
          <Route path="/role-select" element={<RoleSelect />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/donor/login" element={<DonorLogin />} />

          {/* ====== ADMIN PORTAL (SANS Layout) ====== */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute adminOnly>
                <>
                  <Navbar isAdmin={true} />
                  <AdminDashboard />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/donations"
            element={
              <ProtectedRoute adminOnly>
                <>
                  <Navbar isAdmin={true} />
                  <DonationManager />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/campaigns"
            element={
              <ProtectedRoute adminOnly>
                <>
                  <Navbar isAdmin={true} />
                  <CampaignManager />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/wall-of-hope"
            element={
              <ProtectedRoute adminOnly>
                <>
                  <Navbar isAdmin={true} />
                  <WallOfHopeManager />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute adminOnly>
                <>
                  <Navbar isAdmin={true} />
                  <UserManagement />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reports"
            element={
              <ProtectedRoute adminOnly>
                <>
                  <Navbar isAdmin={true} />
                  <ReportingCharts />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/live-event"
            element={
              <ProtectedRoute adminOnly>
                <LiveEventMode />
              </ProtectedRoute>
            }
          />
          <Route path="/matcher" element={<Matcher />} />

          {/* ====== DONOR PORTAL (SANS Layout) ====== */}
          <Route
            path="/portal/home"
            element={
              <ProtectedRoute>
                <>
                  <Navbar isAdmin={false} />
                  <UserHomePage />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/portal/donate"
            element={
              <ProtectedRoute>
                <>
                  <Navbar isAdmin={false} />
                  <DonationForm />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/portal/my-donations"
            element={
              <ProtectedRoute>
                <>
                  <Navbar isAdmin={false} />
                  <MyDonations />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/portal/my-impact"
            element={
              <ProtectedRoute>
                <>
                  <Navbar isAdmin={false} />
                  <ImpactJourney />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/portal/donor-spotlight"
            element={
              <ProtectedRoute>
                <>
                  <Navbar isAdmin={false} />
                  <DonorSpotlight />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/portal/wall-of-hope"
            element={
              <ProtectedRoute>
                <>
                  <Navbar isAdmin={false} />
                  <WallOfHope />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/portal/profile"
            element={
              <ProtectedRoute>
                <>
                  <Navbar isAdmin={false} />
                  <UserProfile />
                </>
              </ProtectedRoute>
            }
          />

          {/* ====== 404 ====== */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
