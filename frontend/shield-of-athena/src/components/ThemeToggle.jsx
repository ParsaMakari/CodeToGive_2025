import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import "../css/ThemeToggle.scss";

const THEME_KEY = "theme";

function getInitialTheme() {
    if (typeof window === "undefined") return "light";

    const stored = window.localStorage.getItem(THEME_KEY);
    if (stored === "light" || stored === "dark") return stored;

    // fallback to OS preference
    const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

    return prefersDark ? "dark" : "light";
}

function ThemeToggle() {
    const [theme, setTheme] = useState(getInitialTheme);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        window.localStorage.setItem(THEME_KEY, theme);
    }, [theme]);

    const isDark = theme === "dark";

    return (
        <button
            type="button"
            className="theme-toggle"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
            <div
                className="theme-toggle__thumb"
                data-theme-thumb={theme}
            >
                <Sun className="theme-toggle__icon theme-toggle__icon--sun" />
                <Moon className="theme-toggle__icon theme-toggle__icon--moon" />
            </div>
        </button>
    );
}

export default ThemeToggle;
