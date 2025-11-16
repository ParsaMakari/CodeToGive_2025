import { useState } from 'react';
import { Download, Calendar, CreditCard, DollarSign, Award, TrendingUp } from 'lucide-react';

function MyDonations() {
  const [donations] = useState([
    { id: 1, amount: 250, date: '2024-11-15', campaign: 'Winter Shelter', type: 'one-time', status: 'completed' },
    { id: 2, amount: 50, date: '2024-11-01', campaign: 'General', type: 'monthly', status: 'recurring' },
    { id: 3, amount: 100, date: '2024-10-15', campaign: 'Education Fund', type: 'one-time', status: 'completed' },
    { id: 4, amount: 50, date: '2024-10-01', campaign: 'General', type: 'monthly', status: 'recurring' },
    { id: 5, amount: 75, date: '2024-09-20', campaign: 'Emergency Response', type: 'one-time', status: 'completed' },
    { id: 6, amount: 50, date: '2024-09-01', campaign: 'General', type: 'monthly', status: 'recurring' },
  ]);

  const totalDonated = donations.reduce((sum, d) => sum + d.amount, 0);
  const totalThisYear = donations.filter(d => d.date.startsWith('2024')).reduce((sum, d) => sum + d.amount, 0);
  const monthlyDonation = donations.find(d => d.type === 'monthly');

  const totalImpact = {
    nights: Math.floor(totalDonated / 25),
    meals: Math.floor(totalDonated / 10),
    workshops: Math.floor(totalDonated / 50)
  };

  const downloadCertificate = () => {
    alert('Téléchargement du certificat de remerciement! 📜');
  };

  const downloadReceipt = (id) => {
    alert(`Téléchargement du reçu fiscal pour le don #${id}! 📄`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-black mb-2">Mes Donations</h1>
          <p className="text-xl text-purple-100">Merci pour votre générosité! 💜</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-8 h-8 text-green-600" />
              <Award className="w-6 h-6 text-yellow-500" />
            </div>
            <p className="text-3xl font-black text-gray-900 mb-1">
              ${totalDonated}
            </p>
            <p className="text-gray-600 font-semibold">Total de tous les temps</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-3xl font-black text-gray-900 mb-1">
              ${totalThisYear}
            </p>
            <p className="text-gray-600 font-semibold">Total 2024</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-3xl font-black text-gray-900 mb-1">
              {donations.length}
            </p>
            <p className="text-gray-600 font-semibold">Nombre de dons</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <CreditCard className="w-8 h-8 text-pink-600" />
            </div>
            <p className="text-3xl font-black text-gray-900 mb-1">
              ${monthlyDonation ? monthlyDonation.amount : 0}
            </p>
            <p className="text-gray-600 font-semibold">Don mensuel actif</p>
          </div>
        </div>

        {/* Impact Summary */}
        <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-black mb-6 text-center">🌟 Votre Impact Total 🌟</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 text-center">
              <p className="text-5xl mb-2">🏠</p>
              <p className="text-4xl font-black text-purple-600 mb-2">{totalImpact.nights}</p>
              <p className="text-gray-700 font-semibold">Nuits en refuge</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center">
              <p className="text-5xl mb-2">🍽️</p>
              <p className="text-4xl font-black text-green-600 mb-2">{totalImpact.meals}</p>
              <p className="text-gray-700 font-semibold">Repas servis</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center">
              <p className="text-5xl mb-2">💼</p>
              <p className="text-4xl font-black text-blue-600 mb-2">{totalImpact.workshops}</p>
              <p className="text-gray-700 font-semibold">Heures d'accompagnement</p>
            </div>
          </div>
          <div className="text-center mt-6">
            <button 
              onClick={downloadCertificate}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-bold hover:from-purple-700 hover:to-pink-700 transition inline-flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Télécharger mon certificat de remerciement
            </button>
          </div>
        </div>

        {/* Monthly Donation Card */}
        {monthlyDonation && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-2 border-purple-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold mb-2">💜 Don mensuel actif</h3>
                <p className="text-gray-600">
                  Merci pour votre engagement continu!
                </p>
              </div>
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-bold">
                Actif
              </span>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Montant mensuel</p>
                <p className="text-2xl font-bold text-purple-600">${monthlyDonation.amount}</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Prochain prélèvement</p>
                <p className="text-lg font-bold">1er décembre 2024</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Depuis</p>
                <p className="text-lg font-bold">{monthlyDonation.date}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="flex-1 bg-purple-100 text-purple-700 py-3 rounded-lg font-semibold hover:bg-purple-200">
                Modifier le montant
              </button>
              <button className="flex-1 bg-blue-100 text-blue-700 py-3 rounded-lg font-semibold hover:bg-blue-200">
                Changer le moyen de paiement
              </button>
              <button className="bg-red-100 text-red-700 px-6 py-3 rounded-lg font-semibold hover:bg-red-200">
                Annuler
              </button>
            </div>
          </div>
        )}

        {/* Donations History */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b">
            <h2 className="text-2xl font-bold">Historique des donations</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Montant</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Campagne</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reçu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {donations.map((donation) => (
                  <tr key={donation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{donation.date}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-lg font-bold text-green-600">
                        ${donation.amount}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {donation.campaign}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        donation.type === 'monthly' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {donation.type === 'monthly' ? 'Mensuel' : 'Unique'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        donation.status === 'recurring' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {donation.status === 'recurring' ? 'Récurrent' : 'Complété'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button 
                        onClick={() => downloadReceipt(donation.id)}
                        className="text-purple-600 hover:text-purple-800 font-semibold flex items-center gap-1"
                      >
                        <Download className="w-4 h-4" />
                        PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyDonations;