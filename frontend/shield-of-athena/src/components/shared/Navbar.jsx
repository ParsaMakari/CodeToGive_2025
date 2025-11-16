import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Heart, BarChart3, User, LogOut, Shield, Menu, X } from 'lucide-react';
import { useState } from 'react';

function Navbar({ isAdmin = false }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const userNavItems = [
    { path: '/home', label: 'Accueil', icon: <Home className="w-5 h-5" /> },
    { path: '/donate', label: 'Faire un don', icon: <Heart className="w-5 h-5" /> },
    { path: '/my-donations', label: 'Mes dons', icon: <BarChart3 className="w-5 h-5" /> },
    { path: '/my-impact', label: 'Mon impact', icon: <BarChart3 className="w-5 h-5" /> },
    { path: '/donor-spotlight', label: 'Donateurs', icon: <User className="w-5 h-5" /> },
    { path: '/wall-of-hope', label: 'Wall of Hope', icon: <Heart className="w-5 h-5" /> },
    { path: '/profile', label: 'Profil', icon: <User className="w-5 h-5" /> },
  ];

  const adminNavItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: <Home className="w-5 h-5" /> },
    { path: '/admin/donations', label: 'Dons', icon: <Heart className="w-5 h-5" /> },
    { path: '/admin/campaigns', label: 'Campagnes', icon: <BarChart3 className="w-5 h-5" /> },
    { path: '/admin/wall-of-hope', label: 'Wall of Hope', icon: <Heart className="w-5 h-5" /> },
    { path: '/admin/users', label: 'Utilisateurs', icon: <User className="w-5 h-5" /> },
    { path: '/admin/reports', label: 'Rapports', icon: <BarChart3 className="w-5 h-5" /> },
    { path: '/admin/live-event', label: 'Mode Live', icon: <Shield className="w-5 h-5" /> },
  ];

  const navItems = isAdmin ? adminNavItems : userNavItems;

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div
              onClick={() => navigate('/')}
              className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-black text-gray-900">Shield of Athena</h1>
                <p className="text-xs text-gray-600">
                  {isAdmin ? 'Admin Portal' : 'Donor Portal'}
                </p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
                    isActive(item.path)
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
              
              {/* Logout */}
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-red-600 hover:bg-red-50 transition ml-2"
              >
                <LogOut className="w-5 h-5" />
                <span>Quitter</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b shadow-lg">
          <div className="px-4 py-2 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition ${
                  isActive(item.path)
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
            <button
              onClick={() => {
                navigate('/');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-red-600 hover:bg-red-50 transition"
            >
              <LogOut className="w-5 h-5" />
              <span>Quitter</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;