import "./css/HomePage.scss"
import { useState } from "react"
import EventsCalendar from "../components/EventsCalendar"
import hero_image from "../assets/hero_image.png"
import {HiHandRaised, HiHeart, HiOutlinePhone, HiPhone, HiUser} from "react-icons/hi2"
import { useNavigate } from "react-router"
import {Link} from "react-router-dom";
import ActionCard from "../components/ActionCard"
import { useTranslation } from "react-i18next"
import {sampleEvents} from "../api/events";
import Matcher from "../components/Matcher"
import Stats from "../components/Stats"
import TestiomonialScroll from "../components/TestiomonialScroll"
import QuizPopup from "../components/QuizPopup"
import { useAuth } from "../context/authContext"
import Quiz from "../components/Quiz"
import NeedHelp from "../components/NeedHelp"

function HomePage() {
    const navigate = useNavigate();
    const  { user } = useAuth();

    const { t } = useTranslation();

    const isLoggedIn = Boolean(user);
    return (
        <div className="home-page">
            <QuizPopup/>
            <div className="home-page__hero-section">
                <div className="home-page__hero-titles_testimonials">
                    <div className="home-page__hero-main">
                        <span className="home-page__hero-join">
                            {t("home.hero.join").toLocaleUpperCase()}
                        </span>
                        <div className="home-page__hero-title">
                            <h1 className="hero-heading">
                                 {t("home.hero.title.say") + ' '}
                                    {t("home.hero.title.noLeft")}
                                    <span className="hero-image-wrapper">
                                        <span className="hero-image-container">
                                            <img 
                                                src={hero_image} 
                                                alt="Support" 
                                                className="hero-image"
                                            />
                                        </span>
                                    </span>  
                                    {t("home.hero.title.noRight") + " "}
                                    
                                    {t("home.hero.title.to")}
                                    <br/>
                                    {t("home.hero.title.violence")}
                              
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
                </div>                         
            </div>
            <Stats/>

            <Matcher/>

            <EventsCalendar events={sampleEvents} />
            <div className="action-cards-grid">
                <ActionCard
                    icon="donation"
                    title="Make a Donation"
                    description="Contribute today to help fund shelters, outreaches, and essential support services for those suffering family violence."
                    actionText="Payment Options"
                    actionType="payment"
                    link="#donate"
                />
                
                <ActionCard
                    icon="support"
                    title="Start a Fundraiser"
                    description="Access vital resources, financial aid, and counseling for family violence victims and their families in their time of need."
                    actionText=""
                    actionType="tags"
                    tags={["Financial Aid", "Therapy"]}
                    link="#support"
                />
                
                <ActionCard
                    icon="volunteer"
                    title="Become a Volunteer"
                    description="Join our team of volunteers to support family violence victims, assist with community outreach and events, and make a positive impact."
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
                <div className="home-page-quiz">
                    <div className="home-page-quiz-title">
                        <h2>
                            Test your knowledge about family violence
                        </h2>
                    </div>
                    <Quiz/>
                </div>
                <div className="home-page-ressources">
                    <NeedHelp/>
                </div>
        </div>
            
    )
}

export default HomePage;
