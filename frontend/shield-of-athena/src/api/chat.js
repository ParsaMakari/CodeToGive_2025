const BASE_URL = "http://localhost:8001";

export async function sendAthenaMessage({ message, language }) {
    // Reuse a session id so the backend can keep context
    let sessionId = localStorage.getItem("athena_session_id") || undefined;

    const res = await fetch(`${BASE_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            message,
            language: language || undefined,
            session_id: sessionId,
        }),
    });

    if (!res.ok) {
        // Try to parse backend error, otherwise throw generic
        let errBody = {};
        try {
            errBody = await res.json();
        } catch {
            // ignore parse error
        }
        throw new Error(errBody.detail || "Chat API error");
    }

    const data = await res.json();

    if (data.session_id && data.session_id !== sessionId) {
        localStorage.setItem("athena_session_id", data.session_id);
    }

    const isCrisis = data.intent === "crisis_override";

    return {
        reply: data.response,
        type: isCrisis ? "CRISIS_REDIRECT" : "NORMAL",
        intent: data.intent,
        confidence: data.confidence,
        suggestions: data.suggestions || [],
        language: data.language,
    };
}
