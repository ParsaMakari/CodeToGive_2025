import "./css/DonationPage.scss";
import logo_shield from "../assets/logo-bilingual-1-Hasmik-Manucharyan.jpg";
import testimonialVideo from "../assets/testimonials/testimonial_bg.mp4";
import { HiHeart, HiUser } from "react-icons/hi2";
import DonationForm from "../components/DonationForm";
import TestimonialScroll from "../components/TestiomonialScroll";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function DonationPage() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="donation-page">
            <div className="donation-page__main">

                {/* Left side – donation form */}
                <section className="donation-page__left">
                    <DonationForm />
                </section>

                {/* Right side – video + testimonials */}
                <section className="donation-page__stories">
                    <div className="testimonial-bg">
                        <div className="testimonial-layout">

                            {/* Left video */}
                            <div className="testimonial-left">
                                <video
                                    className="testimonial-video"
                                    src={testimonialVideo}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                />
                            </div>

                            {/* Right text + testimonials */}
                            <div className="testimonial-right">
                                <div className="donation-page__stories-titles">
                                    <p className="donation-page__stories-title">
                                        {t("donationPage.giftTitle")}
                                    </p>

                                    <p className="donation-page__stories-subtitle">
                                        {t("donationPage.description")}
                                    </p>

                                    <p>
                                        {t("donationPage.servicesFree")} <b>{t("donationPage.free")}</b>.
                                    </p>

                                    <p className="donation-page__stories-subtitle-thank">
                                        {t("donationPage.thankYou")}
                                    </p>
                                </div>

                                <div className="testimonials-wrapper">
                                    <TestimonialScroll />
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}

export default DonationPage;
