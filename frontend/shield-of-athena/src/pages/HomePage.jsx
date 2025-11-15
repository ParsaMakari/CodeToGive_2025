import "./css/HomePage.scss"
import { useState } from "react"

import logo_shield from "../assets/logo-bilingual-1-Hasmik-Manucharyan.jpg"
import hero_image from "../assets/hero_image.png"
import {HiHandRaised, HiHeart, HiOutlinePhone, HiPhone, HiUser} from "react-icons/hi2"
import { useNavigate } from "react-router"
import {Link} from "react-router-dom";
import { Phone, ChevronDown, Menu, X } from 'lucide-react';
import { FaArrowUpRightDots, FaChevronRight, FaPhone } from "react-icons/fa6"
import ActionCard from "../components/ActionCard"
import { useTranslation } from "react-i18next"

function HomePage({ user }) {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const { t } = useTranslation();

    const displayName = user?.username || "";
    const isLoggedIn = Boolean(user);
    const greetingKey = isLoggedIn
        ? "home.greetingLoggedIn"
        : "home.greetingAnon";

    return (
        <div className="home-page">
            <div className="home-page__hero-section">
                <div className="home-page__hero-main">
                    <span className="home-page__hero-join">
                        JOIN US TODAY AND
                    </span>
                    <div className="home-page__hero-title">
                        <h1 className="hero-heading">
                            Say {' '}
                                n
                                <span className="hero-image-wrapper">
                                    <span className="hero-image-container">
                                        <img 
                                            src={hero_image} 
                                            alt="Support" 
                                            className="hero-image"
                                        />
                                    </span>
                                </span>  
                                to 
                                <br/>
                                Violence !                              
                        </h1>
                    </div>

                    <p className="home-page__hero-descript">
                        {t("home.hero.description")}
                    </p>

                    <div className="home-page__hero-buttons">
                        <button
                            type="button"
                            title={t("home.hero.donateCta")}
                            className="home-page__hero-donate"
                            onClick={() => navigate("/donate")}
                        >
                            {t("home.hero.donateCta")}
                        </button>

                        <div className="home-page__hero-help-container">
                            <span>{t("home.hero.victimQuestion")}</span>
                            <button className="home-page__hero-getHelp">
                                <HiHandRaised />
                                {t("home.hero.getHelp")}
                            </button>
                        </div>
                    </div>
                </div> 

                <div className="action-cards-grid">
                    <ActionCard
                        icon="donation"
                        title="Make a Donation"
                        description="Contribute today to help fund treatments, research, and essential support services for those battling cancer."
                        actionText="Payment Options"
                        actionType="payment"
                        link="#donate"
                    />
                    
                    <ActionCard
                        icon="support"
                        title="Get Support"
                        description="Access vital resources, financial aid, and counseling for cancer patients and their families in their time of need."
                        actionText=""
                        actionType="tags"
                        tags={["Financial Aid", "Therapy"]}
                        link="#support"
                    />
                    
                    <ActionCard
                        icon="volunteer"
                        title="Become a Volunteer"
                        description="Join our team of volunteers to support cancer patients, assist with community outreach, and make a positive impact."
                        actionText="Join Our Team"
                        actionType="avatars"
                        avatars={[
                            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
                            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
                            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
                        ]}
                        link="#volunteer"
                    />
                    </div>                           
            </div>
        </div>
            
    )
}

export default HomePage;
