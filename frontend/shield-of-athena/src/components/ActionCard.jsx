import { Apple, ArrowUpRight, DollarSign, DollarSignIcon, Heart, Users } from "lucide-react";
import "./css/ActionCard.scss"
import { FaApple, FaGoogle, FaPaypal } from "react-icons/fa6";

// Payment icons component
const PaymentIcons = () => (
  <div className="payment-icons">
    <FaApple size={15} className="payment-icon"/>
    <FaGoogle size={15} className= "payment-icon google-icon"/>
    <FaPaypal size={15} className="payment-icon paypal-icon"/>
  </div>
);

// Avatar group component
const AvatarGroup = ({ images }) => (
  <div className="avatar-group">
    {images.map((img, index) => (
      <img 
        key={index}
        src={img} 
        alt={`Volunteer ${index + 1}`}
        className="avatar"
      />
    ))}
  </div>
);


export default function ActionCard({ 
  icon,
  title, 
  description, 
  actionText,
  actionType = 'default', // 'payment', 'tags', 'avatars', 'default'
  tags = [],
  avatars = [],
  link = "#",
  className = ""
}) {
  const renderIcon = () => {
    const iconMap = {
      'donation': <DollarSign className="card-icon" />,
      'support': <Heart className="card-icon" />,
      'volunteer': <Users className="card-icon" />
    };
    return iconMap[icon] || <DollarSign className="card-icon" />;
  };

  const renderAction = () => {
    switch(actionType) {
      case 'payment':
        return (
          <div className="card-action">
            <PaymentIcons />
            <span className="action-text">{actionText}</span>
            <a href={link} className="action-button">
              <ArrowUpRight className="action-arrow" />
            </a>
          </div>
        );
      
      case 'tags':
        return (
          <div className="card-action">
            <div className="tags">
              {tags.map((tag, index) => (
                <span key={index} className="tag">#{tag}</span>
              ))}
            </div>
            <a href={link} className="action-button">
              <ArrowUpRight className="action-arrow" />
            </a>
          </div>
        );
      
      case 'avatars':
        return (
          <div className="card-action">
            <AvatarGroup images={avatars} />
            <span className="action-text">{actionText}</span>
            <a href={link} className="action-button">
              <ArrowUpRight className="action-arrow" />
            </a>
          </div>
        );
      
      default:
        return (
          <div className="card-action">
            <span className="action-text">{actionText}</span>
            <a href={link} className="action-button">
              <ArrowUpRight className="action-arrow" />
            </a>
          </div>
        );
    }
  };

  return (
    <div className={`action-card ${className}`}>
      <div className="card-header">
        <div className="icon-wrapper">
          {renderIcon()}
        </div>
      </div>
      
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
      </div>
      
      {renderAction()}
    </div>
  );
}
