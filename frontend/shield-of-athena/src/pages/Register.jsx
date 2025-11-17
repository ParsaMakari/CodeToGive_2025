// Register.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../css/Auth.scss";

function Register() {
    const { t, i18n } = useTranslation();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        document.title = t("auth.register.pageTitle");
    }, [t, i18n.language]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmpassword) {
            setIsSuccess(false);
            setMessage(t("auth.register.errorPasswordsNoMatch"));
            return;
        }
        try {
            await axios.post("http://localhost:8000/api/auth/register", {
                firstName,
                lastName,
                username,
                email,
                password,
            });
            setIsSuccess(true);
            setMessage(t("auth.register.success"));
        } catch (error) {
            console.error(error);
            setIsSuccess(false);
            setMessage(
                t("auth.register.errorGeneric", { message: error.message || "" })
            );
        }
    };

    return (
        <div className="auth">
            <div className="auth-card">
                <h1 className="auth-title">{t("auth.register.title")}</h1>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder={t("auth.register.firstNamePlaceholder")}
                        className="auth-input"
                    />
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder={t("auth.register.lastNamePlaceholder")}
                        className="auth-input"
                    />
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder={t("auth.register.usernamePlaceholder")}
                        className="auth-input"
                    />
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t("auth.register.emailPlaceholder")}
                        className="auth-input"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={t("auth.register.passwordPlaceholder")}
                        className="auth-input"
                    />
                    <input
                        type="password"
                        value={confirmpassword}
                        onChange={(e) => setConfirmpassword(e.target.value)}
                        placeholder={t("auth.register.confirmPasswordPlaceholder")}
                        className="auth-input"
                    />

                    <button type="submit" className="auth-button">
                        {t("auth.register.submit")}
                    </button>
                    <div className="auth-footer">
                        <p className="auth-footer-text">
                            {t("auth.register.haveAccount")}
                            <br />
                            <Link to="/login" className="auth-link">
                                {t("auth.register.loginLink")}
                            </Link>
                        </p>
                    </div>
                </form>

                {message && (
                    <p
                        className={
                            "auth-message " +
                            (isSuccess ? "auth-message--success" : "auth-message--error")
                        }
                    >
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}

export default Register;
