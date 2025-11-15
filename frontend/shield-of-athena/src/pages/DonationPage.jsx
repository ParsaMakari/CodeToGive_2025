import "./css/DonationPage.css"
import logo_shield from "../assets/logo-bilingual-1-Hasmik-Manucharyan.jpg"
import testimonialVideo from "../assets/testimonials/testimonial_bg.mp4";
import {HiHeart, HiUser} from "react-icons/hi2";
import DonationForm from "../components/DonationForm";
import TestiomonialScroll from "../components/TestiomonialScroll";
import { useNavigate } from "react-router";

function DonationPage() {
    const navigate = useNavigate()
    return(
        <div className="donation-page">
            <header className="donation-page__header">
                <img src={logo_shield} alt="Logo" 
                    className="home-page__headers-logo"
                    onClick={()=>{navigate("/")}}/>
                <div className="home-page__headers-right">
                    <p className="home-page__headers-lang">
                        EN
                    </p>
                    <div className="home-page__headers-login">
                        <HiUser size={24}/>
                        <p>Login</p>
                    </div>
                </div>                
            </header>
            <div className="donation-page__main">
                <section className="donation-page__left">
                    <DonationForm/>                
                </section>
                <section className="donation-page__stories">

                    <div className="testimonial-bg">
                        <div className="donation-page__stories-titles">
                            <p className="donation-page__stories-title">
                                Your Gift, Their freedom
                            </p>       

                            <p className="donation-page__stories-subtitle">
                            The Shield helps women and children, as well as cultural communities, 
                            to break the cycle of psychological, verbal, economic, sexual and physical violence. 
                            </p>   
                            <p>
                                All our services are <b>free</b> for our clients.
                            </p>
                            <p className="donation-page__stories-subtitle-thank">
                                Thank you for giving today !
                            </p>
                        </div>
           
                        <video
                            className="testimonial-video"
                            src={testimonialVideo}
                            autoPlay
                            muted
                            loop
                            playsInline
                        />
                        {/* <div className="testimonial-overlay" /> */}
                        <div className="testimonials-wrapper">
                            <TestiomonialScroll/>

                        </div>
                </div>
                </section>
            </div>
        </div>
    )
}

export default DonationPage;