import "./css/HomePage.scss";
import logo_shield from "../assets/logo-bilingual-1-Hasmik-Manucharyan.jpg";
import hero_image from "../assets/hero_image.png";
import { HiHandRaised, HiHeart, HiUser } from "react-icons/hi2";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function HomePage({ user }) {
  const navigate = useNavigate();
    const displayName = user?.username || "there";
  return (
    <div className="home-page">
      <div className="home-page__hero-section">
        <div className="home-page__hero-left">
          <h1 className="auth-title">Welcome back, {displayName}</h1>
          <span className="home-page__hero-left-join">JOIN US TODAY AND</span>
          <div className="home-page__hero-title">
            <span>Say</span>
            <span className="home-page__hero-no">no</span>
            <span>to Violence</span>
            <span>!</span>
          </div>
          <p className="home-page__hero-descript">
            The Shield of Athena is a non-profit organization for victims of
            family violence. We offer emergency shelter and professional
            services to women and their children.
          </p>
          <div className="home-page__hero-buttons">
            <button
              type="button"
              title="donate"
              className="home-page__hero-donate"
              onClick={() => navigate("/donate")}
            >
              Donate
            </button>
            <div className="home-page__hero-help-container">
              <span>Are you a victim ?</span>
              <button className="home-page__hero-getHelp">
                <HiHandRaised />
                Get help
              </button>
            </div>
          </div>
        </div>
        <div className="home-page__hero-right">
          <div className="home-page__hero-image-container">
            <img src={hero_image} className="home-page__hero-image" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
