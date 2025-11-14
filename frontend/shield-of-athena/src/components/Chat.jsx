import React, { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import { useTranslation } from "react-i18next";
import { sendAthenaMessage } from "../api/chat";
import "../css/Chat.scss";

function Chat() {
    const { t, i18n } = useTranslation();
    const [messages, setMessages] = useState([
        {
            id: "welcome",
            sender: "bot",
            text: t("athenaGuide.welcome"),
            type: "NORMAL",
        },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    useEffect(() => {
        setMessages((prev) =>
            prev.map((msg) =>
                msg.id === "welcome"
                    ? { ...msg, text: t("athenaGuide.welcome") }
                    : msg
            )
        );
    }, [i18n.language, t]);


    const suggestedQuestions = [
        t("athenaGuide.sampleQuestions.howDonationsUsed"),
        t("athenaGuide.sampleQuestions.campaign"),
        t("athenaGuide.sampleQuestions.monthly"),
        t("athenaGuide.sampleQuestions.taxReceipt"),
    ];

    async function handleSendMessage(textOverride) {
        const text = (textOverride ?? inputValue).trim();
        if (!text || isLoading) return;

        const userMessage = {
            id: `user-${Date.now()}`,
            sender: "user",
            text,
            type: "NORMAL",
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");
        setIsLoading(true);

        try {
            const lang = i18n.language || "en";
            const response = await sendAthenaMessage({ message: text, lang });

            const botMessage = {
                id: `bot-${Date.now()}`,
                sender: "bot",
                text: response.reply || t("athenaGuide.fallbackReply"),
                type: response.type || "NORMAL",
            };

            setMessages((prev) => [...prev, botMessage]);
        } catch (err) {
            console.error("[AthenaGuideChat] Error:", err);
            const botMessage = {
                id: `bot-error-${Date.now()}`,
                sender: "bot",
                text: t("athenaGuide.errorReply"),
                type: "NORMAL",
            };
            setMessages((prev) => [...prev, botMessage]);
        } finally {
            setIsLoading(false);
        }
    }

    function handleSuggestionClick(q) {
        setInputValue(q);
        // auto-send suggestion for demo
        handleSendMessage(q);
    }

    return (
        <div className="athena-guide">
            <div className="athena-guide-header">
                <div>
                    <div className="athena-guide-badge">
                        {t("athenaGuide.badge")}
                    </div>
                    <h2 className="athena-guide-title">
                        {t("athenaGuide.title")}
                    </h2>
                    <p className="athena-guide-subtitle">
                        {t("athenaGuide.subtitle")}
                    </p>
                </div>
            </div>

            <div className="athena-guide-suggestions">
        <span className="athena-guide-suggestions-label">
          {t("athenaGuide.suggestions.title")}
        </span>
                <div className="athena-guide-suggestions-list">
                    {suggestedQuestions.map((q) => (
                        <button
                            key={q}
                            type="button"
                            className="athena-guide-suggestion-chip"
                            onClick={() => handleSuggestionClick(q)}
                        >
                            {q}
                        </button>
                    ))}
                </div>
            </div>

            <div className="athena-guide-messages">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`athena-guide-message athena-guide-message-${msg.sender}`}
                    >
                        <div
                            className={`athena-guide-message-bubble${
                                msg.type === "CRISIS_REDIRECT" ? " is-crisis" : ""
                            }`}
                        >
                            {msg.type === "CRISIS_REDIRECT" && (
                                <div className="athena-guide-crisis-header">
                                    <strong>{t("athenaGuide.crisisBox.title")}</strong>
                                </div>
                            )}
                            <p>{msg.text}</p>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="athena-guide-footer">
                <input
                    type="text"
                    className="athena-guide-input"
                    placeholder={t("athenaGuide.inputPlaceholder")}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            handleSendMessage();
                        }
                    }}
                    disabled={isLoading}
                />
                <button
                    className="athena-guide-send-button"
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim() || isLoading}
                    aria-label={t("athenaGuide.sendLabel")}
                >
                    <Send className="athena-guide-send-icon" />
                </button>
            </div>
        </div>
    );
}

export default Chat;
