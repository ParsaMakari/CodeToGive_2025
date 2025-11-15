import React from "react";
import { withTranslation } from "react-i18next";
import "../css/LanguageToggle.scss";

function LanguageToggle({ i18n }) {
    const current = i18n.resolvedLanguage || i18n.language || "en";

    const changeTo = (lng) => {
        if (lng !== current) {
            i18n.changeLanguage(lng);
        }
    };

    return (
        <div className="lang-toggle">
            <button
                type="button"
                className={`lang-pill ${current === "en" ? "is-active" : ""}`}
                onClick={() => changeTo("en")}
            >
                EN
            </button>
            <button
                type="button"
                className={`lang-pill ${current === "fr" ? "is-active" : ""}`}
                onClick={() => changeTo("fr")}
            >
                FR
            </button>
        </div>
    );
}

export default withTranslation()(LanguageToggle);
