function ProgressBar({ current, goal, color = 'purple', height = 'h-4', showPercentage = true }) {
  const percentage = Math.min(Math.round((current / goal) * 100), 100);

  const colorClasses = {
    purple: 'from-purple-500 to-pink-500',
    blue: 'from-blue-500 to-cyan-500',
    green: 'from-green-500 to-emerald-500',
    orange: 'from-orange-500 to-yellow-500',
    red: 'from-red-500 to-pink-500',
  };

  return (
    <div className="w-full">
      {showPercentage && (
        <div className="flex justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700">
            ${current.toLocaleString()} / ${goal.toLocaleString()}
          </span>
          <span className="text-sm font-bold text-purple-600">
            {percentage}%
          </span>
        </div>
      )}
      
      <div className={`w-full bg-gray-200 rounded-full ${height} overflow-hidden`}>
        <div
          className={`bg-gradient-to-r ${colorClasses[color]} ${height} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;