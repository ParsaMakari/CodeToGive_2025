import { Link, useNavigate } from "react-router-dom";
import { HiUser } from "react-icons/hi2";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import logoShield from "../assets/logo-bilingual-1-Hasmik-Manucharyan.jpg";
import "../css/Navbar.scss";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";
import { FaPhone } from "react-icons/fa6";

function NavBar({ user, onLogout }) {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const displayName = user?.username || "there";

    return (
        <header className={`site-nav ${isOpen ? "site-nav--open" : ""}`}>
            <div className="site-nav__inner">
                {/* Logo */}
                <button
                    type="button"
                    className="site-nav__logo-btn"
                    onClick={() => {
                        navigate("/");
                        setIsOpen(false);
                    }}
                >
                    <img
                        src={logoShield}
                        alt={t("layout.nav.logoAlt")}
                        className="site-nav__logo"
                    />
                </button>


                {/* Added NavBar options */}

                <div className="nav-menu">
                    {/* Desktop Menu */}
                    <div className="desktop-menu">
                        <a href="#" className="nav-link">{t("layout.nav.options.whoWeAre")}</a>
                        <a href="#" className="nav-link">{t("layout.nav.options.whatWeDo")}</a>
                        <a href="#" className="nav-link">{t("layout.nav.options.newsAndEvents")}</a>
                        <a href="#" className="nav-link">{t("layout.nav.options.getInvolved")}</a>
                    </div>
                </div>
                        {/* Mobile Menu */}
                {isOpen && (
                    <div className="mobile-menu">
                    <div className="mobile-menu-content">
                        <a href="#" className="mobile-nav-link">{t("layout.nav.options.whoWeAre")}</a>
                        <a href="#" className="mobile-nav-link">{t("layout.nav.options.whatWeDo")}</a>
                        <a href="#" className="mobile-nav-link">{t("layout.nav.options.newsAndEvents")}</a>
                        <a href="#" className="mobile-nav-link">{t("layout.nav.options.getInvolved")}</a>
                        <div className="mobile-actions">
                        </div>
                    </div>
                    </div>
                )}           


                {/* Mobile Hamburger Toggle */}
                <button
                    type="button"
                    className="site-nav__mobile-toggle"
                    onClick={() => setIsOpen((v) => !v)}
                    aria-label={t("layout.nav.mobileToggle")}
                >
                    <span className="site-nav__mobile-lines" />
                </button>

                {/* Right side */}
                <div className="site-nav__right">
                   
                    <LanguageToggle />
                    {/* Contact more accessible */}
                    <div className="nav-actions desktop-actions">
                        <button className="phone-btn">
                            <FaPhone size={14}/>
                        </button>
                    </div>   

                    {/* Donate */}
                    <button
                        type="button"
                        className="site-nav__donate"
                        onClick={() => {
                            navigate("/donate");
                            setIsOpen(false);
                        }}
                    >
                        {t("layout.nav.actions.donate")}
                    </button>

                    {/* Auth */}
                    {user ? (
                        <>
                            <div
                                className="site-nav__auth site-nav__auth--link"
                                onClick={() =>{
                                        navigate("/profile");
                                     setIsOpen(false)}}
                            >
                                <HiUser className="site-nav__auth-icon" size={20} />
                                <span className="site-nav__auth-text">
                  {t("layout.nav.actions.profile")}
                </span>
                            </div>

                            <button
                                type="button"
                                className="site-nav__auth"
                                onClick={() => {
                                    onLogout();
                                    setIsOpen(false);
                                }}
                            >
                <span className="site-nav__auth-text">
                  {t("layout.nav.actions.logout")}{" "}
                    <span className="site-nav__auth-username">{displayName}</span>
                </span>
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="site-nav__auth site-nav__auth--link"
                            onClick={() => setIsOpen(false)}
                        >
                            <HiUser className="site-nav__auth-icon" size={20} />
                            <span className="site-nav__auth-text">
                {t("layout.nav.actions.login")}
              </span>
                        </Link>
                    )}
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}

export default NavBar;
