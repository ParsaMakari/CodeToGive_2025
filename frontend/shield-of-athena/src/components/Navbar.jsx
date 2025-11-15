import { Link, useNavigate } from "react-router-dom";
import { HiUser } from "react-icons/hi2";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import logoShield from "../assets/logo-bilingual-1-Hasmik-Manucharyan.jpg";
import "../css/Navbar.scss";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";

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
                    <ThemeToggle />

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
                            <Link
                                to="/profile"
                                className="site-nav__auth site-nav__auth--link"
                                onClick={() => setIsOpen(false)}
                            >
                                <HiUser className="site-nav__auth-icon" size={20} />
                                <span className="site-nav__auth-text">
                  {t("layout.nav.actions.profile")}
                </span>
                            </Link>

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
                </div>
            </div>
        </header>
    );
}

export default NavBar;
