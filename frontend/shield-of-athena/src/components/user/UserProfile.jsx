import { useState } from 'react';
import { User, Mail, Calendar, CreditCard, Shield, LogOut, Edit2, Save } from 'lucide-react';

function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Marie Leblanc',
    email: 'marie.leblanc@email.com',
    phone: '514-555-0123',
    joinedDate: 'Janvier 2024',
    totalDonated: 625,
    donationCount: 12,
    monthlyDonation: 50,
    preferredCampaign: 'Winter Shelter',
    emailNotifications: true,
    monthlyReceipts: true
  });

  const handleSave = () => {
    setIsEditing(false);
    alert('Profil mis à jour avec succès! ✅');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-purple-600" />
            </div>
            <div>
              <h1 className="text-4xl font-black mb-2">{profile.name}</h1>
              <p className="text-xl text-purple-100">
                Membre depuis {profile.joinedDate}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Impact Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Votre Impact</h2>
              <div className="space-y-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Total donné</p>
                  <p className="text-3xl font-black text-green-600">
                    ${profile.totalDonated}
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Nombre de dons</p>
                  <p className="text-3xl font-black text-purple-600">
                    {profile.donationCount}
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Don mensuel actif</p>
                  <p className="text-3xl font-black text-blue-600">
                    ${profile.monthlyDonation}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Actions rapides</h2>
              <div className="space-y-3">
                <button className="w-full bg-purple-100 text-purple-700 py-3 rounded-lg font-semibold hover:bg-purple-200 transition">
                  Voir mes reçus
                </button>
                <button className="w-full bg-pink-100 text-pink-700 py-3 rounded-lg font-semibold hover:bg-pink-200 transition">
                  Modifier don mensuel
                </button>
                <button className="w-full bg-red-100 text-red-700 py-3 rounded-lg font-semibold hover:bg-red-200 transition flex items-center justify-center gap-2">
                  <LogOut className="w-5 h-5" />
                  Déconnexion
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Informations personnelles</h2>
                {!isEditing ? (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="bg-purple-100 text-purple-700 px-6 py-2 rounded-lg font-semibold hover:bg-purple-200 transition flex items-center gap-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    Modifier
                  </button>
                ) : (
                  <button 
                    onClick={handleSave}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Sauvegarder
                  </button>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Nom complet
                    </div>
                  </label>
                  {isEditing ? (
                    <input 
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                    />
                  ) : (
                    <p className="text-lg font-semibold">{profile.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </div>
                  </label>
                  {isEditing ? (
                    <input 
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                    />
                  ) : (
                    <p className="text-lg font-semibold">{profile.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Téléphone
                    </div>
                  </label>
                  {isEditing ? (
                    <input 
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                    />
                  ) : (
                    <p className="text-lg font-semibold">{profile.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Campagne préférée
                    </div>
                  </label>
                  {isEditing ? (
                    <select 
                      value={profile.preferredCampaign}
                      onChange={(e) => setProfile({...profile, preferredCampaign: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                    >
                      <option value="Winter Shelter">Winter Shelter</option>
                      <option value="Education Fund">Education Fund</option>
                      <option value="Emergency Response">Emergency Response</option>
                      <option value="General">General</option>
                    </select>
                  ) : (
                    <p className="text-lg font-semibold">{profile.preferredCampaign}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Notification Preferences */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Préférences de notifications</h2>
              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-semibold">Notifications par email</p>
                      <p className="text-sm text-gray-600">Recevoir les mises à jour par email</p>
                    </div>
                  </div>
                  <input 
                    type="checkbox"
                    checked={profile.emailNotifications}
                    onChange={(e) => setProfile({...profile, emailNotifications: e.target.checked})}
                    className="w-6 h-6 text-purple-600"
                  />
                </label>

                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-semibold">Reçus mensuels automatiques</p>
                      <p className="text-sm text-gray-600">Recevoir un reçu fiscal mensuel</p>
                    </div>
                  </div>
                  <input 
                    type="checkbox"
                    checked={profile.monthlyReceipts}
                    onChange={(e) => setProfile({...profile, monthlyReceipts: e.target.checked})}
                    className="w-6 h-6 text-purple-600"
                  />
                </label>
              </div>
            </div>

            {/* Security Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Shield className="w-6 h-6 text-purple-600" />
                Sécurité
              </h2>
              <div className="space-y-4">
                <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition text-left px-4">
                  Changer le mot de passe
                </button>
                <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition text-left px-4">
                  Activer l'authentification à deux facteurs
                </button>
                <button className="w-full bg-red-100 text-red-700 py-3 rounded-lg font-semibold hover:bg-red-200 transition text-left px-4">
                  Supprimer mon compte
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;