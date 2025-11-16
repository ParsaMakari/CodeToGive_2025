<<<<<<< HEAD
# CodeToGive_2025
=======
# Athena Donor Chatbot Backend

Multilingual, safety‑first donor‑facing chatbot backend built with **FastAPI** and a lightweight **RAG + intent detection** pipeline.

This backend is designed to plug directly into an existing React frontend.

---

## 1. Features

- ✅ **FastAPI** backend, production‑ready & easily containerised
- ✅ **Multilingual** (English + French) with JSON i18n files and easy extension
- ✅ **Robust input handling** (normalisation, truncation, profanity filter, safe fallbacks)
- ✅ **Safety layer** with crisis override & emotional‑distress routing
- ✅ **Intent engine** combining:
  - keyword & regex rules
  - multilingual sentence embeddings
  - lightweight ML classifier (Tfidf + LogisticRegression)
- ✅ **RAG module** using FAISS over a small `knowledge_base.json`
- ✅ **Clean JSON responses** with text + suggestions + metadata
- ✅ **/debug** endpoint for intent breakdown & metrics
- ✅ Basic **pytest** test suite

---

## 2. Folder structure

```text
athena_donor_chatbot_backend/
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── config.py
│   ├── logging_conf.py
│   ├── middleware.py
│   ├── models.py
│   ├── core/
│   │   ├── __init__.py
│   │   ├── language.py
│   │   ├── normalization.py
│   │   ├── profanity.py
│   │   ├── safety.py
│   │   ├── embeddings.py
│   │   ├── intents.py
│   │   ├── rag.py
│   │   ├── responses.py
│   │   ├── sessions.py
│   │   └── metrics.py
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── chat.py
│   │   ├── health.py
│   │   └── debug.py
│   ├── i18n/
│   │   ├── en.json
│   │   └── fr.json
│   ├── knowledge_base/
│   │   └── knowledge_base.json
│   └── tests/
│       ├── __init__.py
│       ├── test_chat_basic.py
│       ├── test_health.py
│       └── test_safety.py
├── requirements.txt
├── run.sh
└── README.md
```

---

## 3. Running the backend

### 3.1. Prerequisites

- Python **3.10+** (3.11 recommended)
- `git` (optional)
- A virtual environment tool (`venv`, `conda`, etc.)

### 3.2. Install & run

```bash
# 1) Create and activate a virtualenv
python -m venv .venv
source .venv/bin/activate  # on Windows: .venv\Scripts\activate

# 2) Install dependencies
pip install --upgrade pip
pip install -r requirements.txt

# 3) Run the API
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

The API will now be available at:

- API root: `http://localhost:8000`
- Docs (Swagger): `http://localhost:8000/docs`
- Health: `http://localhost:8000/health`
- Chat: `POST http://localhost:8000/chat`
- Debug: `GET http://localhost:8000/debug`

---

## 4. API Contract

### POST `/chat`

**Request body**

```json
{
  "message": "I want to donate but I don't know how",
  "language": "en",
  "session_id": "optional-session-id"
}
```

- `message` (string, required): user input. Can be empty; backend will answer safely.
- `language` (string, optional): force language (`"en"` or `"fr"`). If omitted, the backend:
  1. runs language detection,
  2. falls back to default (`en`) if needed.
- `session_id` (string, optional): if omitted, backend generates one.

**Response**

```json
{
  "response": "text answer in the resolved language",
  "suggestions": ["..."],
  "intent": "donation_help",
  "confidence": 0.82,
  "session_id": "7c61f6220a644e2b90e3c8a1b0b40e8b",
  "language": "en"
}
```

- `intent` is one of:
  - `donation_help`
  - `amount_guidance`
  - `pathway_explanation`
  - `transparency_inquiry`
  - `general_info`
  - `unclear`
  - `emotional_distress`
  - or `crisis_override` (safety override)
- `confidence` is a float in `[0,1]`.

### GET `/health`

Returns a basic readiness payload:

```json
{
  "status": "ok",
  "version": "1.0.0",
  "uptime_seconds": 123.45
}
```

### GET `/debug`

Returns last intent analysis + global metrics (for internal use):

```json
{
  "last_intent_analysis": { "...": "..." },
  "metrics": {
    "started_at": 1690000000.0,
    "total_requests": 10,
    "intent_counts": {
      "donation_help": 4,
      "general_info": 3,
      "unclear": 2
    },
    "crisis_count": 1
  }
}
```

> ⚠️ In production, you should protect `/debug` behind auth or IP whitelisting.

---

## 5. Frontend integration (React)

From your existing React app, you can call the backend like this:

```ts
// Example using fetch from the browser
async function sendChatMessage(message: string, language?: string, sessionId?: string) {
  const res = await fetch("http://localhost:8000/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      language: language ?? undefined,
      session_id: sessionId ?? undefined,
    }),
  });

  if (!res.ok) {
    throw new Error("Chat API error");
  }

  const json = await res.json();
  return json; // { response, suggestions, intent, confidence, session_id, language }
}
```

Recommended UI behaviour:

1. Keep `session_id` in React state or localStorage and resend it with each message.
2. Render `response` as the assistant message.
3. Render `suggestions` as clickable quick‑reply buttons.
4. Optionally branch on `intent` in the UI if you want special flows (e.g., direct link to donation page when `intent === "donation_help"`).

---

## 6. Adding a new language

1. **Create a new JSON file** in `app/i18n/`, for example `es.json`:

   ```json
   {
     "meta": { "default_suggestions": [ "¿Cómo puedo donar?" ] },
     "errors": { "empty_input": "..." },
     "safety": { "crisis_text": "... {hotline} ... {support_email} ..." },
     "profanity": { "notice": "..." },
     "rag": { "intro": "..." },
     "intents": {
       "donation_help": { "base_text": "...", "suggestions": ["..."] },
       "amount_guidance": { "base_text": "...", "suggestions": ["..."] },
       "pathway_explanation": { "base_text": "...", "suggestions": ["..."] },
       "transparency_inquiry": { "base_text": "...", "suggestions": ["..."] },
       "general_info": { "base_text": "...", "suggestions": ["..."] },
       "unclear": { "base_text": "...", "clarify": "...", "suggestions": ["..."] },
       "emotional_distress": { "base_text": "...", "suggestions": ["..."] }
     }
   }
   ```

2. **Allow the language** in environment variables:

   ```bash
   export ALLOWED_LANGUAGES="en,fr,es"
   ```

3. Restart the backend. The language auto‑detection + explicit `language` parameter will now accept `"es"`.

> If a translation key is missing in the new language, the system will **fall back to English**.

---

## 7. Extending intents

To add a new intent (e.g., `volunteering_info`):

1. **Update `app/core/intents.py`:**
   - Add a new constant `INTENT_VOLUNTEERING_INFO`.
   - Add it to `ALL_INTENTS`.
   - Add a new `IntentConfig` with:
     - `keywords` in EN/FR,
     - `patterns` (regex),
     - `examples` (used for embeddings & ML training).
   - Add a few labelled sentences to `TRAINING_SAMPLES`.

2. **Retrain classifier automatically:**
   - The module trains the classifier at import, so simply modifying `TRAINING_SAMPLES` and restarting the server is enough.

3. **Update `i18n` files** (`en.json`, `fr.json`) under `"intents"` with:
   - `base_text`
   - `suggestions`

4. **Optionally connect RAG**:
   - Add new documents to `knowledge_base/knowledge_base.json` with tag `"volunteering_info"`.
   - The RAG module will automatically include them when querying that intent.

---

## 8. Safety & crisis behaviour

- The backend scans incoming text for crisis‑related patterns (suicidal ideation, explicit desire for self‑harm, etc.).
- If a crisis pattern is detected:
  - `intent` is forced to `"crisis_override"`.
  - A **fixed, safe message** is returned, pointing to `{hotline}` and `{support_email}`.
  - The original message **is not logged**; only a minimal reason + language are stored for metrics.
- Emotional but non‑crisis content is routed to the `emotional_distress` intent, with a supportive message plus gentle guidance back to donor topics.

---

## 9. RAG / knowledge base

- Documents live in `app/knowledge_base/knowledge_base.json`.
- Each document has:

  ```json
  {
    "id": "donation_methods",
    "title": "Ways to donate",
    "content_en": "...",
    "content_fr": "...",
    "tags": ["donation_help", "pathway_explanation"]
  }
  ```

- On startup, the backend:
  1. Loads all documents.
  2. Builds multilingual sentence embeddings.
  3. Indexes them in a FAISS `IndexFlatIP` (cosine similarity).

- At runtime, the chat pipeline:
  - Runs intent detection.
  - For RAG‑enabled intents (`donation_help`, `amount_guidance`, `pathway_explanation`, `transparency_inquiry`, `general_info`), it queries the index and injects a short summary into the response.

---

## 10. Testing

To run the test suite:

```bash
pytest -q
```

Current tests cover:

- `/health` endpoint structure
- `/chat` basic contract (fields, types)
- Crisis override behaviour (`intent == "crisis_override"` for suicidal messages)

You can extend tests in `app/tests/` to add more coverage (e.g., language routing, profanity handling, RAG output presence).

---

## 11. Environment variables

Optional environment variables (with defaults):

- `DEBUG` – `1` (default) or `0`
- `EMBEDDING_MODEL_NAME` – defaults to `sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2`
- `MAX_MESSAGE_LENGTH` – default `1000`
- `DEFAULT_LANGUAGE` – default `en`
- `ALLOWED_LANGUAGES` – default `"en,fr"`
- `CRISIS_HOTLINE` – default `"your local emergency services or a trusted crisis hotline"`
- `SUPPORT_EMAIL` – default `"support@example.org"`

Example:

```bash
export DEFAULT_LANGUAGE="fr"
export ALLOWED_LANGUAGES="fr,en"
export CRISIS_HOTLINE="Suicide.ca or your local emergency services"
export SUPPORT_EMAIL="donations@your-org.org"
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

---

You now have a complete backend that you can drop into your project, wire to your React frontend, and extend as your donor experience evolves.
>>>>>>> dd1a30d (Add donor chatbot backend)
