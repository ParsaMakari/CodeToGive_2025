import { useState } from 'react';
import { Search, Filter, Download, Plus, Edit, Trash2, DollarSign } from 'lucide-react';

function DonationManager() {
  const [donations, setDonations] = useState([
    { id: 1, donor: 'Marie Leblanc', email: 'marie@email.com', amount: 250, date: '2024-11-15', type: 'card', status: 'completed', campaign: 'Winter Shelter' },
    { id: 2, donor: 'Anonymous', email: 'anonymous@shield.org', amount: 100, date: '2024-11-15', type: 'cash', status: 'completed', campaign: 'General' },
    { id: 3, donor: 'Bell Canada', email: 'corporate@bell.ca', amount: 5000, date: '2024-11-14', type: 'corporate', status: 'completed', campaign: 'Winter Shelter' },
    { id: 4, donor: 'Jean Pierre', email: 'jean@email.com', amount: 50, date: '2024-11-14', type: 'card', status: 'pending', campaign: 'General' },
    { id: 5, donor: 'Sophie Martin', email: 'sophie@email.com', amount: 150, date: '2024-11-13', type: 'card', status: 'completed', campaign: 'Education Fund' },
    { id: 6, donor: 'Tech Corp', email: 'donations@techcorp.com', amount: 2500, date: '2024-11-13', type: 'corporate', status: 'completed', campaign: 'Winter Shelter' },
    { id: 7, donor: 'Claire Dubois', email: 'claire@email.com', amount: 75, date: '2024-11-12', type: 'card', status: 'completed', campaign: 'General' },
    { id: 8, donor: 'Anonymous', email: 'anonymous@shield.org', amount: 200, date: '2024-11-12', type: 'cash', status: 'completed', campaign: 'Education Fund' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredDonations = donations.filter(d => {
    const matchesSearch = d.donor.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         d.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || d.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const totalAmount = filteredDonations.reduce((sum, d) => sum + d.amount, 0);

  const exportToExcel = () => {
    alert('Export vers Excel simulé! 📊');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gestion des Dons</h1>
              <p className="text-gray-600">Gérer et suivre tous les dons</p>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Ajouter un don manuel
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">Total (filtre actuel)</p>
            <p className="text-3xl font-bold text-green-600">${totalAmount.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">Nombre de dons</p>
            <p className="text-3xl font-bold">{filteredDonations.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">Don moyen</p>
            <p className="text-3xl font-bold">${Math.round(totalAmount / filteredDonations.length)}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">En attente</p>
            <p className="text-3xl font-bold text-orange-600">
              {donations.filter(d => d.status === 'pending').length}
            </p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
              <input 
                type="text"
                placeholder="Rechercher par nom ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Filter by type */}
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="all">Tous les types</option>
              <option value="card">Carte</option>
              <option value="cash">Cash</option>
              <option value="corporate">Corporate</option>
            </select>

            {/* Export */}
            <button 
              onClick={exportToExcel}
              className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Export Excel
            </button>
          </div>
        </div>

        {/* Donations Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Donateur</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Montant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Campagne</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredDonations.map((donation) => (
                <tr key={donation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{donation.donor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{donation.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-green-600 font-bold">${donation.amount}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{donation.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      donation.type === 'corporate' ? 'bg-blue-100 text-blue-800' :
                      donation.type === 'cash' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {donation.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{donation.campaign}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      donation.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {donation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Manual Donation Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">Ajouter un don manuel</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nom du donateur</label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input type="email" className="w-full px-4 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Montant</label>
                <input type="number" className="w-full px-4 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select className="w-full px-4 py-2 border rounded-lg">
                  <option value="cash">Cash</option>
                  <option value="card">Carte</option>
                  <option value="corporate">Corporate</option>
                </select>
              </div>
              <div className="flex gap-4 mt-6">
                <button 
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-200 py-2 rounded-lg font-semibold hover:bg-gray-300"
                >
                  Annuler
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DonationManager;