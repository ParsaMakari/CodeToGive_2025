  const API_BASE =
        process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";

    export async function fetchImpactJourney({ amount, pathway, lang = "en" }) {
        const params = new URLSearchParams({
            amount: String(amount),
            pathway,
            lang,
        });

        const url = `${API_BASE}/api/impact-pathways/journey/?${params.toString()}`;

        const res = await fetch(url);

        if (!res.ok) {
            const text = await res.text().catch(() => "");
            console.error("[ImpactJourney] Backend error:", res.status, text);
            throw new Error(text || `Request failed with status ${res.status}`);
        }

        const json = await res.json();
        return json;
    }