import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

function Alert({ 
  type = 'info', 
  title = null, 
  message, 
  onClose = null,
  className = '' 
}) {
  const config = {
    success: {
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-800',
      icon: <CheckCircle className="w-5 h-5" />,
    },
    error: {
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-800',
      icon: <AlertCircle className="w-5 h-5" />,
    },
    warning: {
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-800',
      icon: <AlertCircle className="w-5 h-5" />,
    },
    info: {
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-800',
      icon: <Info className="w-5 h-5" />,
    },
  };

  const { bgColor, borderColor, textColor, icon } = config[type];

  return (
    <div className={`${bgColor} ${borderColor} ${textColor} border-l-4 rounded-lg p-4 ${className}`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {icon}
        </div>
        <div className="flex-1">
          {title && (
            <h3 className="font-bold mb-1">{title}</h3>
          )}
          <p className={title ? 'text-sm' : ''}>{message}</p>
        </div>
        {onClose && (
          <button 
            onClick={onClose}
            className="flex-shrink-0 hover:opacity-70 transition"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}

export default Alert;