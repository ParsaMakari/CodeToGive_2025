import { Heart, Award, TrendingUp, Users } from 'lucide-react';

function DonorSpotlight() {
  const topDonors = [
    { name: 'Marie L.', amount: 2500, donations: 12, since: 'Jan 2024', photo: '👩', rank: 1, badge: '🏆' },
    { name: 'Tech Corp', amount: 5000, donations: 2, since: 'Mar 2024', photo: '🏢', rank: 2, badge: '🥈' },
    { name: 'Jean P.', amount: 1200, donations: 24, since: 'Feb 2024', photo: '👨', rank: 3, badge: '🥉' },
  ];

  const recentDonors = [
    { name: 'Sophie M.', amount: 150, time: '2 heures', photo: '👩', impact: 'helped fund 6 meals' },
    { name: 'Claire D.', amount: 75, time: '5 heures', photo: '👩', impact: 'provided 3 safe nights' },
    { name: 'Marc B.', amount: 200, time: '1 jour', photo: '👨', impact: 'funded 8 meals & shelter' },
    { name: 'Julie L.', amount: 100, time: '1 jour', photo: '👩', impact: 'helped 4 safe nights' },
    { name: 'Pierre M.', amount: 50, time: '2 jours', photo: '👨', impact: 'provided 5 meals' },
    { name: 'Sarah K.', amount: 300, time: '3 jours', photo: '👩', impact: 'funded workshops & meals' },
  ];

  const communityStats = {
    totalDonors: 324,
    activeMonthly: 87,
    corporatePartners: 12,
    averageDonation: 141
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <Award className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
          <h1 className="text-5xl font-black mb-4">Donor Spotlight</h1>
          <p className="text-2xl text-purple-100">
            Célébrons ensemble nos généreux contributeurs
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <Users className="w-10 h-10 text-purple-600 mx-auto mb-3" />
            <p className="text-4xl font-black text-gray-900 mb-1">{communityStats.totalDonors}</p>
            <p className="text-gray-600 font-semibold">Donateurs actifs</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <Heart className="w-10 h-10 text-pink-600 mx-auto mb-3" />
            <p className="text-4xl font-black text-gray-900 mb-1">{communityStats.activeMonthly}</p>
            <p className="text-gray-600 font-semibold">Dons mensuels</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <Award className="w-10 h-10 text-blue-600 mx-auto mb-3" />
            <p className="text-4xl font-black text-gray-900 mb-1">{communityStats.corporatePartners}</p>
            <p className="text-gray-600 font-semibold">Partenaires corp.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <TrendingUp className="w-10 h-10 text-green-600 mx-auto mb-3" />
            <p className="text-4xl font-black text-gray-900 mb-1">${communityStats.averageDonation}</p>
            <p className="text-gray-600 font-semibold">Don moyen</p>
          </div>
        </div>

        {/* Top Donors Podium */}
        <div className="mb-12">
          <h2 className="text-3xl font-black text-center mb-8">🏆 Top Contributeurs ce Mois</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {topDonors.map((donor) => (
              <div 
                key={donor.rank}
                className={`bg-white rounded-2xl shadow-2xl p-8 text-center transform hover:scale-105 transition ${
                  donor.rank === 1 ? 'md:-mt-4 border-4 border-yellow-400' : ''
                }`}
              >
                <div className="text-6xl mb-4">{donor.badge}</div>
                <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4 text-5xl">
                  {donor.photo}
                </div>
                <h3 className="text-2xl font-black mb-2">{donor.name}</h3>
                <p className="text-4xl font-black text-green-600 mb-4">
                  ${donor.amount.toLocaleString()}
                </p>
                <div className="space-y-2 text-gray-600">
                  <p className="font-semibold">{donor.donations} donations</p>
                  <p className="text-sm">Donateur depuis {donor.since}</p>
                </div>
                <div className={`mt-6 px-4 py-2 rounded-full font-bold ${
                  donor.rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                  donor.rank === 2 ? 'bg-gray-100 text-gray-800' :
                  'bg-orange-100 text-orange-800'
                }`}>
                  #{donor.rank} Contributeur
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Contributors */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-3xl font-black mb-8 text-center">💜 Contributions Récentes</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentDonors.map((donor, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 hover:shadow-lg transition"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-3xl">
                    {donor.photo}
                  </div>
                  <div>
                    <p className="font-bold text-lg">{donor.name}</p>
                    <p className="text-sm text-gray-600">Il y a {donor.time}</p>
                  </div>
                </div>
                <p className="text-3xl font-black text-green-600 mb-3">
                  ${donor.amount}
                </p>
                <p className="text-gray-700 italic">
                  "{donor.impact}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl shadow-2xl p-12 text-center text-white">
          <Heart className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
          <h2 className="text-4xl font-black mb-4">
            Rejoignez notre communauté de donateurs!
          </h2>
          <p className="text-xl mb-8 text-purple-100 max-w-2xl mx-auto">
            Chaque contribution compte. Ensemble, nous créons un impact durable pour les femmes et familles dans le besoin.
          </p>
          <button className="bg-white text-purple-600 px-12 py-4 rounded-full text-xl font-bold hover:bg-purple-50 transition transform hover:scale-105 shadow-xl">
            Faire un don maintenant →
          </button>
        </div>
      </div>
    </div>
  );
}

export default DonorSpotlight;