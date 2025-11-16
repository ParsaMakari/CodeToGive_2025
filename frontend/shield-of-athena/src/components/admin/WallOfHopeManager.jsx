import { useState } from 'react';
import { Heart, Check, X, Edit, Trash2 } from 'lucide-react';

function WallOfHopeManager() {
  const [messages, setMessages] = useState([
    { id: 1, author: 'Marie L.', message: 'Ensemble, nous pouvons faire la différence! 💜', status: 'approved', date: '2024-11-15', photo: true },
    { id: 2, author: 'Anonymous', message: 'Merci pour tout ce que vous faites pour les femmes en détresse.', status: 'approved', date: '2024-11-15', photo: false },
    { id: 3, author: 'Jean P.', message: 'Fier de supporter cette cause importante!', status: 'pending', date: '2024-11-14', photo: true },
    { id: 4, author: 'Sophie M.', message: 'Continuez votre travail incroyable! ❤️', status: 'approved', date: '2024-11-14', photo: false },
    { id: 5, author: 'Claire D.', message: 'Une organisation qui change vraiment des vies.', status: 'pending', date: '2024-11-13', photo: true },
  ]);

  const [filter, setFilter] = useState('all');

  const filteredMessages = messages.filter(m => {
    if (filter === 'all') return true;
    return m.status === filter;
  });

  const approveMessage = (id) => {
    setMessages(messages.map(m => m.id === id ? {...m, status: 'approved'} : m));
  };

  const rejectMessage = (id) => {
    setMessages(messages.map(m => m.id === id ? {...m, status: 'rejected'} : m));
  };

  const deleteMessage = (id) => {
    setMessages(messages.filter(m => m.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Wall of Hope</h1>
              <p className="text-gray-600">Gérer les messages d'encouragement</p>
            </div>
            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Ajouter un message
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">Total messages</p>
            <p className="text-3xl font-bold">{messages.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">En attente d'approbation</p>
            <p className="text-3xl font-bold text-orange-600">
              {messages.filter(m => m.status === 'pending').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">Approuvés</p>
            <p className="text-3xl font-bold text-green-600">
              {messages.filter(m => m.status === 'approved').length}
            </p>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex gap-2">
            <button 
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-semibold ${
                filter === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tous
            </button>
            <button 
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg font-semibold ${
                filter === 'pending' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              En attente
            </button>
            <button 
              onClick={() => setFilter('approved')}
              className={`px-4 py-2 rounded-lg font-semibold ${
                filter === 'approved' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Approuvés
            </button>
          </div>
        </div>

        {/* Messages Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredMessages.map((msg) => (
            <div key={msg.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className={`p-1 ${
                msg.status === 'approved' ? 'bg-green-500' :
                msg.status === 'pending' ? 'bg-orange-500' :
                'bg-red-500'
              }`} />
              
              <div className="p-6">
                {/* Author Info */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {msg.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-lg">{msg.author}</p>
                    <p className="text-sm text-gray-600">{msg.date}</p>
                  </div>
                  {msg.photo && (
                    <span className="ml-auto bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      📷 Photo
                    </span>
                  )}
                </div>

                {/* Message */}
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  {msg.message}
                </p>

                {/* Status */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    msg.status === 'approved' ? 'bg-green-100 text-green-800' :
                    msg.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {msg.status === 'approved' ? '✓ Approuvé' :
                     msg.status === 'pending' ? '⏳ En attente' :
                     '✗ Rejeté'}
                  </span>
                </div>

                {/* Actions */}
                {msg.status === 'pending' ? (
                  <div className="flex gap-2">
                    <button 
                      onClick={() => approveMessage(msg.id)}
                      className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 flex items-center justify-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      Approuver
                    </button>
                    <button 
                      onClick={() => rejectMessage(msg.id)}
                      className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 flex items-center justify-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Rejeter
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button className="flex-1 bg-blue-100 text-blue-700 py-2 rounded-lg font-semibold hover:bg-blue-200 flex items-center justify-center gap-2">
                      <Edit className="w-4 h-4" />
                      Modifier
                    </button>
                    <button 
                      onClick={() => deleteMessage(msg.id)}
                      className="bg-red-100 text-red-700 p-2 rounded-lg hover:bg-red-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WallOfHopeManager;