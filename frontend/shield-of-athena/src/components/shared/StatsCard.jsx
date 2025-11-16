function StatsCard({ 
  title, 
  value, 
  icon, 
  color = 'purple', 
  subtitle = null,
  trend = null,
  size = 'normal'
}) {
  const colorClasses = {
    purple: 'bg-purple-500',
    pink: 'bg-pink-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    orange: 'bg-orange-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
  };

  const textSizes = {
    small: 'text-xl',
    normal: 'text-2xl',
    large: 'text-4xl',
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition transform hover:-translate-y-1">
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm text-gray-600 font-semibold mb-1">{title}</p>
          <p className={`${textSizes[size]} font-black text-gray-900`}>
            {value}
          </p>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
          {trend && (
            <div className={`inline-flex items-center gap-1 mt-2 text-sm font-semibold ${
              trend > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              <span>{trend > 0 ? '↑' : '↓'}</span>
              <span>{Math.abs(trend)}%</span>
            </div>
          )}
        </div>
        
        {icon && (
          <div className={`${colorClasses[color]} text-white p-4 rounded-xl shadow-lg`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

export default StatsCard;