import { useNavigate } from 'react-router-dom';
import { Shield, Heart } from 'lucide-react';

function RoleSelect() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Shield of Athena
          </h1>
          <p className="text-xl text-purple-100">
            Donation Management Platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Admin Card */}
          <div 
            onClick={() => navigate('/admin/login')}
            className="bg-white rounded-2xl p-8 shadow-2xl cursor-pointer transform transition hover:scale-105 hover:shadow-purple-500/50"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-purple-100 p-6 rounded-full mb-6">
                <Shield className="w-16 h-16 text-purple-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                Admin Portal
              </h2>
              <p className="text-gray-600 mb-6">
                Gérer les dons, campagnes, et transparence
              </p>
              <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition">
                Accéder →
              </button>
            </div>
          </div>

          {/* Donor Card */}
          <div 
            onClick={() => navigate('/donor/login')}
            className="bg-white rounded-2xl p-8 shadow-2xl cursor-pointer transform transition hover:scale-105 hover:shadow-pink-500/50"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-pink-100 p-6 rounded-full mb-6">
                <Heart className="w-16 h-16 text-pink-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                Donor Portal
              </h2>
              <p className="text-gray-600 mb-6">
                Faire un don et suivre votre impact
              </p>
              <button className="bg-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-700 transition">
                Accéder →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoleSelect;