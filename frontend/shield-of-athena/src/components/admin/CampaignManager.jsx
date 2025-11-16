import { useState } from 'react';
import { Plus, Edit, Trash2, Copy, TrendingUp, Calendar, DollarSign } from 'lucide-react';

function CampaignManager() {
  const [campaigns, setCampaigns] = useState([
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
    },
    {
      id: 3,
      name: 'Emergency Response',
      description: 'Fonds d\'urgence pour crises',
      goal: 50000,
      raised: 48500,
      startDate: '2024-09-01',
      endDate: '2024-11-30',
      status: 'ending-soon',
      image: '🚨'
    },
    {
      id: 4,
      name: 'Summer Camp 2024',
      description: 'Camp d\'été pour enfants',
      goal: 25000,
      raised: 25000,
      startDate: '2024-05-01',
      endDate: '2024-08-31',
      status: 'completed',
      image: '☀️'
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);

  const getProgressPercentage = (raised, goal) => {
    return Math.min(Math.round((raised / goal) * 100), 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gestion des Campagnes</h1>
              <p className="text-gray-600">Créer et gérer vos campagnes de financement</p>
            </div>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Nouvelle campagne
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Campagnes actives</p>
                <p className="text-3xl font-bold text-green-600">
                  {campaigns.filter(c => c.status === 'active').length}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total objectif</p>
                <p className="text-3xl font-bold">
                  ${campaigns.reduce((sum, c) => sum + c.goal, 0).toLocaleString()}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total collecté</p>
                <p className="text-3xl font-bold text-green-600">
                  ${campaigns.reduce((sum, c) => sum + c.raised, 0).toLocaleString()}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Taux de succès</p>
                <p className="text-3xl font-bold text-blue-600">
                  {Math.round((campaigns.reduce((sum, c) => sum + c.raised, 0) / 
                               campaigns.reduce((sum, c) => sum + c.goal, 0)) * 100)}%
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Campaigns Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              {/* Campaign Header */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{campaign.image}</span>
                    <div>
                      <h3 className="text-xl font-bold">{campaign.name}</h3>
                      <p className="text-purple-100 text-sm">{campaign.description}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    campaign.status === 'active' ? 'bg-green-500' :
                    campaign.status === 'ending-soon' ? 'bg-orange-500' :
                    'bg-gray-500'
                  }`}>
                    {campaign.status === 'active' ? 'Active' :
                     campaign.status === 'ending-soon' ? 'Fin proche' :
                     'Complétée'}
                  </span>
                </div>
              </div>

              {/* Campaign Body */}
              <div className="p-6">
                {/* Progress */}
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Progression</span>
                    <span className="text-sm font-bold text-purple-600">
                      {getProgressPercentage(campaign.raised, campaign.goal)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${getProgressPercentage(campaign.raised, campaign.goal)}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-lg font-bold text-green-600">
                      ${campaign.raised.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-600">
                      sur ${campaign.goal.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Dates */}
                <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{campaign.startDate}</span>
                  </div>
                  <span>→</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{campaign.endDate}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 bg-purple-100 text-purple-700 py-2 rounded-lg font-semibold hover:bg-purple-200 flex items-center justify-center gap-2">
                    <Edit className="w-4 h-4" />
                    Modifier
                  </button>
                  <button className="flex-1 bg-blue-100 text-blue-700 py-2 rounded-lg font-semibold hover:bg-blue-200 flex items-center justify-center gap-2">
                    <Copy className="w-4 h-4" />
                    Dupliquer
                  </button>
                  <button className="bg-red-100 text-red-700 p-2 rounded-lg hover:bg-red-200">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">Créer une nouvelle campagne</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nom de la campagne</label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg" placeholder="Ex: Spring Fundraiser" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea className="w-full px-4 py-2 border rounded-lg" rows="3" placeholder="Décrivez votre campagne..."></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Objectif ($)</label>
                <input type="number" className="w-full px-4 py-2 border rounded-lg" placeholder="50000" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Date début</label>
                  <input type="date" className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Date fin</label>
                  <input type="date" className="w-full px-4 py-2 border rounded-lg" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Emoji/Icon</label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg" placeholder="🎯" />
              </div>
              <div className="flex gap-4 mt-6">
                <button 
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 bg-gray-200 py-3 rounded-lg font-semibold hover:bg-gray-300"
                >
                  Annuler
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700"
                >
                  Créer la campagne
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CampaignManager;