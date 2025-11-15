import "./css/HomePage.scss";
import hero_image from "../assets/hero_image.png";
import { HiHandRaised } from "react-icons/hi2";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

function HomePage({ user }) {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const displayName = user?.username || "";
    const isLoggedIn = Boolean(user);
    const greetingKey = isLoggedIn
        ? "home.greetingLoggedIn"
        : "home.greetingAnon";

    return (
        <div className="home-page">
            <div className="home-page__hero-section">
                <div className="home-page__hero-left">
                    <h1 className="auth-title">
                        {t(greetingKey, { name: displayName })}
                    </h1>

                    <span className="home-page__hero-left-join">
            {t("home.hero.join")}
          </span>

                    <div className="home-page__hero-title">
                        <span>{t("home.hero.title.part1")}</span>
                        <span className="home-page__hero-no">
              {t("home.hero.title.no")}
            </span>
                        <span>{t("home.hero.title.part2")}</span>
                        <span>!</span>
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

                <div className="home-page__hero-right">
                    <div className="home-page__hero-image-container">
                        <img
                            src={hero_image}
                            alt={t("home.hero.imageAlt")}
                            className="home-page__hero-image"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
