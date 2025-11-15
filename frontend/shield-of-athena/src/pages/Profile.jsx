import { useEffect } from "react";
import "./css/Profile.scss";
import { useNavigate } from "react-router";
import ChatFloating from "../components/ChatFloating";
import ImpactJourney from "../components/ImpactJourney";

function Profile({ user }) {
    const navigate = useNavigate();

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
        document.title = "My Profile";
    }, []);

    return (
        <div className="profile-page">
            {/* Top bar */}
            <header className="profile-page__header">
                <div className="profile-page__title-group">
                    <h1 className="profile-page__title">My account</h1>
                    <p className="profile-page__subtitle">
                        View your donations, update your information, and follow your impact
                        with Shield of Athena.
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
                                Edit profile
                            </button>
                            <button type="button" className="profile-page__btn-ghost">
                                Change password
                            </button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="profile-page__card profile-page__card--stats">
                        <h3 className="profile-page__section-title">Your impact</h3>
                        <div className="profile-page__stats-grid">
                            <div className="profile-page__stat">
                <span className="profile-page__stat-label">
                  Total donated
                </span>
                                <span className="profile-page__stat-value">$420</span>
                                <span className="profile-page__stat-helper">
                  Across all campaigns
                </span>
                            </div>
                            <div className="profile-page__stat">
                <span className="profile-page__stat-label">
                  Monthly gift
                </span>
                                <span className="profile-page__stat-value">$25 / month</span>
                                <span className="profile-page__stat-helper">
                  Active recurring donation
                </span>
                            </div>
                            <div className="profile-page__stat">
                <span className="profile-page__stat-label">
                  Years supporting
                </span>
                                <span className="profile-page__stat-value">2</span>
                                <span className="profile-page__stat-helper">
                  Thank you for staying
                </span>
                            </div>
                        </div>
                    </div>

                    {/* Preferences */}
                    <div className="profile-page__card profile-page__card--preferences">
                        <h3 className="profile-page__section-title">Preferences</h3>

                        <div className="profile-page__settings-group">
                            <div className="profile-page__settings-row">
                                <div>
                                    <p className="profile-page__settings-label">
                                        Communication
                                    </p>
                                    <p className="profile-page__settings-helper">
                                        Choose how often we contact you.
                                    </p>
                                </div>
                                <select className="profile-page__select">
                                    <option>Monthly updates</option>
                                    <option>Only impact reports</option>
                                    <option>Important news only</option>
                                </select>
                            </div>

                            <div className="profile-page__settings-row">
                                <div>
                                    <p className="profile-page__settings-label">Language</p>
                                    <p className="profile-page__settings-helper">
                                        Interface & emails.
                                    </p>
                                </div>
                                <select className="profile-page__select">
                                    <option>English</option>
                                    <option>Français</option>
                                </select>
                            </div>

                            <div className="profile-page__settings-row profile-page__settings-row--toggle">
                                <div>
                                    <p className="profile-page__settings-label">
                                        Tax receipt emails
                                    </p>
                                    <p className="profile-page__settings-helper">
                                        Receive receipts after each donation.
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
                            <h3 className="profile-page__section-title">Impact timeline</h3>
                            <p className="profile-page__panel-helper">
                                Follow how your donations contribute over time — campaigns,
                                emergency funds and long-term support.
                            </p>
                        </div>
                        <ImpactJourney />
                    </div>

                    {/* Recent donations */}
                    <div className="profile-page__card profile-page__card--history">
                        <div className="profile-page__panel-header">
                            <h3 className="profile-page__section-title">Recent donations</h3>
                            <p className="profile-page__panel-helper">
                                This is a sample list NEED ENDPOINT
                            </p>
                        </div>

                        <div className="profile-page__table">
                            <div className="profile-page__table-row profile-page__table-row--header">
                                <span>Date</span>
                                <span>Campaign</span>
                                <span>Amount</span>
                                <span>Type</span>
                            </div>

                            <div className="profile-page__table-row">
                                <span>Nov 10, 2025</span>
                                <span>Emergency Shelter Fund</span>
                                <span>$50</span>
                                <span>One-time</span>
                            </div>

                            <div className="profile-page__table-row">
                                <span>Nov 1, 2025</span>
                                <span>Monthly Gift</span>
                                <span>$25</span>
                                <span>Monthly</span>
                            </div>

                            <div className="profile-page__table-row">
                                <span>Oct 1, 2025</span>
                                <span>Monthly Gift</span>
                                <span>$25</span>
                                <span>Monthly</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="profile-page__btn-link"
                            onClick={() => navigate("/donation")}
                        >
                            View full donation history
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
