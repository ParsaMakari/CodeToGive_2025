import { Home, Utensils, GraduationCap, Heart, Award, Sparkles } from 'lucide-react';

function ImpactJourney() {
  const journeySteps = [
    {
      icon: <Home className="w-12 h-12" />,
      title: 'Refuge Sécurisé',
      description: 'Votre don a fourni 10 nuits en refuge sûr',
      impact: '10 nuits',
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-50',
      completed: true
    },
    {
      icon: <Utensils className="w-12 h-12" />,
      title: 'Repas Nutritifs',
      description: 'Vous avez financé 25 repas chauds',
      impact: '25 repas',
      color: 'from-green-400 to-green-600',
      bgColor: 'bg-green-50',
      completed: true
    },
    {
      icon: <GraduationCap className="w-12 h-12" />,
      title: 'Accompagnement',
      description: '5 heures de soutien professionnel',
      impact: '5 heures',
      color: 'from-purple-400 to-purple-600',
      bgColor: 'bg-purple-50',
      completed: true
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: 'Espoir Renouvelé',
      description: 'Impact émotionnel inestimable',
      impact: 'Inestimable',
      color: 'from-pink-400 to-pink-600',
      bgColor: 'bg-pink-50',
      completed: true
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: 'Nouvelle Vie',
      description: 'Contribution à un nouveau départ',
      impact: 'Transformationnel',
      color: 'from-yellow-400 to-yellow-600',
      bgColor: 'bg-yellow-50',
      completed: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <Sparkles className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
          <h1 className="text-5xl font-black mb-4">Votre Impact Journey</h1>
          <p className="text-2xl text-purple-100">
            Découvrez le parcours de transformation que vous avez rendu possible
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Summary Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-12 text-center">
          <h2 className="text-3xl font-black mb-6">Votre Impact Total</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6">
              <p className="text-5xl mb-2">🏠</p>
              <p className="text-4xl font-black text-blue-600 mb-1">10</p>
              <p className="text-gray-700 font-semibold">Nuits sécurisées</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6">
              <p className="text-5xl mb-2">🍽️</p>
              <p className="text-4xl font-black text-green-600 mb-1">25</p>
              <p className="text-gray-700 font-semibold">Repas servis</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6">
              <p className="text-5xl mb-2">💼</p>
              <p className="text-4xl font-black text-purple-600 mb-1">5</p>
              <p className="text-gray-700 font-semibold">Heures de soutien</p>
            </div>
          </div>
        </div>

        {/* Journey Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400" />

          {journeySteps.map((step, index) => (
            <div key={index} className="relative mb-12 ml-20">
              {/* Timeline Node */}
              <div className={`absolute -left-24 top-8 w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-xl ${
                !step.completed && 'opacity-50'
              }`}>
                {step.icon}
              </div>

              {/* Card */}
              <div className={`${step.bgColor} rounded-2xl shadow-lg p-8 hover:shadow-2xl transition ${
                !step.completed && 'opacity-60'
              }`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-black mb-2">{step.title}</h3>
                    <p className="text-gray-700 text-lg">{step.description}</p>
                  </div>
                  {step.completed && (
                    <span className="bg-green-500 text-white px-4 py-2 rounded-full font-bold text-sm">
                      ✓ Accompli
                    </span>
                  )}
                </div>
                <div className={`inline-block bg-gradient-to-r ${step.color} text-white px-6 py-3 rounded-full font-bold text-lg`}>
                  {step.impact}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl shadow-2xl p-12 text-center text-white mt-16">
          <h2 className="text-4xl font-black mb-4">
            Continuez à faire la différence! 💜
          </h2>
          <p className="text-xl mb-8 text-purple-100">
            Chaque don supplémentaire étend votre impact et change plus de vies
          </p>
          <button className="bg-white text-purple-600 px-12 py-4 rounded-full text-xl font-bold hover:bg-purple-50 transition transform hover:scale-105 shadow-xl">
            Faire un nouveau don →
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImpactJourney;