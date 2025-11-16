function LoadingSpinner({ size = 'medium', color = 'purple' }) {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
  };

  const colorClasses = {
    purple: 'border-purple-600',
    pink: 'border-pink-600',
    blue: 'border-blue-600',
    green: 'border-green-600',
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`${sizeClasses[size]} ${colorClasses[color]} border-4 border-t-transparent rounded-full animate-spin`} />
    </div>
  );
}

export default LoadingSpinner;