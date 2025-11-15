import { Link } from "react-router-dom";
import "../css/Auth.scss";

function Home({ user }) {
    return (
        <div className="auth">
            <div className="auth-card">
                <h1 className="auth-title">Athena Connect</h1>
                <p style={{ marginBottom: "1.2rem", color: "var(--color-text-muted)" }}>
                    Transforming the donor experience for Shield of Athena with
                    transparent impact, timelines and a warm Athena Guide chatbot.
                </p>

                {user ? (
                    <>
                        <p className="auth-footer-text" style={{ marginBottom: "1rem" }}>
                            Logged in as <strong>{user}</strong>
                        </p>
                        <Link to="/dashboard" className="auth-button" style={{ display: "inline-block", textAlign: "center", textDecoration: "none" }}>
                            Go to dashboard
                        </Link>
                    </>
                ) : (
                    <>
                        <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                            <Link
                                to="/login"
                                className="auth-button"
                                style={{ textAlign: "center", textDecoration: "none" }}
                            >
                                Log in
                            </Link>
                            <Link
                                to="/register"
                                className="auth-button"
                                style={{
                                    textAlign: "center",
                                    textDecoration: "none",
                                    background: "var(--color-card-bg-soft)",
                                    color: "var(--color-primary)",
                                    boxShadow: "none",
                                    border: "1px solid var(--color-card-border-soft)",
                                }}
                            >
                                Sign up
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Home;
