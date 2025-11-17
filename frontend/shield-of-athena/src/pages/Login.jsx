// Login.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../css/Auth.scss";

export default function Login({ setUser }) {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = t("auth.login.pageTitle");
    }, [t, i18n.language]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8000/api/auth/login", {
                email,
                password,
            });
            const tokens = res.data;
            if (tokens) {
                localStorage.setItem("token", tokens.token);
                localStorage.setItem("refresh", tokens.refresh);

                const decoded = jwtDecode(tokens.token);
                setUser({
                    username: decoded.username || decoded.user_name || decoded.email,
                    email: decoded.email,
                    id: decoded.user_id || decoded.id,
                });
                setMessage("");
                navigate("/dashboard");
            } else {
                setMessage(t("auth.login.errorNoToken"));
            }
        } catch (error) {
            console.error(error);
            setMessage(t("auth.login.errorGeneric"));
        }
    };

    return (
        <div className="auth">
            <div className="auth-card">
                <h1 className="auth-title">{t("auth.login.title")}</h1>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t("auth.login.emailPlaceholder")}
                        className="auth-input"
                        autoComplete="off"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={t("auth.login.passwordPlaceholder")}
                        className="auth-input"
                    />

                    <button type="submit" className="auth-button">
                        {t("auth.login.submit")}
                    </button>

                    <div className="auth-footer">
                        <p className="auth-footer-text">
                            {t("auth.login.noAccount")}
                            <br />
                            <Link to="/register" className="auth-link">
                                {t("auth.login.registerLink")}
                            </Link>
                        </p>
                    </div>
                </form>

                {message && (
                    <p className="auth-message auth-message--error">{message}</p>
                )}
            </div>
        </div>
    );
}
