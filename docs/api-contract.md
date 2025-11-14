# Athena Connect – API Contract (Draft)

This document lists the main backend endpoints so that frontend, chatbot, and email logic stay consistent.
All routes are prefixed by `/api/` in this draft.

---

## 1. Auth

### POST `/api/auth/register`
**Purpose:** Create a new donor account.

**Request (JSON):**

{
  "email": "user@example.com",
  "password": "string",
  "firstName": "Optional string"
}

**Response 201 (JSON):**

{
  "id": 1,
  "email": "user@example.com",
  "firstName": "string",
  "token": "jwt-or-session-token"
}

---

### POST `/api/auth/login`
**Purpose:** Log in an existing user.

**Request (JSON):**

{
  "email": "user@example.com",
  "password": "string"
}

**Response 200 (JSON):**

{
  "id": 1,
  "email": "user@example.com",
  "firstName": "string",
  "token": "jwt-or-session-token"
}

---

## 2. Impact pathways

### GET `/api/impact-pathways`
**Purpose:** Get all impact pathways for home page / donation step 1.

**Response 200 (JSON):**

[
  {
    "id": 1,
    "slug": "emergency-shelter-safety",
    "name": "Emergency Shelter & Safety",
    "shortDescription": "Immediate safe housing...",
    "exampleMetrics": ["..."],
    "exampleCosts": ["..."]
  }
]

(Data comes from `content/impact_pathways.json`.)

---

## 3. Donations

### POST `/api/donations`
**Purpose:** Create a donation record and trigger confirmation email.

**Request (JSON):**

{
  "amount": 50,
  "currency": "CAD",
  "impactPathwaySlug": "emergency-shelter-safety",
  "isRecurring": false,
  "isAnonymous": true,
  "message": "Optional message from donor"
}

**Response 201 (JSON):**

{
  "id": 123,
  "amount": 50,
  "currency": "CAD",
  "impactPathwaySlug": "emergency-shelter-safety",
  "isRecurring": false,
  "isAnonymous": true,
  "createdAt": "2025-11-14T12:00:00Z"
}

> Backend: after creating, send `donation_confirmation.md` email.

---

### GET `/api/donations/me` (auth required)
**Purpose:** Get donations for the logged-in user (for dashboard).

**Response 200 (JSON):**

[
  {
    "id": 123,
    "amount": 50,
    "currency": "CAD",
    "impactPathwaySlug": "emergency-shelter-safety",
    "isRecurring": false,
    "isAnonymous": true,
    "createdAt": "2025-11-14T12:00:00Z"
  }
]

---

## 4. Stories

### GET `/api/stories`
**Purpose:** Get anonymized stories for the Stories section.

**Response 200 (JSON):**

[
  {
    "id": 1,
    "title": "A First Night of Safety",
    "pathwaySlug": "emergency-shelter-safety",
    "note": "Names and details changed for safety.",
    "body": "..."
  }
]

(Data comes from `content/stories.json`.)

---

## 5. Quiz

### GET `/api/quiz-questions`
**Purpose:** Provide awareness quiz questions to the frontend.

**Response 200 (JSON):**

[
  {
    "id": 1,
    "question": "Which statement best describes domestic and family violence?",
    "options": ["..."],
    "correctOptionIndex": 1,
    "explanation": "..."
  }
]

(Data comes from `content/quiz_questions.json`.)

---

## 6. Chatbot

### POST `/api/chatbot/query`
**Purpose:** Answer donor questions using FAQ + optional LLM fallback.

**Request (JSON):**

{
  "message": "Where does my money go?",
  "userId": 1
}

**Response 200 (JSON):**

{
  "answer": "Donations are used to support services such as emergency shelter, counselling, children's programs, and prevention.",
  "source": "faq"
}

(Primary answers from `content/faqs.json`.)

---

## 7. Basic profile (optional for MVP)

### GET `/api/profile` (auth)
### PATCH `/api/profile` (auth)

Basic endpoints to read/update user info (email, firstName, notification preferences) for the Settings section.
