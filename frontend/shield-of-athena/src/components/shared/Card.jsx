function Card({ 
  children, 
  title = null, 
  subtitle = null,
  footer = null,
  padding = 'normal',
  hover = false,
  className = ''
}) {
  const paddingClasses = {
    none: '',
    small: 'p-4',
    normal: 'p-6',
    large: 'p-8',
  };

  const hoverClass = hover ? 'hover:shadow-2xl hover:-translate-y-1' : '';

  return (
    <div className={`bg-white rounded-2xl shadow-lg transition ${hoverClass} ${className}`}>
      {(title || subtitle) && (
        <div className={`border-b ${paddingClasses[padding]}`}>
          {title && <h3 className="text-xl font-bold text-gray-900">{title}</h3>}
          {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
        </div>
      )}
      
      <div className={paddingClasses[padding]}>
        {children}
      </div>

      {footer && (
        <div className={`border-t bg-gray-50 rounded-b-2xl ${paddingClasses[padding]}`}>
          {footer}
        </div>
      )}
    </div>
  );
}

export default Card;