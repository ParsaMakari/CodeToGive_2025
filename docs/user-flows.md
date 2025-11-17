# Athena Connect – Key User Flows

This document describes the main user journeys so that design, frontend, backend, and the pitch are aligned.

---

## 1. New donor – Quick donation without account

1. Donor lands on **Home page**.
2. Reads brief mission + sees **Impact Pathways** cards.
3. Clicks **“Donate”** or **“Support this pathway”**.
4. On **Donation Step 1 – Choose impact**:
   - Selects a pathway (or “Let the organization decide”).
   - Chooses one-time donation.
5. On **Donation Step 2 – Amount & details**:
   - Picks a preset amount or enters custom.
   - Optionally checks “Donate anonymously”.
   - Optionally adds a short message.
6. On **Donation Step 3 – Payment & confirmation**:
   - Enters payment info (mock/sandbox).
   - Sees **Thank-you screen** with:
     - Summary (amount + pathway).
     - Short impact text.
     - Optional “Share your support” buttons.
     - CTA: “Create an account to track your impact”.
7. Donor receives **donation confirmation email**.

---

## 2. Donor – Creates account and checks dashboard

1. From the **Thank-you screen** or navbar, donor clicks **“Create account / Sign up”**.
2. On **Sign up**:
   - Enters email + password (and optional name).
3. After sign-up:
   - Redirected to **Donor Dashboard**.
4. On **Dashboard**:
   - Sees **“My donations”** list (date, amount, pathway, anonymity).
   - Sees **“My impact summary”** (simple stats).
   - Sees suggested **stories** related to pathways they supported.
   - Can go to **Settings** to:
     - Update email / password.
     - Manage newsletter / follow-up preferences.

---

## 3. Donor – Takes awareness quiz

1. From Home or Dashboard, donor clicks **“Test your knowledge”** or similar.
2. On **Quiz page**:
   - System loads questions from `content/quiz_questions.json`.
   - Donor answers one question at a time (MCQ).
   - After each answer:
     - Sees if it’s correct.
     - Reads a short explanation.
3. At the end:
   - Sees completion message and a friendly text about learning.
   - Optionally gets a small **badge/title** shown in the Dashboard (e.g. “Awareness Explorer”).

---

## 4. Donor – Uses the chatbot (“Athena Guide”)

1. On any main page, donor clicks the **chat icon**.
2. Chat window opens:
   - Shows a short intro (e.g. “Ask me about our services, donations, or how to get help.”).
3. Donor types a question:
   - Example: “Where does my money go?”
4. Backend:
   - Receives the question via `POST /api/chatbot/query`.
   - Looks up best answer in `content/faqs.json`.
   - Returns answer (or safe fallback if no match).
5. Donor can ask follow-up questions or close the chat.

---

## 5. Donor – Receives follow-up impact email

1. Some time after donation (or on a manual trigger during hackathon), backend sends:
   - **Micro-impact follow-up email** using `content/emails/micro_impact_followup.md`.
2. Email:
   - Reminds donor of their support.
   - Includes 1–2 simple stats or updates related to their pathway.
   - Invites them to come back to the site or share with friends.

---

## 6. Organization staff – Simple internal use (MVP)

> For hackathon, this can just be Django admin.

1. Staff logs into **Django admin**.
2. Can:
   - View list of **donations**.
   - View/manage **Impact Pathways**.
   - View/manage **Stories**.
3. Optionally can use this data later to update stats used in the dashboard and emails.
