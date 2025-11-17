import React from "react";
import { withTranslation } from "react-i18next";
import "../css/LanguageToggle.scss";

function LanguageToggle({ i18n, t }) {
    const current = i18n.resolvedLanguage || i18n.language || "en";

    const languages = [
        { code: "en", label: "English" },
        { code: "fr", label: "Français" },
        { code: "es", label: "Español" },
        { code: "it", label: "Italiano" },
        { code: "de", label: "Deutsch" },
        { code: "ru", label: "Русский" },
        { code: "nl", label: "Nederlands" },
        { code: "ar", label: "العربية" },
        { code: "pt", label: "Português" },
        { code: "zh", label: "中文" },
        { code: "hi", label: "हिन्दी" },
    ];

    const handleChange = (event) => {
        const lng = event.target.value;
        if (lng && lng !== current) {
            i18n.changeLanguage(lng);
        }
    };

    return (
        <div className="lang-toggle lang-toggle--dropdown">

            <select
                id="language-select"
                className="lang-toggle__select"
                value={current}
                onChange={handleChange}
            >
                {languages.map((lng) => (
                    <option key={lng.code} value={lng.code}>
                        {lng.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default withTranslation()(LanguageToggle);
