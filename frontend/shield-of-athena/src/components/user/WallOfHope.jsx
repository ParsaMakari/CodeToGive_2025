import { useState } from 'react';
import { Heart, Send, Sparkles } from 'lucide-react';

function WallOfHope() {
  const [messages] = useState([
    { id: 1, author: 'Marie L.', message: 'Ensemble, nous pouvons faire la différence! Merci pour tout ce que vous faites. 💜', photo: '👩', likes: 24, date: 'Il y a 2h' },
    { id: 2, author: 'Anonymous', message: 'Merci pour tout ce que vous faites pour les femmes en détresse. Vous changez des vies!', photo: '❤️', likes: 18, date: 'Il y a 5h' },
    { id: 3, author: 'Jean P.', message: 'Fier de supporter cette cause importante! Continuez votre excellent travail.', photo: '👨', likes: 31, date: 'Il y a 1 jour' },
    { id: 4, author: 'Sophie M.', message: 'Continuez votre travail incroyable! Vous êtes une inspiration pour nous tous. ✨', photo: '👩', likes: 42, date: 'Il y a 1 jour' },
    { id: 5, author: 'Claire D.', message: 'Une organisation qui change vraiment des vies. Merci d\'exister!', photo: '👩', likes: 28, date: 'Il y a 2 jours' },
    { id: 6, author: 'Marc B.', message: 'Votre dévouement est remarquable. Ensemble nous sommes plus forts! 💪', photo: '👨', likes: 35, date: 'Il y a 2 jours' },
    { id: 7, author: 'Julie L.', message: 'Merci de donner espoir à celles qui en ont le plus besoin. Vous êtes des héros! 🌟', photo: '👩', likes: 51, date: 'Il y a 3 jours' },
    { id: 8, author: 'François R.', message: 'Shield of Athena = espoir + action. Fier d\'être partenaire!', photo: '👨', likes: 22, date: 'Il y a 3 jours' },
    { id: 9, author: 'Anonymous', message: 'Votre travail sauve des vies. Simple, mais tellement vrai. Merci.', photo: '💙', likes: 38, date: 'Il y a 4 jours' },
    { id: 10, author: 'Sarah K.', message: 'L\'espoir existe grâce à vous. Continue de briller! ✨💜', photo: '👩', likes: 45, date: 'Il y a 4 jours' },
    { id: 11, author: 'Pierre M.', message: 'Chaque petit geste compte. Merci de nous le rappeler chaque jour!', photo: '👨', likes: 19, date: 'Il y a 5 jours' },
    { id: 12, author: 'Alex T.', message: 'Vous redonnez dignité et espoir. Un immense merci! 🙏', photo: '👤', likes: 33, date: 'Il y a 5 jours' },
  ]);

  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [newMessage, setNewMessage] = useState({
    name: '',
    message: '',
    anonymous: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message soumis pour approbation! 🎉');
    setShowSubmitModal(false);
    setNewMessage({ name: '', message: '', anonymous: false });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <Sparkles className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
          <h1 className="text-5xl md:text-6xl font-black mb-4">Wall of Hope</h1>
          <p className="text-2xl text-purple-100 mb-8">
            Messages d'encouragement de notre communauté
          </p>
          <button 
            onClick={() => setShowSubmitModal(true)}
            className="bg-white text-purple-600 px-10 py-4 rounded-full text-xl font-bold hover:bg-purple-50 transition transform hover:scale-105 shadow-2xl inline-flex items-center gap-3"
          >
            <Send className="w-6 h-6" />
            Ajouter mon message
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Heart className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-4xl font-black text-gray-900 mb-1">{messages.length}</p>
            <p className="text-gray-600 font-semibold">Messages d'espoir</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-8 h-8 text-pink-600" />
            </div>
            <p className="text-4xl font-black text-gray-900 mb-1">
              {messages.reduce((sum, m) => sum + m.likes, 0)}
            </p>
            <p className="text-gray-600 font-semibold">Likes de soutien</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Heart className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-4xl font-black text-gray-900 mb-1">∞</p>
            <p className="text-gray-600 font-semibold">Impact émotionnel</p>
          </div>
        </div>

        {/* Messages Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {messages.map((msg) => (
            <div 
              key={msg.id}
              className="break-inside-avoid bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition transform hover:-translate-y-1"
            >
              {/* Author */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-2xl">
                  {msg.photo}
                </div>
                <div>
                  <p className="font-bold text-lg">{msg.author}</p>
                  <p className="text-sm text-gray-500">{msg.date}</p>
                </div>
              </div>

              {/* Message */}
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                {msg.message}
              </p>

              {/* Likes */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <button className="flex items-center gap-2 text-pink-600 hover:text-pink-700 transition">
                  <Heart className="w-5 h-5 fill-current" />
                  <span className="font-bold">{msg.likes}</span>
                </button>
                <span className="text-sm text-gray-500">💜</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <button 
            onClick={() => setShowSubmitModal(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-4 rounded-full text-xl font-bold hover:from-purple-700 hover:to-pink-700 transition transform hover:scale-105 shadow-xl inline-flex items-center gap-3"
          >
            <Send className="w-6 h-6" />
            Partagez votre message d'espoir
          </button>
        </div>
      </div>

      {/* Submit Message Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full">
            <h2 className="text-3xl font-black mb-6 text-center">
              Partagez votre message 💜
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="flex items-center gap-2 mb-4">
                  <input 
                    type="checkbox"
                    checked={newMessage.anonymous}
                    onChange={(e) => setNewMessage({...newMessage, anonymous: e.target.checked})}
                    className="w-5 h-5 text-purple-600"
                  />
                  <span className="font-semibold">Publier anonymement</span>
                </label>
              </div>

              {!newMessage.anonymous && (
                <div>
                  <label className="block text-sm font-medium mb-2">Votre prénom</label>
                  <input 
                    type="text"
                    required={!newMessage.anonymous}
                    value={newMessage.name}
                    onChange={(e) => setNewMessage({...newMessage, name: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                    placeholder="Marie"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">Votre message</label>
                <textarea 
                  required
                  value={newMessage.message}
                  onChange={(e) => setNewMessage({...newMessage, message: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                  rows="5"
                  placeholder="Partagez votre message d'encouragement..."
                />
                <p className="text-sm text-gray-500 mt-2">
                  Votre message sera examiné avant publication
                </p>
              </div>

              <div className="flex gap-4">
                <button 
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="flex-1 bg-gray-200 py-3 rounded-lg font-bold hover:bg-gray-300 transition"
                >
                  Annuler
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-bold hover:from-purple-700 hover:to-pink-700 transition"
                >
                  Soumettre 💜
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default WallOfHope;