import { CheckCircle, Heart, Phone, Info } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import ConfettiEffect from "./Confetti";

export default function QuizCompletion({ onClose, onRestart }) {
  return (
    <div className="container">
      <Card className="quiz-card completion-card">
        <Card.Body className="completion-content">
          <div className="completion-icon-wrapper">
            <CheckCircle size={35} className="completion-icon" />
            <h1 className="completion-title">Quiz Completed!</h1>
          </div>
          
          
          <p className="completion-message">
            Thank you for taking the time to learn about family violence. 
            Your awareness and understanding can make a real difference in 
            supporting survivors and creating safer communities.
          </p>

          <div className="completion-stats">
            <div className="stat-badge">
              <Heart size={24} className="stat-icon" />
              <span className="stat-text">You're making a difference</span>
            </div>
          </div>

          <div className="resources-section">
            
            <div className="resource-card">
              <Phone size={20} className="resource-icon" />
              <div className="resource-info">
                <strong>24/7 Crisis Hotline</strong>
                <p>If you or someone you know needs immediate help:</p>
                <a href="tel:514-873-9010" className="hotline-number">
                  514-873-9010
                </a>
              </div>
            </div>

            <div className="info-box">
              <p>
                <strong>Remember:</strong> Family violence is never acceptable. 
                Everyone deserves to feel safe in their home and relationships.
              </p>
            </div>
          </div>

          <div className="completion-actions">
            {onRestart && (
              <button className="btn-secondary-action" onClick={onRestart}>
                Retake Quiz
              </button>
            )}
            {onClose && (
              <button className="btn-primary-action" onClick={onClose}>
                Close
              </button>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}