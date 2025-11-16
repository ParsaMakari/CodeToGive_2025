import { useState, useEffect } from 'react';
import { DollarSign, Users, TrendingUp, Target } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function AdminDashboard() {
  const [stats, setStats] = useState({
    todayDonations: 2450,
    monthDonations: 45780,
    totalDonors: 324,
    avgDonation: 141,
    campaignProgress: 67
  });

  const [recentDonations, setRecentDonations] = useState([
    { id: 1, donor: 'Marie L.', amount: 250, time: '2 min ago', type: 'card' },
    { id: 2, donor: 'Anonymous', amount: 100, time: '15 min ago', type: 'cash' },
    { id: 3, donor: 'Corporate - Bell', amount: 5000, time: '1h ago', type: 'corporate' },
    { id: 4, donor: 'Jean P.', amount: 50, time: '2h ago', type: 'card' },
  ]);

  const monthlyData = [
    { name: 'Jan', amount: 32000 },
    { name: 'Feb', amount: 38000 },
    { name: 'Mar', amount: 41000 },
    { name: 'Apr', amount: 45780 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Shield of Athena - Gestion des dons</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard 
            title="Dons aujourd'hui"
            value={`$${stats.todayDonations.toLocaleString()}`}
            icon={<DollarSign className="w-8 h-8" />}
            color="bg-green-500"
          />
          <StatsCard 
            title="Dons ce mois"
            value={`$${stats.monthDonations.toLocaleString()}`}
            icon={<TrendingUp className="w-8 h-8" />}
            color="bg-blue-500"
          />
          <StatsCard 
            title="Total donateurs"
            value={stats.totalDonors}
            icon={<Users className="w-8 h-8" />}
            color="bg-purple-500"
          />
          <StatsCard 
            title="Don moyen"
            value={`$${stats.avgDonation}`}
            icon={<Target className="w-8 h-8" />}
            color="bg-pink-500"
          />
        </div>

        {/* Campaign Progress */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Campagne Active: Winter Shelter Goal</h2>
          <div className="mb-2 flex justify-between text-sm">
            <span>Progrès: ${Math.round(45780 * 0.67).toLocaleString()} / $68,000</span>
            <span className="font-semibold">{stats.campaignProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${stats.campaignProgress}%` }}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Monthly Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Donations mensuelles</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#9333EA" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Donations */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Derniers dons</h2>
            <div className="space-y-4">
              {recentDonations.map(donation => (
                <div key={donation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold">{donation.donor}</p>
                    <p className="text-sm text-gray-600">{donation.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">${donation.amount}</p>
                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                      {donation.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatsCard({ title, value, icon, color }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className={`${color} text-white p-3 rounded-lg`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;