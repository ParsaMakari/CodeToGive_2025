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

function HomePage() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    
    return(
        <div className="home-page">
            <header className="home-page__headers">
                <img src={logo_shield} alt="Logo" className="home-page__headers-logo"/>

                <nav className="nav-menu">         
                    {/* Desktop Menu */}
                    <div className="desktop-menu">
                        <a href="#" className="nav-link">WHO WE ARE</a>
                        <a href="#" className="nav-link">WHAT WE DO</a>
                        <a href="#" className="nav-link">NEWS & EVENTS</a>
                        <a href="#" className="nav-link">GET INVOLVED</a>
                    </div>


                    {/* Mobile Menu Button */}
                    <button 
                        className="mobile-menu-btn"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="menu-icon" /> : <Menu className="menu-icon" />}
                    </button>
                    </nav>      
                          {/* Mobile Menu */}
                    {isMenuOpen && (
                        <div className="mobile-menu">
                        <div className="mobile-menu-content">
                            <a href="#" className="mobile-nav-link">WHO WE ARE</a>
                            <a href="#" className="mobile-nav-link">WHAT WE DO</a>
                            <a href="#" className="mobile-nav-link">NEWS & EVENTS</a>
                            <a href="#" className="mobile-nav-link">GET INVOLVED</a>
                            <div className="mobile-actions">
                            <button className="phone-btn">
                                <Phone className="phone-icon" />
                            </button>
                            <button className="donate-btn mobile-donate">
                                DONATE
                            </button>
                            </div>
                        </div>
                        </div>
                    )}          
                <div className="home-page__headers-right">

                    <p className="home-page__headers-lang">
                        EN
                    </p>

                    {/* Desktop Actions */}
                    <div className="nav-actions desktop-actions">
                        <button className="phone-btn">
                            <FaPhone size={16}/>
                        </button>
                    </div>

                    <div className="home-page__headers-donate" onClick={()=>navigate("/donate")}>
                         <HiHeart/>
                        <span>
                            Donate
                        </span>
                    </div>
                    <div className="home-page__headers-login">
                        <HiUser/>
                        <Link
                            to="/login"
                            className="auth-button"
                            style={{ textAlign: "center", textDecoration: "none" }}
                        >
                            Log in
                        </Link>
                    </div>
                </div>
            </header>
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
                        The Shield of Athena is a non-profit organization for victims of family violence. 
                        We offer emergency shelter and professional services to women and their children.                     
                    </p>                  
                </div>


                <div className="home-page__hero-buttons">
                    <button type="button" title="donate" 
                        className="home-page__hero-donate"
                        onClick={()=>navigate("/donate")}>
                        Donate
                    </button>
                    <div className="home-page__hero-help-container">
                        <span>
                            Are you a victim ?
                        </span> 
                        <div className="home-page__hero-getHelp">
                            <button className="home-page__hero-getHelp-btn">
                                <HiHandRaised/>
                                Get help
                            </button>    
                            <FaArrowUpRightDots/>
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