import { useEffect } from "react";
import "./css/Profile.scss";
import { useNavigate } from "react-router";
import ChatFloating from "../components/ChatFloating";
import ImpactJourney from "../components/ImpactJourney";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/authContext";

function Profile() {
    const {user} = useAuth();

    const navigate = useNavigate();
    const { t } = useTranslation();

    // Fake fallback user if nothing is passed
    const currentUser = user || {
        firstName: "Alex",
        lastName: "Martin",
        email: "alex.martin@example.com",
        username: "alexm",
    };

    const initials = `${currentUser.firstName?.[0] || ""}${
        currentUser.lastName?.[0] || ""
    }`.toUpperCase();

    useEffect(() => {
        document.title = t("profile.pageTitle");
    }, [t]);

    useEffect(() => {
        (!user) && navigate("/login", {replace:true} );
    }, []);

    return (
        <div className="profile-page">
            {/* Top bar */}
            <header className="profile-page__header">
                <div className="profile-page__title-group">
                    <h1 className="profile-page__title">
                        {t("profile.header.title")}
                    </h1>
                    <p className="profile-page__subtitle">
                        {t("profile.header.subtitle")}
                    </p>
                </div>
            </header>

            {/* Main layout */}
            <main className="profile-page__main">
                {/* Left column – user info + stats + preferences */}
                <section className="profile-page__column profile-page__column--left">
                    {/* User card */}
                    <div className="profile-page__card profile-page__card--user">
                        <div className="profile-page__user-header">
                            <div className="profile-page__avatar">
                                <img
                                    style={{ width: "60px", height: "60px", borderRadius: "50%" }}
                                    src={`https://img.freepik.com/premium-photo/portrait-young-woman-with-bob-haircut-leather-jacket-brunette-girl-with-round-face-shape_134398-13553.jpg?w=1480`}
                                    alt={`${currentUser.firstName} ${currentUser.lastName}`}
                                    className="profile-page__avatar-img"
                                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                                />
                                <span>{initials}</span>
                            </div>
                            <div className="profile-page__user-info">
                                <h2 className="profile-page__user-name">
                                    {currentUser.firstName} {currentUser.lastName}
                                </h2>
                                <p className="profile-page__user-email">
                                    {currentUser.email}
                                </p>
                                <p className="profile-page__user-username">
                                    @{currentUser.username}
                                </p>
                            </div>
                        </div>

                        <div className="profile-page__user-actions">
                            <button type="button" className="profile-page__btn-secondary">
                                {t("profile.user.editProfile")}
                            </button>
                            <button type="button" className="profile-page__btn-ghost">
                                {t("profile.user.changePassword")}
                            </button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="profile-page__card profile-page__card--stats">
                        <h3 className="profile-page__section-title">
                            {t("profile.stats.title")}
                        </h3>
                        <div className="profile-page__stats-grid">
                            <div className="profile-page__stat">
                                <span className="profile-page__stat-label">
                                    {t("profile.stats.totalDonated.label")}
                                </span>
                                <span className="profile-page__stat-value">
                                    $420
                                </span>
                                <span className="profile-page__stat-helper">
                                    {t("profile.stats.totalDonated.helper")}
                                </span>
                            </div>
                            <div className="profile-page__stat">
                                <span className="profile-page__stat-label">
                                    {t("profile.stats.monthlyGift.label")}
                                </span>
                                <span className="profile-page__stat-value">
                                    $25 / {t("profile.stats.monthlyGift.perMonth")}
                                </span>
                                <span className="profile-page__stat-helper">
                                    {t("profile.stats.monthlyGift.helper")}
                                </span>
                            </div>
                            <div className="profile-page__stat">
                                <span className="profile-page__stat-label">
                                    {t("profile.stats.yearsSupporting.label")}
                                </span>
                                <span className="profile-page__stat-value">2</span>
                                <span className="profile-page__stat-helper">
                                    {t("profile.stats.yearsSupporting.helper")}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Preferences */}
                    <div className="profile-page__card profile-page__card--preferences">
                        <h3 className="profile-page__section-title">
                            {t("profile.preferences.title")}
                        </h3>

                        <div className="profile-page__settings-group">
                            <div className="profile-page__settings-row">
                                <div>
                                    <p className="profile-page__settings-label">
                                        {t("profile.preferences.communication.label")}
                                    </p>
                                    <p className="profile-page__settings-helper">
                                        {t("profile.preferences.communication.helper")}
                                    </p>
                                </div>
                                <select className="profile-page__select">
                                    <option>
                                        {t(
                                            "profile.preferences.communication.options.monthlyUpdates"
                                        )}
                                    </option>
                                    <option>
                                        {t(
                                            "profile.preferences.communication.options.impactReportsOnly"
                                        )}
                                    </option>
                                    <option>
                                        {t(
                                            "profile.preferences.communication.options.importantNewsOnly"
                                        )}
                                    </option>
                                </select>
                            </div>

                            <div className="profile-page__settings-row">
                                <div>
                                    <p className="profile-page__settings-label">
                                        {t("profile.preferences.language.label")}
                                    </p>
                                    <p className="profile-page__settings-helper">
                                        {t("profile.preferences.language.helper")}
                                    </p>
                                </div>
                                <select className="profile-page__select">
                                    <option>
                                        {t(
                                            "profile.preferences.language.options.english"
                                        )}
                                    </option>
                                    <option>
                                        {t(
                                            "profile.preferences.language.options.french"
                                        )}
                                    </option>
                                </select>
                            </div>

                            <div className="profile-page__settings-row profile-page__settings-row--toggle">
                                <div>
                                    <p className="profile-page__settings-label">
                                        {t("profile.preferences.taxReceipts.label")}
                                    </p>
                                    <p className="profile-page__settings-helper">
                                        {t("profile.preferences.taxReceipts.helper")}
                                    </p>
                                </div>
                                <label className="profile-page__toggle">
                                    <input type="checkbox" defaultChecked />
                                    <span className="profile-page__toggle-slider" />
                                </label>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Right column – timeline + recent donations */}
                <section className="profile-page__column profile-page__column--right">
                    {/* Timeline */}
                    <div className="profile-page__card profile-page__card--timeline">
                        <div className="profile-page__panel-header">
                            <h3 className="profile-page__section-title">
                                {t("profile.timeline.title")}
                            </h3>
                            <p className="profile-page__panel-helper">
                                {t("profile.timeline.helper")}
                            </p>
                        </div>
                        <ImpactJourney />
                    </div>

                    {/* Recent donations */}
                    <div className="profile-page__card profile-page__card--history">
                        <div className="profile-page__panel-header">
                            <h3 className="profile-page__section-title">
                                {t("profile.history.title")}
                            </h3>
                            <p className="profile-page__panel-helper">
                                {t("profile.history.helper")}
                            </p>
                        </div>

                        <div className="profile-page__table">
                            <div className="profile-page__table-row profile-page__table-row--header">
                                <span>{t("profile.history.tableHeaders.date")}</span>
                                <span>{t("profile.history.tableHeaders.campaign")}</span>
                                <span>{t("profile.history.tableHeaders.amount")}</span>
                                <span>{t("profile.history.tableHeaders.type")}</span>
                            </div>

                            <div className="profile-page__table-row">
                                <span>{t("profile.history.rows.row1.date")}</span>
                                <span>{t("profile.history.rows.row1.campaign")}</span>
                                <span>{t("profile.history.rows.row1.amount")}</span>
                                <span>{t("profile.history.rows.row1.type")}</span>
                            </div>

                            <div className="profile-page__table-row">
                                <span>{t("profile.history.rows.row2.date")}</span>
                                <span>{t("profile.history.rows.row2.campaign")}</span>
                                <span>{t("profile.history.rows.row2.amount")}</span>
                                <span>{t("profile.history.rows.row2.type")}</span>
                            </div>

                            <div className="profile-page__table-row">
                                <span>{t("profile.history.rows.row3.date")}</span>
                                <span>{t("profile.history.rows.row3.campaign")}</span>
                                <span>{t("profile.history.rows.row3.amount")}</span>
                                <span>{t("profile.history.rows.row3.type")}</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="profile-page__btn-link"
                            onClick={() => navigate("/donation")}
                        >
                            {t("profile.history.viewFullHistory")}
                        </button>
                    </div>
                </section>
            </main>

            {/* Floating chatbot everywhere */}
            <ChatFloating />
        </div>
    );
}

export default Profile;
