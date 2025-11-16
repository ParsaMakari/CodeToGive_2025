import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, TrendingUp, Users, Home, Utensils, GraduationCap, ArrowRight } from 'lucide-react';

function HomePage() {
  const navigate = useNavigate();
  const [donationAmount, setDonationAmount] = useState(100);

  const totalImpact = {
    totalRaised: 145780,
    donorsCount: 324,
    nightsSheltered: 5831,
    mealsServed: 14578,
    workshopsProvided: 291
  };

  const activeCampaign = {
    name: 'Winter Shelter Goal',
    raised: 45780,
    goal: 68000,
    daysLeft: 46
  };

  const calculateImpact = (amount) => {
    return {
      nights: Math.floor(amount / 25),
      meals: Math.floor(amount / 10),
      workshops: Math.floor(amount / 50)
    };
  };

  const impact = calculateImpact(donationAmount);
  const progress = Math.round((activeCampaign.raised / activeCampaign.goal) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-6">
              Transformez des vies avec <span className="text-yellow-300">Shield of Athena</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100">
              Chaque don compte. Ensemble, nous créons un refuge d'espoir.
            </p>
            <button 
              onClick={() => navigate('/donate')}
              className="bg-yellow-400 text-purple-900 px-12 py-4 rounded-full text-xl font-bold hover:bg-yellow-300 transform hover:scale-105 transition shadow-2xl"
            >
              Faire un don maintenant 💜
            </button>
          </div>
        </div>
      </div>

      {/* Impact Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center transform hover:scale-105 transition">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-3xl md:text-4xl font-black text-gray-900 mb-1">
              ${totalImpact.totalRaised.toLocaleString()}
            </p>
            <p className="text-gray-600 font-semibold">Total collecté</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 text-center transform hover:scale-105 transition">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-3xl md:text-4xl font-black text-gray-900 mb-1">
              {totalImpact.donorsCount}
            </p>
            <p className="text-gray-600 font-semibold">Généreux donateurs</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 text-center transform hover:scale-105 transition">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Home className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-3xl md:text-4xl font-black text-gray-900 mb-1">
              {totalImpact.nightsSheltered.toLocaleString()}
            </p>
            <p className="text-gray-600 font-semibold">Nuits en refuge</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 text-center transform hover:scale-105 transition">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Utensils className="w-8 h-8 text-pink-600" />
            </div>
            <p className="text-3xl md:text-4xl font-black text-gray-900 mb-1">
              {totalImpact.mealsServed.toLocaleString()}
            </p>
            <p className="text-gray-600 font-semibold">Repas servis</p>
          </div>
        </div>
      </div>

      {/* Active Campaign */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-white">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-3xl font-black">🏠 {activeCampaign.name}</h2>
              <span className="bg-yellow-400 text-purple-900 px-4 py-2 rounded-full font-bold">
                {activeCampaign.daysLeft} jours restants
              </span>
            </div>
            <p className="text-xl text-purple-100">
              Aidez-nous à fournir un refuge sûr cet hiver
            </p>
          </div>

          <div className="p-8">
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-2xl font-bold text-gray-900">
                  ${activeCampaign.raised.toLocaleString()}
                </span>
                <span className="text-lg text-gray-600">
                  sur ${activeCampaign.goal.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-6">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-6 rounded-full transition-all duration-500 flex items-center justify-end pr-4"
                  style={{ width: `${progress}%` }}
                >
                  <span className="text-white font-bold text-sm">{progress}%</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => navigate('/donate')}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition"
            >
              Contribuer à cette campagne →
            </button>
          </div>
        </div>
      </div>

      {/* Impact Simulator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <h2 className="text-4xl font-black text-center mb-4">
            Simulez votre impact 💫
          </h2>
          <p className="text-xl text-gray-600 text-center mb-8">
            Bougez le curseur pour voir comment votre don change des vies
          </p>

          {/* Slider */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="text-center mb-6">
              <span className="text-6xl font-black text-purple-600">
                ${donationAmount}
              </span>
            </div>
            <input 
              type="range"
              min="25"
              max="1000"
              step="25"
              value={donationAmount}
              onChange={(e) => setDonationAmount(Number(e.target.value))}
              className="w-full h-3 bg-purple-200 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #9333EA 0%, #EC4899 ${(donationAmount / 1000) * 100}%, #E9D5FF ${(donationAmount / 1000) * 100}%, #E9D5FF 100%)`
              }}
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>$25</span>
              <span>$1000</span>
            </div>
          </div>

          {/* Impact Breakdown */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 text-center">
              <Home className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <p className="text-5xl font-black text-blue-600 mb-2">
                {impact.nights}
              </p>
              <p className="text-lg font-semibold text-gray-700">
                Nuits en refuge sécurisé
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 text-center">
              <Utensils className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <p className="text-5xl font-black text-green-600 mb-2">
                {impact.meals}
              </p>
              <p className="text-lg font-semibold text-gray-700">
                Repas chauds et nutritifs
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 text-center">
              <GraduationCap className="w-12 h-12 text-purple-600 mx-auto mb-3" />
              <p className="text-5xl font-black text-purple-600 mb-2">
                {impact.workshops}
              </p>
              <p className="text-lg font-semibold text-gray-700">
                Heures d'accompagnement
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <button 
              onClick={() => navigate('/donate')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-4 rounded-full text-xl font-bold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition shadow-xl"
            >
              Faire ce don maintenant →
            </button>
          </div>
        </div>
      </div>

      {/* Recent Messages */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-black text-center mb-12">
          Messages d'espoir 💜
        </h2>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { author: 'Marie L.', message: 'Ensemble, nous pouvons faire la différence!', emoji: '💜' },
            { author: 'Jean P.', message: 'Fier de supporter cette cause importante!', emoji: '❤️' },
            { author: 'Sophie M.', message: 'Continuez votre travail incroyable!', emoji: '✨' }
          ].map((msg, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
              <p className="text-3xl mb-4">{msg.emoji}</p>
              <p className="text-lg text-gray-700 mb-4 italic">"{msg.message}"</p>
              <p className="font-bold text-purple-600">- {msg.author}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button 
            onClick={() => navigate('/wall-of-hope')}
            className="bg-pink-600 text-white px-8 py-3 rounded-full font-bold hover:bg-pink-700 transition inline-flex items-center gap-2"
          >
            Voir tous les messages
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;