import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsAuthenticated(true);
      setIsAdmin(userData.role === 'admin');
    }
    setLoading(false);
  }, []);

  const login = async (email, password, role = 'donor') => {
    try {
      const mockUsers = {
        admin: {
          email: 'admin@shield.org',
          password: 'password123',
          role: 'admin',
          name: 'Admin Principal',
          id: 1
        },
        donor: {
          email: 'marie@email.com',
          password: 'password123',
          role: 'donor',
          name: 'Marie Leblanc',
          id: 2,
          totalDonated: 625,
          donationCount: 12
        }
      };

      await new Promise(resolve => setTimeout(resolve, 500));

      const mockUser = mockUsers[role];
      if (mockUser && email === mockUser.email && password === mockUser.password) {
        const userData = {
          id: mockUser.id,
          name: mockUser.name,
          email: mockUser.email,
          role: mockUser.role,
          totalDonated: mockUser.totalDonated || 0,
          donationCount: mockUser.donationCount || 0
        };

        setUser(userData);
        setIsAuthenticated(true);
        setIsAdmin(role === 'admin');
        localStorage.setItem('user', JSON.stringify(userData));

        return { success: true, user: userData };
      } else {
        return { success: false, error: 'Email ou mot de passe incorrect' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Une erreur est survenue' };
    }
  };

  const loginAsGuest = () => {
    const guestData = {
      id: 'guest',
      name: 'Invité',
      email: 'guest@shield.org',
      role: 'guest',
      totalDonated: 0,
      donationCount: 0
    };

    setUser(guestData);
    setIsAuthenticated(true);
    setIsAdmin(false);
    localStorage.setItem('user', JSON.stringify(guestData));

    return { success: true, user: guestData };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem('user');
  };

  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    return { success: true, user: updatedUser };
  };

  const recordDonation = (amount) => {
    if (user && user.role !== 'guest') {
      const updatedUser = {
        ...user,
        totalDonated: (user.totalDonated || 0) + amount,
        donationCount: (user.donationCount || 0) + 1
      };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return { success: true };
    }
    return { success: false };
  };

  const value = {
    user,
    isAuthenticated,
    isAdmin,
    loading,
    login,
    loginAsGuest,
    logout,
    updateProfile,
    recordDonation
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;