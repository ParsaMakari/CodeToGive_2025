// Base URL pour l'API (pour un vrai backend)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Fonction helper pour simuler un délai réseau
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Fonction helper pour gérer les erreurs
const handleError = (error) => {
  console.error('API Error:', error);
  return {
    success: false,
    error: error.message || 'Une erreur est survenue'
  };
};

// ========================================
// AUTHENTICATION
// ========================================

export const authAPI = {
  // Login
  login: async (email, password, role) => {
    try {
      await delay();
      
      // Mock users database
      const mockUsers = {
        'admin@shield.org': {
          id: 1,
          email: 'admin@shield.org',
          password: 'password123',
          name: 'Admin Principal',
          role: 'admin'
        },
        'marie@email.com': {
          id: 2,
          email: 'marie@email.com',
          password: 'password123',
          name: 'Marie Leblanc',
          role: 'donor',
          totalDonated: 625,
          donationCount: 12
        }
      };

      const user = mockUsers[email];
      
      if (!user || user.password !== password) {
        throw new Error('Email ou mot de passe incorrect');
      }

      if (role === 'admin' && user.role !== 'admin') {
        throw new Error('Accès administrateur refusé');
      }

      // Remove password from response
      const { password: _, ...userData } = user;
      
      return {
        success: true,
        data: userData,
        token: 'mock-jwt-token-' + user.id
      };
    } catch (error) {
      return handleError(error);
    }
  },

  // Register (future feature)
  register: async (userData) => {
    try {
      await delay();
      return {
        success: true,
        data: {
          id: Date.now(),
          ...userData,
          role: 'donor',
          totalDonated: 0,
          donationCount: 0
        }
      };
    } catch (error) {
      return handleError(error);
    }
  },

  // Forgot password
  forgotPassword: async (email) => {
    try {
      await delay();
      return {
        success: true,
        message: 'Email de réinitialisation envoyé'
      };
    } catch (error) {
      return handleError(error);
    }
  }
};

// ========================================
// DONATIONS
// ========================================

export const donationsAPI = {
  // Get all donations
  getAll: async (filters = {}) => {
    try {
      await delay();
      
      let donations = [
        { id: 1, donor: 'Marie Leblanc', email: 'marie@email.com', amount: 250, date: '2024-11-15', type: 'card', status: 'completed', campaign: 'Winter Shelter' },
        { id: 2, donor: 'Anonymous', email: 'anonymous@shield.org', amount: 100, date: '2024-11-15', type: 'cash', status: 'completed', campaign: 'General' },
        { id: 3, donor: 'Bell Canada', email: 'corporate@bell.ca', amount: 5000, date: '2024-11-14', type: 'corporate', status: 'completed', campaign: 'Winter Shelter' },
        { id: 4, donor: 'Jean Pierre', email: 'jean@email.com', amount: 50, date: '2024-11-14', type: 'card', status: 'pending', campaign: 'General' },
        { id: 5, donor: 'Sophie Martin', email: 'sophie@email.com', amount: 150, date: '2024-11-13', type: 'card', status: 'completed', campaign: 'Education Fund' },
      ];

      // Apply filters
      if (filters.type && filters.type !== 'all') {
        donations = donations.filter(d => d.type === filters.type);
      }
      if (filters.search) {
        donations = donations.filter(d => 
          d.donor.toLowerCase().includes(filters.search.toLowerCase()) ||
          d.email.toLowerCase().includes(filters.search.toLowerCase())
        );
      }

      return {
        success: true,
        data: donations
      };
    } catch (error) {
      return handleError(error);
    }
  },

  // Get donation by ID
  getById: async (id) => {
    try {
      await delay();
      return {
        success: true,
        data: {
          id,
          donor: 'Marie Leblanc',
          amount: 250,
          date: '2024-11-15',
          type: 'card',
          campaign: 'Winter Shelter'
        }
      };
    } catch (error) {
      return handleError(error);
    }
  },

  // Create donation
  create: async (donationData) => {
    try {
      await delay();
      
      const newDonation = {
        id: Date.now(),
        ...donationData,
        date: new Date().toISOString().split('T')[0],
        status: 'completed'
      };

      return {
        success: true,
        data: newDonation,
        message: 'Don enregistré avec succès!'
      };
    } catch (error) {
      return handleError(error);
    }
  },

  // Update donation
  update: async (id, donationData) => {
    try {
      await delay();
      return {
        success: true,
        data: { id, ...donationData },
        message: 'Don mis à jour avec succès!'
      };
    } catch (error) {
      return handleError(error);
    }
  },

  // Delete donation
  delete: async (id) => {
    try {
      await delay();
      return {
        success: true,
        message: 'Don supprimé avec succès!'
      };
    } catch (error) {
      return handleError(error);
    }
  },

  // Get user donations
  getUserDonations: async (userId) => {
    try {
      await delay();
      return {
        success: true,
        data: [
          { id: 1, amount: 250, date: '2024-11-15', campaign: 'Winter Shelter', type: 'one-time', status: 'completed' },
          { id: 2, amount: 50, date: '2024-11-01', campaign: 'General', type: 'monthly', status: 'recurring' },
          { id: 3, amount: 100, date: '2024-10-15', campaign: 'Education Fund', type: 'one-time', status: 'completed' },
        ]
      };
    } catch (error) {
      return handleError(error);
    }
  }
};

// ========================================
// CAMPAIGNS
// ========================================

export const campaignsAPI = {
  // Get all campaigns
  getAll: async () => {
    try {
      await delay();
      return {
        success: true,
        data: [
          {
            id: 1,
            name: 'Winter Shelter Goal',
            description: 'Fournir un refuge chaud cet hiver',
            goal: 68000,
            raised: 45780,
            startDate: '2024-11-01',
            endDate: '2024-12-31',
            status: 'active',
            image: '🏠'
          },
          {
            id: 2,
            name: 'Education Fund 2025',
            description: 'Programmes éducatifs pour les enfants',
            goal: 35000,
            raised: 22100,
            startDate: '2024-10-15',
            endDate: '2025-03-31',
            status: 'active',
            image: '📚'
          }
        ]
      };
    } catch (error) {
      return handleError(error);
    }
  },

  // Create campaign
  create: async (campaignData) => {
    try {
      await delay();
      return {
        success: true,
        data: {
          id: Date.now(),
          ...campaignData,
          raised: 0,
          status: 'active'
        },
        message: 'Campagne créée avec succès!'
      };
    } catch (error) {
      return handleError(error);
    }
  },

  // Update campaign
  update: async (id, campaignData) => {
    try {
      await delay();
      return {
        success: true,
        data: { id, ...campaignData },
        message: 'Campagne mise à jour!'
      };
    } catch (error) {
      return handleError(error);
    }
  },

  // Delete campaign
  delete: async (id) => {
    try {
      await delay();
      return {
        success: true,
        message: 'Campagne supprimée!'
      };
    } catch (error) {
      return handleError(error);
    }
  }
};

// ========================================
// WALL OF HOPE (Messages)
// ========================================

export const messagesAPI = {
  // Get all messages
  getAll: async (status = 'all') => {
    try {
      await delay();
      
      let messages = [
        { id: 1, author: 'Marie L.', message: 'Ensemble, nous pouvons faire la différence! 💜', status: 'approved', date: '2024-11-15', photo: true, likes: 24 },
        { id: 2, author: 'Anonymous', message: 'Merci pour tout ce que vous faites.', status: 'approved', date: '2024-11-15', photo: false, likes: 18 },
        { id: 3, author: 'Jean P.', message: 'Fier de supporter cette cause!', status: 'pending', date: '2024-11-14', photo: true, likes: 0 },
      ];

      if (status !== 'all') {
        messages = messages.filter(m => m.status === status);
      }

      return {
        success: true,
        data: messages
      };
    } catch (error) {
      return handleError(error);
    }
  },

  // Submit message
  submit: async (messageData) => {
    try {
      await delay();
      return {
        success: true,
        data: {
          id: Date.now(),
          ...messageData,
          status: 'pending',
          date: new Date().toISOString().split('T')[0],
          likes: 0
        },
        message: 'Message soumis pour approbation!'
      };
    } catch (error) {
      return handleError(error);
    }
  },

  // Approve message
  approve: async (id) => {
    try {
      await delay();
      return {
        success: true,
        message: 'Message approuvé!'
      };
    } catch (error) {
      return handleError(error);
    }
  },

  // Reject message
  reject: async (id) => {
    try {
      await delay();
      return {
        success: true,
        message: 'Message rejeté!'
      };
    } catch (error) {
      return handleError(error);
    }
  },

  // Delete message
  delete: async (id) => {
    try {
      await delay();
      return {
        success: true,
        message: 'Message supprimé!'
      };
    } catch (error) {
      return handleError(error);
    }
  }
};

// ========================================
// USERS (Admin management)
// ========================================

export const usersAPI = {
  // Get all users
  getAll: async () => {
    try {
      await delay();
      return {
        success: true,
        data: [
          { id: 1, name: 'Admin Principal', email: 'admin@shield.org', role: 'Full Admin', lastLogin: '2024-11-15 14:30', status: 'active' },
          { id: 2, name: 'Marie Coordinator', email: 'marie@shield.org', role: 'Editor', lastLogin: '2024-11-15 09:15', status: 'active' },
        ]
      };
    } catch (error) {
      return handleError(error);
    }
  },

  // Create user
  create: async (userData) => {
    try {
      await delay();
      return {
        success: true,
        data: {
          id: Date.now(),
          ...userData,
          status: 'active'
        },
        message: 'Utilisateur créé!'
      };
    } catch (error) {
      return handleError(error);
    }
  },

  // Update user
  update: async (id, userData) => {
    try {
      await delay();
      return {
        success: true,
        message: 'Utilisateur mis à jour!'
      };
    } catch (error) {
      return handleError(error);
    }
  },

  // Delete user
  delete: async (id) => {
    try {
      await delay();
      return {
        success: true,
        message: 'Utilisateur supprimé!'
      };
    } catch (error) {
      return handleError(error);
    }
  }
};

// ========================================
// STATISTICS / REPORTS
// ========================================

export const statsAPI = {
  // Get dashboard stats
  getDashboard: async () => {
    try {
      await delay();
      return {
        success: true,
        data: {
          todayDonations: 2450,
          monthDonations: 45780,
          totalDonors: 324,
          avgDonation: 141,
          campaignProgress: 67
        }
      };
    } catch (error) {
      return handleError(error);
    }
  },

  // Get monthly data
  getMonthly: async () => {
    try {
      await delay();
      return {
        success: true,
        data: [
          { month: 'Jan', amount: 32000, donors: 145 },
          { month: 'Fév', amount: 38000, donors: 167 },
          { month: 'Mar', amount: 41000, donors: 189 },
          { month: 'Avr', amount: 45780, donors: 324 },
        ]
      };
    } catch (error) {
      return handleError(error);
    }
  },

  // Export report
  exportReport: async (format = 'pdf') => {
    try {
      await delay();
      return {
        success: true,
        message: `Rapport ${format.toUpperCase()} généré!`,
        downloadUrl: '/downloads/report.pdf'
      };
    } catch (error) {
      return handleError(error);
    }
  }
};

// ========================================
// IMPACT CALCULATIONS
// ========================================

export const impactAPI = {
  // Calculate impact from amount
  calculate: (amount) => {
    return {
      nights: Math.floor(amount / 25),
      meals: Math.floor(amount / 10),
      workshops: Math.floor(amount / 50)
    };
  },

  // Get user total impact
  getUserImpact: async (userId) => {
    try {
      await delay();
      const totalDonated = 625; // Mock data
      return {
        success: true,
        data: {
          totalDonated,
          ...impactAPI.calculate(totalDonated)
        }
      };
    } catch (error) {
      return handleError(error);
    }
  }
};

// Export all APIs
export default {
  auth: authAPI,
  donations: donationsAPI,
  campaigns: campaignsAPI,
  messages: messagesAPI,
  users: usersAPI,
  stats: statsAPI,
  impact: impactAPI
};