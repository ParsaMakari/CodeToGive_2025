import React from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

export default function WelcomeScreen({
                                          pillText,
                                          title,
                                          subtitle,
                                          footerText,
                                          primaryCtaLabel,
                                          secondaryCtaLabel,
                                          onStart,
                                      }) {
    return (
        <div className="welcome-screen">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="welcome-pill">
                    <Sparkles className="w-4 h-4" />
                    <span>{pillText}</span>
                </div>

                <h1 className="welcome-title">{title}</h1>

                <p className="welcome-subtitle">{subtitle}</p>

                <div className="welcome-actions">
                    <button
                        type="button"
                        onClick={onStart}
                        className="welcome-button-primary"
                        data-testid="button-start-matcher"
                    >
                        <Heart className="w-5 h-5" style={{ marginRight: 8 }} />
                        {primaryCtaLabel}
                    </button>

                    <button
                        type="button"
                        className="welcome-button-secondary"
                        data-testid="button-learn-more"
                        onClick={() => console.log("Learn more clicked")}
                    >
                        {secondaryCtaLabel}
                    </button>
                </div>

                <p className="welcome-footer">{footerText}</p>
            </motion.div>
        </div>
    );
}
