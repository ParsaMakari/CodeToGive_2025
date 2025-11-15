export async function sendAthenaMessage({ message, lang = "en" }) {
    console.log("[Mock AthenaGuide] message:", message, "lang:", lang);

    // en gros simulate a tiny delay like a real API
    await new Promise((resolve) => setTimeout(resolve, 600));

    // simple mock logic: if the user seems in crisis, return CRISIS_REDIRECT
    const lower = message.toLowerCase();
    if (
        lower.includes("danger") ||
        lower.includes("help") ||
        lower.includes("violence")
    ) {
        return {
            reply:
                lang === "fr"
                    ? "Si vous êtes en danger immédiat, veuillez contacter les services d’urgence ou une ressource d’aide immédiatement. Ce chatbot ne remplace pas une intervention d’urgence."
                    : "If you are in immediate danger, please contact emergency services or a crisis helpline right away. This chatbot cannot replace emergency support.",
            type: "CRISIS_REDIRECT",
            suggestions: [],
        };
    }

    // normal answer
    return {
        reply:
            lang === "fr"
                ? "Merci pour votre question. Dans un vrai déploiement, Athena Guide utiliserait les informations du Bouclier d’Athéna pour vous donner une réponse précise sur les dons, les programmes et l’impact."
                : "Thank you for your question. In a real deployment, Athena Guide would use Shield of Athena’s information to give you a precise answer about donations, programs, and impact.",
        type: "NORMAL",
        suggestions: [],
    };
}
