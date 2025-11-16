import { useState, useEffect } from 'react';
import { Sparkles, Volume2, Trophy, Heart } from 'lucide-react';

function LiveEventMode() {
  const [isLive, setIsLive] = useState(false);
  const [totalRaised, setTotalRaised] = useState(45780);
  const [goalAmount] = useState(68000);
  const [recentDonors, setRecentDonors] = useState([
    { name: 'Marie L.', amount: 250, time: Date.now() - 120000 },
    { name: 'Jean P.', amount: 100, time: Date.now() - 300000 },
    { name: 'Sophie M.', amount: 500, time: Date.now() - 600000 },
  ]);

  // Simulate new donations every 5-10 seconds when live
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      const donors = ['Alex T.', 'Claire D.', 'Marc B.', 'Julie L.', 'François R.', 'Anonymous', 'Sarah K.', 'Pierre M.'];
      const amounts = [25, 50, 75, 100, 150, 200, 250, 500, 1000];
      
      const newDonor = {
        name: donors[Math.floor(Math.random() * donors.length)],
        amount: amounts[Math.floor(Math.random() * amounts.length)],
        time: Date.now()
      };

      setRecentDonors(prev => [newDonor, ...prev].slice(0, 10));
      setTotalRaised(prev => prev + newDonor.amount);

      // Big donation celebration
      if (newDonor.amount >= 200) {
        triggerConfetti();
        playSound();
      }
    }, Math.random() * 5000 + 5000); // 5-10 seconds

    return () => clearInterval(interval);
  }, [isLive]);

  const triggerConfetti = () => {
    // Visual celebration
    console.log('🎉 CONFETTI!');
  };

  const playSound = () => {
    console.log('🔔 DING!');
  };

  const progressPercentage = Math.min(Math.round((totalRaised / goalAmount) * 100), 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600">
      {/* Control Panel */}
      <div className="bg-black bg-opacity-30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-yellow-300" />
              <h1 className="text-2xl font-bold text-white">Live Event Mode</h1>
              {isLive && (
                <span className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full animate-pulse">
                  ● LIVE
                </span>
              )}
            </div>
            <button 
              onClick={() => setIsLive(!isLive)}
              className={`px-8 py-3 rounded-lg font-bold text-lg transition ${
                isLive 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isLive ? 'Arrêter le mode Live' : 'Activer le mode Live'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Display */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Giant Progress Display */}
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-12 mb-8 border-4 border-white border-opacity-20">
          <div className="text-center mb-8">
            <h2 className="text-6xl font-black text-white mb-4">
              ${totalRaised.toLocaleString()}
            </h2>
            <p className="text-3xl text-purple-100">
              sur ${goalAmount.toLocaleString()}
            </p>
            <p className="text-xl text-purple-200 mt-2">
              Winter Shelter Goal 2024
            </p>
          </div>

          {/* Giant Progress Bar */}
          <div className="relative">
            <div className="w-full bg-white bg-opacity-20 rounded-full h-12 overflow-hidden">
              <div 
                className="h-12 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-full transition-all duration-1000 flex items-center justify-end pr-6"
                style={{ width: `${progressPercentage}%` }}
              >
                <span className="text-white font-bold text-2xl drop-shadow-lg">
                  {progressPercentage}%
                </span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-12 text-center">
            <div className="bg-white bg-opacity-10 rounded-xl p-6">
              <Trophy className="w-12 h-12 text-yellow-300 mx-auto mb-3" />
              <p className="text-4xl font-bold text-white mb-1">
                {recentDonors.length}
              </p>
              <p className="text-purple-200">Dons récents</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-xl p-6">
              <Heart className="w-12 h-12 text-pink-300 mx-auto mb-3" />
              <p className="text-4xl font-bold text-white mb-1">
                ${Math.round(totalRaised / recentDonors.length)}
              </p>
              <p className="text-purple-200">Don moyen</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-xl p-6">
              <Sparkles className="w-12 h-12 text-purple-300 mx-auto mb-3" />
              <p className="text-4xl font-bold text-white mb-1">
                ${goalAmount - totalRaised > 0 ? (goalAmount - totalRaised).toLocaleString() : '0'}
              </p>
              <p className="text-purple-200">Restant</p>
            </div>
          </div>
        </div>

        {/* Live Donor Feed */}
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-8 border-4 border-white border-opacity-20">
          <div className="flex items-center gap-3 mb-6">
            <Volume2 className="w-6 h-6 text-white" />
            <h3 className="text-2xl font-bold text-white">Flux en direct</h3>
          </div>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {recentDonors.map((donor, index) => (
              <div 
                key={index}
                className="bg-white bg-opacity-20 rounded-xl p-6 flex items-center justify-between animate-slideIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                    {donor.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xl font-bold text-white">{donor.name}</p>
                    <p className="text-purple-200">
                      Il y a {Math.floor((Date.now() - donor.time) / 1000 / 60)} min
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-black text-yellow-300">
                    ${donor.amount}
                  </p>
                  {donor.amount >= 200 && (
                    <p className="text-pink-300 text-sm font-semibold mt-1">
                      🎉 Gros don!
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default LiveEventMode;