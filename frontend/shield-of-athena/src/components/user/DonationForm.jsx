import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, CreditCard, Check } from 'lucide-react';

function DonationForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [donationData, setDonationData] = useState({
    amount: 50,
    isMonthly: false,
    name: '',
    email: '',
    message: ''
  });

  const presetAmounts = [25, 50, 100, 250, 500];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate payment
    setStep(4); // Go to thank you page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= s ? 'bg-purple-600 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                {s}
              </div>
              {s < 3 && <div className={`w-16 h-1 ${step > s ? 'bg-purple-600' : 'bg-gray-300'}`} />}
            </div>
          ))}
        </div>

        {step === 4 ? (
          // Thank You Page
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Merci pour votre générosité!</h1>
            <p className="text-xl text-gray-600 mb-6">
              Votre don de <span className="font-bold text-purple-600">${donationData.amount}</span> va changer des vies.
            </p>
            <div className="bg-purple-50 rounded-lg p-6 mb-8">
              <p className="text-lg font-semibold mb-2">Votre impact:</p>
              <p className="text-gray-700">
                🏠 {Math.floor(donationData.amount / 25)} nuits en refuge sécurisé<br/>
                🍽️ {Math.floor(donationData.amount / 10)} repas chauds<br/>
                💼 {Math.floor(donationData.amount / 50)} heures d'accompagnement
              </p>
            </div>
            <button 
              onClick={() => navigate('/my-impact')}
              className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700"
            >
              Voir mon impact →
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Amount */}
              {step === 1 && (
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-center">Choisissez votre montant</h2>
                  
                  {/* Preset Amounts */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {presetAmounts.map(amount => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => setDonationData({...donationData, amount})}
                        className={`py-4 rounded-lg font-bold text-lg transition ${
                          donationData.amount === amount 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Autre montant</label>
                    <div className="relative">
                      <span className="absolute left-4 top-3 text-gray-500 text-xl">$</span>
                      <input 
                        type="number"
                        value={donationData.amount}
                        onChange={(e) => setDonationData({...donationData, amount: Number(e.target.value)})}
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg text-xl"
                      />
                    </div>
                  </div>

                  {/* Monthly toggle */}
                  <div className="flex items-center justify-center mb-8">
                    <label className="flex items-center cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={donationData.isMonthly}
                        onChange={(e) => setDonationData({...donationData, isMonthly: e.target.checked})}
                        className="w-5 h-5 mr-3"
                      />
                      <span className="text-lg">Faire un don mensuel</span>
                    </label>
                  </div>

                  <button 
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full bg-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-purple-700"
                  >
                    Continuer →
                  </button>
                </div>
              )}

              {/* Step 2: Personal Info */}
              {step === 2 && (
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-center">Vos informations</h2>
                  <div className="space-y-4 mb-8">
                    <div>
                      <label className="block text-sm font-medium mb-2">Nom complet</label>
                      <input 
                        type="text"
                        required
                        value={donationData.name}
                        onChange={(e) => setDonationData({...donationData, name: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg"
                        placeholder="Jean Dupont"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input 
                        type="email"
                        required
                        value={donationData.email}
                        onChange={(e) => setDonationData({...donationData, email: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg"
                        placeholder="jean@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Message (optionnel)</label>
                      <textarea 
                        value={donationData.message}
                        onChange={(e) => setDonationData({...donationData, message: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg"
                        rows="3"
                        placeholder="Votre message d'encouragement..."
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button 
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 bg-gray-200 py-4 rounded-lg font-bold hover:bg-gray-300"
                    >
                      ← Retour
                    </button>
                    <button 
                      type="button"
                      onClick={() => setStep(3)}
                      className="flex-1 bg-purple-600 text-white py-4 rounded-lg font-bold hover:bg-purple-700"
                    >
                      Continuer →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Payment (Mock) */}
              {step === 3 && (
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-center">Paiement</h2>
                  <div className="bg-purple-50 rounded-lg p-6 mb-6">
                    <p className="text-lg font-semibold mb-2">Résumé:</p>
                    <div className="flex justify-between mb-1">
                      <span>Montant:</span>
                      <span className="font-bold">${donationData.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <span className="font-bold">{donationData.isMonthly ? 'Mensuel' : 'Unique'}</span>
                    </div>
                  </div>
                  <div className="space-y-4 mb-8">
                    <div>
                      <label className="block text-sm font-medium mb-2">Numéro de carte</label>
                      <input 
                        type="text"
                        placeholder="4242 4242 4242 4242"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Expiration</label>
                        <input 
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">CVV</label>
                        <input 
                          type="text"
                          placeholder="123"
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button 
                      type="button"
                      onClick={() => setStep(2)}
                      className="flex-1 bg-gray-200 py-4 rounded-lg font-bold hover:bg-gray-300"
                    >
                      ← Retour
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 bg-green-600 text-white py-4 rounded-lg font-bold hover:bg-green-700 flex items-center justify-center gap-2"
                    >
                      <CreditCard className="w-5 h-5" />
                      Confirmer le don
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default DonationForm;