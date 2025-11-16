// ReportingCharts.jsx
import { Download, TrendingUp } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function ReportingCharts() {
  const monthlyData = [
    { month: 'Jan', amount: 32000, donors: 145 },
    { month: 'Fév', amount: 38000, donors: 167 },
    { month: 'Mar', amount: 41000, donors: 189 },
    { month: 'Avr', amount: 45780, donors: 324 },
  ];

  const donationTypes = [
    { name: 'Carte bancaire', value: 65, color: '#9333EA' },
    { name: 'Corporate', value: 25, color: '#EC4899' },
    { name: 'Cash', value: 10, color: '#10B981' },
  ];

  const campaignData = [
    { name: 'Winter Shelter', amount: 45780 },
    { name: 'Education Fund', amount: 22100 },
    { name: 'Emergency', amount: 48500 },
    { name: 'General', amount: 29400 },
  ];

  const downloadReport = () => {
    alert('Téléchargement du rapport PDF! 📊');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Rapports & Analyses</h1>
              <p className="text-gray-600">Statistiques détaillées des donations</p>
            </div>
            <button 
              onClick={downloadReport}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Télécharger PDF
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Monthly Trend */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Évolution mensuelle des donations</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="amount" stroke="#9333EA" strokeWidth={3} name="Montant ($)" />
              <Line type="monotone" dataKey="donors" stroke="#EC4899" strokeWidth={3} name="Donateurs" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Donation Types */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Répartition par type de don</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={donationTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {donationTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Campaign Performance */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Performance par campagne</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={campaignData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#9333EA" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportingCharts;